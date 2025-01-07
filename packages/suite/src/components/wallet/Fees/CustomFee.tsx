import {
    Control,
    FieldErrors,
    FieldPath,
    UseFormGetValues,
    UseFormRegister,
    UseFormReturn,
    UseFormSetValue,
} from 'react-hook-form';

import { BigNumber } from '@trezor/utils/src/bigNumber';
import { Note, Banner, variables, Grid, Column, useMediaQuery, Text } from '@trezor/components';
import { getInputState, getFeeUnits, isInteger } from '@suite-common/wallet-utils';
import { FeeInfo, FormState } from '@suite-common/wallet-types';
import { NetworkType } from '@suite-common/wallet-config';
import { spacings } from '@trezor/theme';
import { HELP_CENTER_TRANSACTION_FEES_URL } from '@trezor/urls';
import { NumberInput } from '@trezor/product-components';

import { validateDecimals } from 'src/utils/suite/validation';
import { useSelector, useTranslation } from 'src/hooks/suite';
import { Translation } from 'src/components/suite';
import { selectLanguage } from 'src/reducers/suite/suiteReducer';
import { LearnMoreButton } from 'src/components/suite/LearnMoreButton';

import { InputError } from '../InputError';

const FEE_PER_UNIT = 'feePerUnit';
const FEE_LIMIT = 'feeLimit';

interface CustomFeeProps<TFieldValues extends FormState> {
    networkType: NetworkType;
    feeInfo: FeeInfo;
    errors: FieldErrors<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
    control: Control;
    setValue: UseFormSetValue<TFieldValues>;
    getValues: UseFormGetValues<TFieldValues>;
    changeFeeLimit?: (value: string) => void;
    composedFeePerByte: string;
}

export const CustomFee = <TFieldValues extends FormState>({
    networkType,
    feeInfo,
    register,
    control,
    changeFeeLimit,
    composedFeePerByte,
    ...props
}: CustomFeeProps<TFieldValues>) => {
    const { translationString } = useTranslation();
    const isBelowLaptop = useMediaQuery(`(max-width: ${variables.SCREEN_SIZE.LG})`);

    const locale = useSelector(selectLanguage);

    // Type assertion allowing to make the component reusable, see https://stackoverflow.com/a/73624072.
    const { getValues, setValue } = props as unknown as UseFormReturn<FormState>;
    const errors = props.errors as unknown as FieldErrors<FormState>;

    const { maxFee, minFee } = feeInfo;

    const feePerUnitValue = getValues(FEE_PER_UNIT);
    const feeUnits = getFeeUnits(networkType);
    const estimatedFeeLimit = getValues('estimatedFeeLimit');

    const feePerUnitError = errors.feePerUnit;
    const feeLimitError = errors.feeLimit;

    const useFeeLimit = networkType === 'ethereum';
    const isComposedFeeRateDifferent =
        !feePerUnitError && composedFeePerByte && feePerUnitValue !== composedFeePerByte;
    let feeDifferenceWarning;
    if (isComposedFeeRateDifferent && networkType === 'bitcoin') {
        const baseFee = getValues('baseFee');
        feeDifferenceWarning = (
            <Translation
                id={baseFee ? 'TR_FEE_ROUNDING_BASEFEE_WARNING' : 'TR_FEE_ROUNDING_DEFAULT_WARNING'}
                values={{
                    feeRate: (
                        <>
                            <strong>{composedFeePerByte}</strong> {feeUnits}
                        </>
                    ),
                }}
            />
        );
    }

    const sharedRules = {
        required: translationString('CUSTOM_FEE_IS_NOT_SET'),
        // Allow decimals in ETH since GWEI is not a satoshi.
        validate: (value: string) => {
            if (['bitcoin', 'ethereum'].includes(networkType) && !isInteger(value)) {
                return translationString('CUSTOM_FEE_IS_NOT_INTEGER');
            }
        },
    };
    const feeLimitRules = {
        ...sharedRules,
        validate: {
            ...sharedRules.validate,
            feeLimit: (value: string) => {
                const feeBig = new BigNumber(value);
                if (estimatedFeeLimit && feeBig.lt(estimatedFeeLimit)) {
                    return translationString('CUSTOM_FEE_LIMIT_BELOW_RECOMMENDED');
                }
            },
        },
    };
    const feeRules = {
        ...sharedRules,
        validate: {
            ...sharedRules.validate,
            bitcoinDecimalsLimit: validateDecimals(translationString, {
                decimals: 2,
                except: networkType !== 'bitcoin',
            }),
            // GWEI: 9 decimal places.
            ethereumDecimalsLimit: validateDecimals(translationString, {
                decimals: 9,
                except: networkType !== 'ethereum',
            }),
            range: (value: string) => {
                const customFee = new BigNumber(value);

                if (customFee.isGreaterThan(maxFee) || customFee.isLessThan(minFee)) {
                    return translationString('CUSTOM_FEE_NOT_IN_RANGE', {
                        minFee: new BigNumber(minFee).toString(),
                        maxFee: new BigNumber(maxFee).toString(),
                    });
                }
            },
        },
    };

    const feeLimitValidationProps = {
        onClick: () =>
            estimatedFeeLimit &&
            setValue(FEE_LIMIT, estimatedFeeLimit, {
                shouldValidate: true,
            }),
        text: translationString('CUSTOM_FEE_LIMIT_USE_RECOMMENDED'),
    };
    const validationButtonProps =
        feeLimitError?.type === 'feeLimit' ? feeLimitValidationProps : undefined;

    return (
        <Column gap={spacings.xs}>
            <Banner
                icon
                variant="warning"
                rightContent={
                    <LearnMoreButton
                        textWrap={false}
                        url={HELP_CENTER_TRANSACTION_FEES_URL}
                        variant="warning"
                    />
                }
            >
                <Translation id="TR_CUSTOM_FEE_WARNING" />
            </Banner>
            <Grid gap={spacings.xs} columns={useFeeLimit && !isBelowLaptop ? 2 : 1}>
                {useFeeLimit ? (
                    <NumberInput
                        label={<Translation id="TR_GAS_LIMIT" />}
                        locale={locale}
                        control={control}
                        inputState={getInputState(feeLimitError)}
                        name={FEE_LIMIT}
                        data-testid={FEE_LIMIT}
                        onChange={changeFeeLimit}
                        bottomText={
                            feeLimitError?.message ? (
                                <InputError
                                    message={feeLimitError?.message}
                                    buttonProps={validationButtonProps}
                                />
                            ) : null
                        }
                        rules={feeLimitRules}
                    />
                ) : (
                    <input type="hidden" {...register(FEE_LIMIT as FieldPath<TFieldValues>)} />
                )}
                <NumberInput
                    label={useFeeLimit ? <Translation id="TR_GAS_PRICE" /> : undefined}
                    locale={locale}
                    control={control}
                    inputState={getInputState(feePerUnitError)}
                    innerAddon={
                        <Text variant="tertiary" typographyStyle="label">
                            {feeUnits}
                        </Text>
                    }
                    name={FEE_PER_UNIT}
                    data-testid={FEE_PER_UNIT}
                    rules={feeRules}
                    bottomText={feePerUnitError?.message || null}
                />
            </Grid>
            {feeDifferenceWarning && <Note>{feeDifferenceWarning}</Note>}
        </Column>
    );
};
