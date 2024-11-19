import { useMemo } from 'react';

import {
    Button,
    Card,
    Column,
    Paragraph,
    Text,
    Tooltip,
    variables,
    Divider,
    Grid,
    useMediaQuery,
    IconName,
} from '@trezor/components';
import { spacings } from '@trezor/theme';
import { selectPoolStatsApyData } from '@suite-common/wallet-core';

import { Translation, StakingFeature } from 'src/components/suite';
import { openModal } from 'src/actions/suite/modalActions';
import { useDispatch, useSelector } from 'src/hooks/suite';
import { DashboardSection } from 'src/components/dashboard';
import { selectSelectedAccount } from 'src/reducers/wallet/selectedAccountReducer';
import { useMessageSystemStaking } from 'src/hooks/suite/useMessageSystemStaking';

export const EmptyStakingCard = () => {
    const isBelowLaptop = useMediaQuery(`(max-width: ${variables.SCREEN_SIZE.LG})`);
    const account = useSelector(selectSelectedAccount);

    const { isStakingDisabled, stakingMessageContent } = useMessageSystemStaking();

    const ethApy = useSelector(state => selectPoolStatsApyData(state, account?.symbol));
    // TODO: calc solApy

    const dispatch = useDispatch();
    const openStakingEthInANutshellModal = () => {
        if (!isStakingDisabled) {
            dispatch(openModal({ type: 'stake-eth-in-a-nutshell' }));
        }
    };

    const stakeEthFeatures = useMemo(
        () => [
            {
                id: 0,
                icon: 'piggyBank' as IconName,
                title: <Translation id="TR_STAKE_ETH_SEE_MONEY_DANCE" />,
                description: (
                    <Translation
                        id="TR_STAKE_NETWORK_SEE_MONEY_DANCE_DESC"
                        values={{
                            apyPercent: ethApy,
                            symbol: account?.symbol.toUpperCase(),
                            t: text => (
                                <Tooltip
                                    dashed
                                    isInline
                                    content={<Translation id="TR_STAKE_APY_DESC" />}
                                >
                                    <abbr>{text}</abbr>
                                </Tooltip>
                            ),
                        }}
                    />
                ),
            },
            {
                id: 1,
                icon: 'lockLaminatedOpen' as IconName,
                title: <Translation id="TR_STAKE_ETH_LOCK_FUNDS" />,
                description: <Translation id="TR_STAKE_ETH_LOCK_FUNDS_DESC" />,
            },
            {
                id: 2,
                icon: 'everstakeLogo' as IconName,
                title: <Translation id="TR_STAKE_ETH_EVERSTAKE" />,
                description: <Translation id="TR_STAKE_ETH_EVERSTAKE_DESC" />,
            },
        ],
        [ethApy, account?.symbol],
    );

    return (
        <DashboardSection
            heading={
                <Translation
                    id="TR_STAKE_NETWORK"
                    values={{ symbol: account?.symbol.toUpperCase() }}
                />
            }
        >
            <Card>
                <Column>
                    <section>
                        <Text typographyStyle="highlight">
                            <Translation id="TR_STAKE_WHAT_IS_STAKING" />
                        </Text>
                        <Paragraph variant="tertiary">
                            <Translation
                                id="TR_STAKE_NETWORK_STAKING_IS"
                                values={{ symbol: account?.symbol.toUpperCase() }}
                            />
                        </Paragraph>
                    </section>
                    <Divider />
                    <section>
                        <Grid
                            columns={isBelowLaptop ? 1 : 3}
                            gap={isBelowLaptop ? spacings.xxxl : spacings.xxxxl}
                            margin={{ top: spacings.xl, bottom: spacings.xxl }}
                        >
                            {stakeEthFeatures.map(({ id, icon, title, description }) => (
                                <StakingFeature
                                    icon={icon}
                                    title={title}
                                    description={description}
                                    key={id}
                                />
                            ))}
                        </Grid>
                        <Tooltip content={stakingMessageContent}>
                            <Button
                                onClick={openStakingEthInANutshellModal}
                                isDisabled={isStakingDisabled}
                                icon={isStakingDisabled ? 'info' : undefined}
                            >
                                <Translation id="TR_STAKE_START_STAKING" />
                            </Button>
                        </Tooltip>
                    </section>
                </Column>
            </Card>
        </DashboardSection>
    );
};
