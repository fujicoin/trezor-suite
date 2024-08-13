import styled from 'styled-components';

import { Card, variables } from '@trezor/components';
import { goto } from 'src/actions/suite/routerActions';
import { useDispatch } from 'src/hooks/suite';
import PaymentFailed from '../components/PaymentFailed';
import PaymentSuccessful from '../components/PaymentSuccessful';
import PaymentKYC from '../components/PaymentKYC';
import PaymentConverting from '../components/PaymentConverting';
import PaymentSending from '../components/PaymentSending';
import { CoinmarketExchangeOfferInfo } from '../../components/ExchangeForm/CoinmarketExchangeOfferInfo';
import { useCoinmarketDetailContext } from 'src/hooks/wallet/coinmarket/useCoinmarketDetail';
import { tradeFinalStatuses } from 'src/hooks/wallet/coinmarket/useCoinmarketWatchTrade';
import { CoinmarketTradeExchangeType } from 'src/types/coinmarket/coinmarket';

const Wrapper = styled.div`
    display: flex;
    margin-top: 20px;

    @media screen and (max-width: ${variables.SCREEN_SIZE.LG}) {
        flex-direction: column;
    }
`;

const StyledCard = styled(Card)`
    flex: 1;
    padding: 0;
`;

const CoinmarketDetail = () => {
    const { account, trade, info } = useCoinmarketDetailContext<CoinmarketTradeExchangeType>();
    const dispatch = useDispatch();

    // if trade not found, it is because user refreshed the page and stored transactionId got removed
    // go to the default coinmarket page, the trade is shown there in the previous trades
    if (!trade) {
        dispatch(
            goto('wallet-coinmarket-exchange', {
                params: {
                    symbol: account.symbol,
                    accountIndex: account.index,
                    accountType: account.accountType,
                },
            }),
        );

        return null;
    }

    const tradeStatus = trade?.data?.status || 'CONFIRMING';
    const exchangeTradeFinalStatuses = tradeFinalStatuses['exchange'];
    const showSending =
        !exchangeTradeFinalStatuses.includes(tradeStatus) && tradeStatus !== 'CONVERTING';

    const exchange = trade?.data?.exchange;
    const provider =
        info && info.providerInfos && exchange ? info.providerInfos[exchange] : undefined;
    const supportUrlTemplate = provider?.statusUrl || provider?.supportUrl;
    const supportUrl = supportUrlTemplate?.replace('{{orderId}}', trade?.data?.orderId || '');

    return (
        <Wrapper>
            <StyledCard>
                {tradeStatus === 'SUCCESS' && <PaymentSuccessful account={account} />}
                {tradeStatus === 'KYC' && (
                    <PaymentKYC account={account} provider={provider} supportUrl={supportUrl} />
                )}
                {tradeStatus === 'ERROR' && (
                    <PaymentFailed
                        account={account}
                        transactionId={trade.key}
                        supportUrl={supportUrl}
                    />
                )}
                {tradeStatus === 'CONVERTING' && <PaymentConverting supportUrl={supportUrl} />}
                {showSending && <PaymentSending supportUrl={supportUrl} />}
            </StyledCard>
            <CoinmarketExchangeOfferInfo
                account={account}
                exchangeInfo={info}
                selectedQuote={trade.data}
                transactionId={trade.key}
            />
        </Wrapper>
    );
};

export default CoinmarketDetail;