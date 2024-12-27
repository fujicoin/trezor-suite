import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { BigNumber } from '@trezor/utils/src/bigNumber';
import { DEFAULT_PAYMENT, DEFAULT_OPRETURN, DEFAULT_VALUES } from '@suite-common/wallet-constants';
import { getFeeInfo } from '@suite-common/wallet-utils';
import {
    SelectedAccountLoaded,
    RbfTransactionParams,
    ChainedTransactions,
    FormState,
    FeeInfo,
} from '@suite-common/wallet-types';
import type { NetworkType } from '@suite-common/wallet-config';

import { useSelector } from 'src/hooks/suite';
import { selectCurrentTargetAnonymity } from 'src/reducers/wallet/coinjoinReducer';
import { useCoinjoinRegisteredUtxos } from 'src/hooks/wallet/form/useCoinjoinRegisteredUtxos';

import { useCompose } from './form/useCompose';
import { useFees } from './form/useFees';
import { useBitcoinAmountUnit } from './useBitcoinAmountUnit';

export type UseRbfProps = {
    selectedAccount: SelectedAccountLoaded;
    rbfParams: RbfTransactionParams;
    chainedTxs?: ChainedTransactions;
};

const getBitcoinFeeInfo = (info: FeeInfo, feeRate: string) => {
    // increase FeeLevels (old rate + defined rate)
    const feeInfo = getFeeInfo({
        networkType: 'bitcoin',
        feeInfo: info,
    });
    const levels = feeInfo.levels.map(level => ({
        ...level,
        feePerUnit: new BigNumber(level.feePerUnit).plus(feeRate).toString(),
    }));

    return {
        ...feeInfo,
        levels,
        minFee: new BigNumber(feeRate).plus(feeInfo.minFee).toNumber(), // increase required minFee rate
    };
};

const getEthereumFeeInfo = (info: FeeInfo, gasPrice: string) => {
    const current = new BigNumber(gasPrice);
    const feeInfo = getFeeInfo({
        networkType: 'ethereum',
        feeInfo: info,
    });
    const minFeeFromNetwork = new BigNumber(feeInfo.levels[0].feePerUnit);

    const getFee = () => {
        if (minFeeFromNetwork.lte(current.plus(feeInfo.minFee))) {
            return current.plus(feeInfo.minFee);
        }

        return minFeeFromNetwork;
    };

    const fee = getFee();

    // increase FeeLevel only if it's lower than predefined
    const levels = feeInfo.levels.map(level => ({
        ...level,
        feePerUnit: fee.toString(),
    }));

    return {
        ...feeInfo,
        levels,
        minFee: current.plus(feeInfo.minFee).toNumber(), // increase required minFee rate
    };
};

const getRbfFeeInfo = (
    networkType: NetworkType,
    info: FeeInfo,
    rbfParams: RbfTransactionParams,
) => {
    if (networkType === 'bitcoin') return getBitcoinFeeInfo(info, rbfParams.feeRate);
    if (networkType === 'ethereum') return getEthereumFeeInfo(info, rbfParams.feeRate);

    return info;
};

const useRbfState = ({ selectedAccount, rbfParams, chainedTxs }: UseRbfProps) => {
    const { account, network } = selectedAccount;

    const symbolFees = useSelector(state => state.wallet.fees[account.symbol]);
    const targetAnonymity = useSelector(selectCurrentTargetAnonymity);
    const coinjoinRegisteredUtxos = useCoinjoinRegisteredUtxos({ account });

    const { shouldSendInSats } = useBitcoinAmountUnit(account.symbol);

    return useMemo(() => {
        const feeInfo = getRbfFeeInfo(account.networkType, symbolFees, rbfParams);
        // filter out utxos generated by this transaction
        const otherUtxo = (account.utxo || []).filter(input => input.txid !== rbfParams.txid);
        // filter out utxos with anonymity level below target and currently registered
        const availableUtxo =
            account.accountType === 'coinjoin'
                ? otherUtxo.filter(
                      utxo =>
                          (account.addresses?.anonymitySet?.[utxo.address] || 1) >=
                              (targetAnonymity || 1) && !coinjoinRegisteredUtxos.includes(utxo),
                  )
                : otherUtxo;

        // override Account data
        const rbfAccount = {
            ...account,
            // on EVM, when send tx is pending, balance has not been changed yet
            availableBalance:
                account.networkType === 'ethereum' ? account.balance : account.availableBalance,
            utxo: rbfParams.utxo.concat(availableUtxo),
            // make sure that the exact same change output will be picked by @trezor/connect > hd-wallet during the tx compose process
            // fallback to default if change address is not present
            addresses: account.addresses
                ? {
                      ...account.addresses,
                      change: rbfParams.changeAddress
                          ? [rbfParams.changeAddress]
                          : account.addresses.change,
                  }
                : undefined,
        };

        // transform original outputs
        const outputs = rbfParams.outputs.flatMap(o => {
            if (o.type === 'change') return [];
            if (o.type === 'opreturn') {
                return {
                    ...DEFAULT_OPRETURN,
                    dataHex: o.dataHex,
                    dataAscii: o.dataAscii,
                };
            }

            return {
                ...DEFAULT_PAYMENT,
                address: o.address,
                amount: shouldSendInSats ? o.amount : o.formattedAmount,
                token: o.token,
            };
        });
        // if there is no change output in the transaction **and** there is no other utxos to add try to decrease amount immediately
        // otherwise use decrease amount only as a fallback (see useEffect below)
        const setMaxOutputId =
            account.networkType === 'bitcoin' &&
            !rbfParams.outputs.some(o => o.type === 'change') &&
            availableUtxo.length < 1
                ? outputs.findIndex(o => o.type === 'payment')
                : undefined;
        // set baseFee only if chainedTxs are present.
        // try to overprice them. offer fee higher than sum of both:
        // - current tx with higher feeRate
        // - sum of all fees of all chainedTxs
        const baseFee =
            chainedTxs &&
            chainedTxs.own.concat(chainedTxs.others).reduce((f, ctx) => f + parseFloat(ctx.fee), 0);

        return {
            account: rbfAccount,
            network,
            feeInfo,
            coinjoinRegisteredUtxos,
            chainedTxs,
            shouldSendInSats,
            formValues: {
                ...DEFAULT_VALUES,
                outputs,
                selectedFee: undefined,
                setMaxOutputId,
                options: ['broadcast'],
                ethereumDataHex: rbfParams.ethereumData,
                rbfParams,
                baseFee,
            } as FormState, // TODO: remove type casting (options string[])
        };
    }, [
        account,
        coinjoinRegisteredUtxos,
        chainedTxs,
        symbolFees,
        network,
        rbfParams,
        shouldSendInSats,
        targetAnonymity,
    ]);
};

export const useRbf = (props: UseRbfProps) => {
    // local state
    const state = useRbfState(props);
    const { formValues, feeInfo, account } = state;

    const [isReduceChangePossible, setIsReduceChangePossible] = useState(false);
    const [showDecreasedOutputs, setShowDecreasedOutputs] = useState(false);

    // react-hook-form
    const useFormMethods = useForm<FormState>({ mode: 'onChange', defaultValues: formValues });
    const { register, control, setValue, getValues, formState } = useFormMethods;

    // react-hook-form auto register custom form fields (without HTMLElement)
    useEffect(() => {
        register('outputs');
        register('setMaxOutputId');
        register('options');
    }, [register]);

    // sub-hook
    const { isLoading, composeRequest, composedLevels, onFeeLevelChange, signTransaction } =
        useCompose({
            ...useFormMethods,
            state,
            defaultField: 'selectedFee',
        });

    // sub-hook
    const { changeFeeLevel } = useFees({
        defaultValue: formValues.selectedFee,
        feeInfo,
        onChange: onFeeLevelChange,
        composeRequest,
        composedLevels,
        ...useFormMethods,
    });

    // If automatically composed transaction throws NOT-ENOUGH-FUNDS error
    useEffect(() => {
        if (account.networkType !== 'bitcoin' || !composedLevels) return;
        const { selectedFee, setMaxOutputId, outputs } = getValues();
        const tx = composedLevels[selectedFee || 'normal'];
        // sometimes tx is undefined (e.g. when fee level is changed during the initial compose)
        if (!tx) return;

        const isSetMaxUsed = typeof setMaxOutputId === 'number';
        if (tx.type === 'final') {
            if (!isSetMaxUsed) {
                // reducing change is possible. do not use DecreasedOutputs ever in that case
                setIsReduceChangePossible(true);
            } else {
                // show DecreasedOutputs view
                setShowDecreasedOutputs(true);
            }
        }

        if (!isReduceChangePossible && tx.type === 'error' && tx.error === 'NOT-ENOUGH-FUNDS') {
            // try again with decreased output (use set-max calculation on the first possible output)
            if (!isSetMaxUsed) {
                setValue(
                    'setMaxOutputId',
                    outputs.findIndex(o => o.type === 'payment'),
                );
                composeRequest();
            }
            // set-max was already used and still no effect?
            // do not try compose again and show error
        }
    }, [
        account.networkType,
        composedLevels,
        composeRequest,
        getValues,
        setValue,
        isReduceChangePossible,
    ]);

    return {
        ...state,
        isLoading,
        showDecreasedOutputs,
        register,
        control,
        formState,
        setValue,
        getValues,
        composedLevels,
        changeFeeLevel,
        composeRequest,
        signTransaction,
    };
};

// context accepts only valid state (non nullable account)
type RbfContextValues = ReturnType<typeof useRbf> & NonNullable<ReturnType<typeof useRbfState>>;

export const RbfContext = createContext<RbfContextValues | null>(null);
RbfContext.displayName = 'RbfContext';

// Used across rbf form components
// Provide combined context of `react-hook-form` with custom values as RbfContextValues
export const useRbfContext = () => {
    const ctx = useContext(RbfContext);
    if (ctx === null) throw Error('useRbfContext used without Context');

    return ctx;
};
