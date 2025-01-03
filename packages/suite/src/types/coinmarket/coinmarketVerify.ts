import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { CryptoId } from 'invity-api';

import { AccountAddress } from '@trezor/connect';

import type { Account } from 'src/types/wallet';
import { ExtendedMessageDescriptor } from 'src/types/suite';

export interface CoinmarketVerifyFormProps {
    address?: string;
    extraField?: string;
}

export type CoinmarketAccountType = 'SUITE' | 'ADD_SUITE' | 'NON_SUITE';
export interface CoinmarketVerifyFormAccountOptionProps {
    type: CoinmarketAccountType;
    account?: Account;
}

export interface CoinmarketVerifyAccountProps {
    cryptoId: CryptoId | undefined;
}

export interface CoinmarketGetTranslationIdsProps {
    accountTooltipTranslationId: ExtendedMessageDescriptor['id'];
    addressTooltipTranslationId: ExtendedMessageDescriptor['id'];
}

export interface CoinmarketVerifyAccountReturnProps {
    form: UseFormReturn<CoinmarketVerifyFormProps>;
    accountAddress: AccountAddress | Pick<AccountAddress, 'path' | 'address'> | undefined;
    receiveNetwork: CryptoId | undefined;
    selectAccountOptions: CoinmarketVerifyFormAccountOptionProps[];
    selectedAccountOption?: CoinmarketVerifyFormAccountOptionProps;
    isMenuOpen: boolean | undefined;
    getTranslationIds: (
        type: CoinmarketVerifyFormAccountOptionProps['type'] | undefined,
    ) => CoinmarketGetTranslationIdsProps;
    onChangeAccount: (account: CoinmarketVerifyFormAccountOptionProps) => void;
}

export type CoinmarketVerifyOptionsProps = { receiveNetwork: CryptoId; label: ReactNode } & Pick<
    CoinmarketVerifyAccountReturnProps,
    'selectAccountOptions' | 'selectedAccountOption' | 'onChangeAccount' | 'isMenuOpen'
>;

export interface CoinmarketVerifyOptionsItemProps {
    option: CoinmarketVerifyFormAccountOptionProps;
    receiveNetwork: CryptoId;
}
