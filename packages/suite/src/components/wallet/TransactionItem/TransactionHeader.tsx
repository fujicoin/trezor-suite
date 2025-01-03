import { getTxHeaderSymbol, isSupportedEthStakingNetworkSymbol } from '@suite-common/wallet-utils';
import { AccountTransaction } from '@trezor/connect';
import { Row } from '@trezor/components';
import { spacings } from '@trezor/theme';
import { getNetworkDisplaySymbol, isNetworkSymbol } from '@suite-common/wallet-config';

import { useTranslation } from 'src/hooks/suite';
import { WalletAccountTransaction } from 'src/types/wallet';
import { UnstakingTxAmount } from 'src/components/suite/UnstakingTxAmount';
import { BlurUrls } from 'src/views/wallet/tokens/common/BlurUrls';

type TransactionHeaderProps = {
    transaction: WalletAccountTransaction;
    isPending: boolean;
};

type GetSelfTransactionMessageByTypeProps = {
    type?: Required<AccountTransaction>['cardanoSpecific']['subtype'];
    isPending: TransactionHeaderProps['isPending'];
};

const getSelfTransactionMessageByType = ({
    type,
    isPending,
}: GetSelfTransactionMessageByTypeProps) => {
    switch (type) {
        case 'withdrawal':
            return 'TR_REWARDS_WITHDRAWAL';
        case 'stake_delegation':
            return 'TR_STAKE_DELEGATED';
        case 'stake_registration':
            return 'TR_STAKE_REGISTERED';
        case 'stake_deregistration':
            return 'TR_STAKE_DEREGISTERED';
        default:
            return isPending ? 'TR_SENDING_SYMBOL_TO_SELF' : 'TR_SENT_SYMBOL_TO_SELF';
    }
};

interface GetTransactionMessageIdProps {
    transaction: WalletAccountTransaction;
    isPending: boolean;
}

const getTransactionMessageId = ({ transaction, isPending }: GetTransactionMessageIdProps) => {
    switch (transaction.type) {
        case 'sent':
            return isPending ? 'TR_SENDING_SYMBOL' : 'TR_SENT_SYMBOL';
        case 'recv':
            return isPending ? 'TR_RECEIVING_SYMBOL' : 'TR_RECEIVED_SYMBOL';
        case 'failed':
            return 'TR_FAILED_TRANSACTION';
        case 'joint':
            return 'TR_JOINT_TRANSACTION';
        case 'contract':
            return 'TR_CONTRACT_TRANSACTION';
        case 'self':
            return getSelfTransactionMessageByType({
                type: transaction.cardanoSpecific?.subtype,
                isPending,
            });
        case 'unknown':
        default:
            return 'TR_UNKNOWN_TRANSACTION';
    }
};

export const TransactionHeader = ({ transaction, isPending }: TransactionHeaderProps) => {
    const { translationString } = useTranslation();

    if (transaction?.ethereumSpecific?.parsedData?.name) {
        return (
            <Row gap={spacings.xxs} overflow="hidden">
                <span>{transaction.ethereumSpecific.parsedData.name}</span>
                {isSupportedEthStakingNetworkSymbol(transaction.symbol) && (
                    <UnstakingTxAmount transaction={transaction} />
                )}
            </Row>
        );
    }

    const isMultiTokenTransaction = transaction.tokens.length > 1;
    const transactionSymbol = getTxHeaderSymbol(transaction);
    const symbol =
        transactionSymbol && isNetworkSymbol(transactionSymbol)
            ? getNetworkDisplaySymbol(transactionSymbol)
            : transactionSymbol?.toUpperCase();

    return (
        <BlurUrls
            text={translationString(getTransactionMessageId({ transaction, isPending }), {
                symbol,
                multiple: isMultiTokenTransaction,
            })}
        />
    );
};
