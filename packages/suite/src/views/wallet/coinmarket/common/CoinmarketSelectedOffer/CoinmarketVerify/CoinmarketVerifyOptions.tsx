import { Select } from '@trezor/components';

import { Translation } from 'src/components/suite';
import { useCoinmarketInfo } from 'src/hooks/wallet/coinmarket/useCoinmarketInfo';
import {
    CoinmarketVerifyOptionsProps,
    CoinmarketVerifyFormAccountOptionProps,
} from 'src/types/coinmarket/coinmarketVerify';
import {
    getCoinmarketNetworkDisplaySymbol,
    parseCryptoId,
} from 'src/utils/wallet/coinmarket/coinmarketUtils';
import { CoinmarketVerifyOptionsItem } from 'src/views/wallet/coinmarket/common/CoinmarketSelectedOffer/CoinmarketVerify/CoinmarketVerifyOptionsItem';

export const CoinmarketVerifyOptions = ({
    receiveNetwork,
    selectAccountOptions,
    selectedAccountOption,
    isMenuOpen,
    label,
    onChangeAccount,
}: CoinmarketVerifyOptionsProps) => {
    const { cryptoIdToPlatformName, cryptoIdToCoinName } = useCoinmarketInfo();

    const { networkId, contractAddress } = parseCryptoId(receiveNetwork);
    const coinName = contractAddress
        ? cryptoIdToPlatformName(networkId)
        : cryptoIdToCoinName(networkId);
    const displaySymbol = coinName && getCoinmarketNetworkDisplaySymbol(coinName);

    return (
        <Select
            onChange={(selected: CoinmarketVerifyFormAccountOptionProps) =>
                onChangeAccount(selected)
            }
            value={selectedAccountOption}
            labelLeft={label}
            isClearable={false}
            options={selectAccountOptions}
            minValueWidth="70px"
            formatOptionLabel={option => (
                <CoinmarketVerifyOptionsItem option={option} receiveNetwork={receiveNetwork} />
            )}
            isMenuOpen={isMenuOpen}
            isDisabled={selectAccountOptions.length === 1}
            placeholder={
                <Translation
                    id="TR_EXCHANGE_SELECT_RECEIVE_ACCOUNT"
                    values={{
                        symbol: displaySymbol,
                    }}
                />
            }
        />
    );
};
