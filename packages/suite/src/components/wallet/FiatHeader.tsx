import { PropsWithChildren } from 'react';

import styled from 'styled-components';

import { useFormatters } from '@suite-common/formatters';
import { typography } from '@trezor/theme';
import { useShouldRedactNumbers } from '@suite-common/wallet-utils';
import type { NetworkSymbol } from '@suite-common/wallet-config';

import { HiddenPlaceholder, RedactNumericalValue } from 'src/components/suite';
import { useSelector } from 'src/hooks/suite';
import { selectLanguage } from 'src/reducers/suite/suiteReducer';
import { useFiatFromCryptoValue } from 'src/hooks/suite/useFiatFromCryptoValue';

const ValueWrapper = styled.div`
    display: flex;
    align-items: flex-end;
`;

const WholeValue = styled.div<{ $size: 'large' | 'medium' }>`
    ${({ $size }) => ($size === 'large' ? typography.titleLarge : typography.titleMedium)};
    color: ${({ theme }) => theme.textDefault};
    font-variant-numeric: tabular-nums;
`;

const DecimalValue = styled.div<{ $size: 'large' | 'medium' }>`
    ${typography.hint};
    font-variant-numeric: tabular-nums;
    align-self: flex-end;
    letter-spacing: 0.565px;
    margin-bottom: ${({ $size }) => `${$size === 'large' ? '6px' : '2px'}`};
    color: ${({ theme }) => theme.textSubdued};
`;

type UseFiatAmountProps = { amount: string; symbol?: NetworkSymbol };

type FiatHeaderProps = {
    size: 'large' | 'medium';
    localCurrency: string;
    'data-testid'?: string;
} & UseFiatAmountProps;

// redacted value placeholder doesn't have to be displayed twice, display it only for whole value
const HideRedactedValue = ({ children }: PropsWithChildren) =>
    useShouldRedactNumbers() ? null : children;

const useFiatAmount = ({ amount, symbol }: UseFiatAmountProps) => {
    const { fiatAmount } = useFiatFromCryptoValue({
        amount,
        symbol: symbol ?? 'btc',
    });

    if (!symbol) {
        return amount;
    }

    return fiatAmount;
};

/**
 * If `symbol` is not provided, `amount` is returned as is, otherwise it is converted to fiat currency.
 */
export const FiatHeader = ({
    amount,
    symbol,
    size,
    localCurrency,
    'data-testid': dataTestId,
}: FiatHeaderProps) => {
    const language = useSelector(selectLanguage);
    const fiatAmount = useFiatAmount({ amount, symbol });
    const { FiatAmountFormatter } = useFormatters();
    const formattedAmount = FiatAmountFormatter({
        value: fiatAmount ?? '0',
        currency: localCurrency,
    });

    const formattedFiatAmount = formattedAmount?.props.children;
    const [whole, separator, fractional] = ['en', 'ja'].includes(language)
        ? formattedFiatAmount.split(/(\.)/)
        : formattedFiatAmount.split(/(,)/);

    return (
        <HiddenPlaceholder enforceIntensity={10}>
            <ValueWrapper data-testid={dataTestId}>
                <WholeValue $size={size}>
                    <RedactNumericalValue value={whole} />
                </WholeValue>
                <HideRedactedValue>
                    <DecimalValue $size={size}>
                        {separator}
                        {fractional}
                    </DecimalValue>
                </HideRedactedValue>
            </ValueWrapper>
        </HiddenPlaceholder>
    );
};
