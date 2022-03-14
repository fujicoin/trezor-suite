import React from 'react';
import { Translation } from '@suite-components';
import { AccountExceptionLayout, WalletLayout } from '@wallet-components';
import { AppState } from '@suite-types';
import { useCardanoStaking } from '@wallet-hooks/useCardanoStaking';
import Rewards from './components/Rewards';
import Stake from './components/Stake';
import Redelegate from './components/Redelegate';
import { useSelector } from '@suite-hooks';

const CardanoStakingLoaded = (props: {
    selectedAccount: Extract<AppState['wallet']['selectedAccount'], { status: 'loaded' }>;
}) => {
    const { isActive, isStakingOnTrezorPool, isCurrentPoolOversaturated } = useCardanoStaking();

    return (
        <WalletLayout
            title="TR_NAV_STAKING"
            account={props.selectedAccount}
            showEmptyHeaderPlaceholder
        >
            <>
                {isActive && <Rewards account={props.selectedAccount.account} />}
                {!isActive && <Stake account={props.selectedAccount.account} />}
                {isActive && (isStakingOnTrezorPool === false || isCurrentPoolOversaturated) && (
                    <Redelegate />
                )}
            </>
        </WalletLayout>
    );
};

const CardanoStaking = () => {
    const { selectedAccount } = useSelector(s => s.wallet);
    if (selectedAccount.status !== 'loaded') {
        return <WalletLayout title="TR_NAV_STAKING" account={selectedAccount} />;
    }

    // render staking component only in cardano
    if (selectedAccount.account.networkType === 'cardano') {
        return <CardanoStakingLoaded selectedAccount={selectedAccount} />;
    }

    // unsupported network
    return (
        <WalletLayout title="TR_NAV_STAKING" account={selectedAccount}>
            <AccountExceptionLayout
                title={<Translation id="TR_STAKING_IS_NOT_SUPPORTED" />}
                image="CLOUDY"
            />
        </WalletLayout>
    );
};

export default CardanoStaking;
