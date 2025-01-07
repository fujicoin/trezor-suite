import { Icon, Banner, Column, Text, Button } from '@trezor/components';
import { getInputState, getStakingLimitsByNetwork } from '@suite-common/wallet-utils';
import { useFormatters } from '@suite-common/formatters';
import { formInputsMaxLength } from '@suite-common/validators';
import { spacings } from '@trezor/theme';
import { getNetworkDisplaySymbol } from '@suite-common/wallet-config';

import { NumberInput, Translation } from 'src/components/suite';
import { useTranslation } from 'src/hooks/suite';
import { useStakeEthFormContext } from 'src/hooks/wallet/useStakeEthForm';
import {
    validateDecimals,
    validateCryptoLimits,
    validateMin,
    validateReserveOrBalance,
} from 'src/utils/suite/validation';
import { FIAT_INPUT, CRYPTO_INPUT } from 'src/types/wallet/stakeForms';
import { validateStakingMax } from 'src/utils/suite/staking';
import { FormFractionButtons } from 'src/components/suite/FormFractionButtons';

export const Inputs = () => {
    const { translationString } = useTranslation();
    const { CryptoAmountFormatter } = useFormatters();

    const {
        control,
        account,
        network,
        formState: { errors, isDirty },
        amountLimits,
        onCryptoAmountChange,
        onFiatAmountChange,
        localCurrency,
        isAmountForWithdrawalWarningShown,
        isLessAmountForWithdrawalWarningShown,
        isAdviceForWithdrawalWarningShown,
        currentRate,
        setRatioAmount,
        setMax,
        watch,
        clearForm,
    } = useStakeEthFormContext();

    const { MIN_FOR_WITHDRAWALS, MAX_AMOUNT_FOR_STAKING } = getStakingLimitsByNetwork(account);

    const cryptoError = errors.cryptoInput;
    const fiatError = errors.fiatInput;
    const hasValues = Boolean(watch(FIAT_INPUT) || watch(CRYPTO_INPUT));

    const fiatInputRules = {
        validate: {
            min: validateMin(translationString),
            decimals: validateDecimals(translationString, { decimals: 2 }),
        },
    };

    const cryptoInputRules = {
        required: translationString('AMOUNT_IS_NOT_SET'),
        validate: {
            min: validateMin(translationString),
            max: validateStakingMax(translationString, { maxAmount: MAX_AMOUNT_FOR_STAKING }),
            decimals: validateDecimals(translationString, { decimals: network.decimals }),
            reserveOrBalance: validateReserveOrBalance(translationString, {
                account,
            }),
            limits: validateCryptoLimits(translationString, {
                amountLimits,
                formatter: CryptoAmountFormatter,
            }),
        },
    };

    const shouldShowAmountForWithdrawalWarning =
        isLessAmountForWithdrawalWarningShown || isAmountForWithdrawalWarningShown;

    const displaySymbol = getNetworkDisplaySymbol(account.symbol);

    return (
        <Column gap={spacings.sm} alignItems="center">
            <NumberInput
                name={CRYPTO_INPUT}
                labelLeft={
                    <FormFractionButtons
                        setRatioAmount={setRatioAmount}
                        setMax={setMax}
                        account={account}
                        decimals={network.decimals}
                    />
                }
                labelRight={
                    (isDirty || hasValues) && (
                        <Button type="button" variant="tertiary" size="tiny" onClick={clearForm}>
                            <Translation id="TR_CLEAR_ALL" />
                        </Button>
                    )
                }
                control={control}
                rules={cryptoInputRules}
                maxLength={formInputsMaxLength.amount}
                innerAddon={<Text variant="tertiary">{displaySymbol}</Text>}
                bottomText={errors[CRYPTO_INPUT]?.message ?? null}
                inputState={getInputState(cryptoError || fiatError)}
                onChange={value => {
                    onCryptoAmountChange(value);
                }}
            />

            {currentRate?.rate && (
                <>
                    <Icon name="arrowsDownUp" size={20} variant="tertiary" />
                    <NumberInput
                        name={FIAT_INPUT}
                        control={control}
                        rules={fiatInputRules}
                        maxLength={formInputsMaxLength.fiat}
                        innerAddon={<Text variant="tertiary">{localCurrency.toUpperCase()}</Text>}
                        bottomText={errors[FIAT_INPUT]?.message ?? null}
                        inputState={getInputState(fiatError || cryptoError)}
                        onChange={value => {
                            onFiatAmountChange(value);
                        }}
                    />
                </>
            )}

            {shouldShowAmountForWithdrawalWarning && (
                <Banner variant="info">
                    <Translation
                        id={
                            isLessAmountForWithdrawalWarningShown
                                ? 'TR_STAKE_LEFT_SMALL_AMOUNT_FOR_WITHDRAWAL'
                                : 'TR_STAKE_LEFT_AMOUNT_FOR_WITHDRAWAL'
                        }
                        values={{
                            amount: MIN_FOR_WITHDRAWALS.toString(),
                            networkDisplaySymbol: displaySymbol,
                        }}
                    />
                </Banner>
            )}

            {isAdviceForWithdrawalWarningShown && (
                <Banner variant="info">
                    <Translation
                        id="TR_STAKE_RECOMMENDED_AMOUNT_FOR_WITHDRAWALS"
                        values={{
                            amount: MIN_FOR_WITHDRAWALS.toString(),
                            networkDisplaySymbol: displaySymbol,
                        }}
                    />
                </Banner>
            )}
        </Column>
    );
};
