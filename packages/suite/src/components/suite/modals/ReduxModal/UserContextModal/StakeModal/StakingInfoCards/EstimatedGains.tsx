import React from 'react';
import { useSelector } from 'react-redux';

import { selectPoolStatsApyData, StakeRootState } from '@suite-common/wallet-core';
import { Column, Grid, Image, Paragraph, Text } from '@trezor/components';
import { negativeSpacings, spacings } from '@trezor/theme';
import { HELP_CENTER_ETH_STAKING, HELP_CENTER_SOL_STAKING } from '@trezor/urls';

import { Translation } from 'src/components/suite/Translation';
import { useStakeEthFormContext } from 'src/hooks/wallet/useStakeEthForm';
import { CRYPTO_INPUT } from 'src/types/wallet/stakeForms';
import { FiatValue, FormattedCryptoAmount, TrezorLink } from 'src/components/suite';
import { calculateGains } from 'src/utils/suite/staking';

export const EstimatedGains = () => {
    const { account, getValues, formState } = useStakeEthFormContext();

    const value = getValues(CRYPTO_INPUT);
    const hasInvalidFormState =
        Object.keys(formState.errors).length > 0 &&
        formState.errors[CRYPTO_INPUT]?.type !== 'reserveOrBalance'; // provide gains calculation even if the user has not enough balance

    const cryptoInput = hasInvalidFormState || !value ? '0' : value;

    const apy = useSelector((state: StakeRootState) =>
        selectPoolStatsApyData(state, account?.symbol),
    );

    const gains = [
        {
            label: <Translation id="TR_STAKE_WEEKLY" />,
            value: calculateGains(cryptoInput, apy, 52),
        },
        {
            label: <Translation id="TR_STAKE_MONTHLY" />,
            value: calculateGains(cryptoInput, apy, 12),
        },
        {
            label: <Translation id="TR_STAKE_YEARLY" />,
            value: calculateGains(cryptoInput, apy, 1),
        },
    ];

    return (
        <Column gap={spacings.lg}>
            <Column>
                <Paragraph variant="primary" typographyStyle="titleMedium">
                    {apy}%
                </Paragraph>
                <Paragraph
                    typographyStyle="hint"
                    variant="tertiary"
                    margin={{ bottom: negativeSpacings.xxxxl }}
                >
                    <Translation id="TR_STAKE_APY_ABBR" />
                </Paragraph>
                <Image image="GAINS_GRAPH" width="100%" />
            </Column>
            <Column gap={spacings.sm} hasDivider>
                {gains.map(({ label, value }, index) => (
                    <Grid key={index} columns={3}>
                        <Paragraph variant="tertiary">{label}</Paragraph>
                        <Text variant="primary">
                            <FormattedCryptoAmount value={value} symbol={account.symbol} />
                        </Text>
                        <Paragraph align="right">
                            <FiatValue amount={value} symbol={account.symbol} />
                        </Paragraph>
                    </Grid>
                ))}
            </Column>
            <Paragraph variant="tertiary">
                <Translation
                    id="TR_STAKING_YOUR_EARNINGS"
                    values={{
                        a: chunks => (
                            <TrezorLink
                                href={
                                    account.networkType === 'solana'
                                        ? HELP_CENTER_SOL_STAKING
                                        : HELP_CENTER_ETH_STAKING
                                }
                            >
                                {chunks}
                            </TrezorLink>
                        ),
                    }}
                />
            </Paragraph>
        </Column>
    );
};
