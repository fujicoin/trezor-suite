import { useState, Ref, ReactElement, InputHTMLAttributes } from 'react';
import { useMeasure } from 'react-use';

import styled from 'styled-components';

import { spacingsPx, spacings, typography } from '@trezor/theme';

import { Icon } from '../../Icon/Icon';
import { baseInputStyle, INPUT_HEIGHTS, BaseInputProps, Label, LABEL_TRANSFORM } from '../styles';
import { InputSize } from '../types';
import {
    FormCell,
    FormCellProps,
    allowedFormCellFrameProps,
    pickFormCellProps,
} from '../FormCell/FormCell';
import { useElevation } from '../../ElevationContext/ElevationContext';
import { UIHorizontalAlignment } from '../../../config/types';
import {
    TextPropsKeys,
    withTextProps,
    TextProps,
    pickAndPrepareTextProps,
} from '../../typography/utils';
import { TransientProps } from '../../../utils/transientProps';
import { FrameProps } from '../../../utils/frameProps';

export const allowedInputFrameProps = allowedFormCellFrameProps;
type AllowedFrameProps = Pick<FrameProps, (typeof allowedInputFrameProps)[number]>;

export const allowedInputTextProps = [
    'typographyStyle',
    'align',
] as const satisfies TextPropsKeys[];
type AllowedTextProps = Pick<TextProps, (typeof allowedInputTextProps)[number]>;

interface StyledInputProps extends BaseInputProps {
    $size: InputSize;
    $leftAddonWidth?: number;
    $rightAddonWidth?: number;
    $isWithLabel: boolean;
}

const getExtraAddonPadding = (size: InputSize) =>
    (size === 'small' ? spacings.sm : spacings.md) + spacings.xs;

const StyledInput = styled.input<StyledInputProps & TransientProps<AllowedTextProps>>`
    padding: 0 ${spacingsPx.md};
    padding-left: ${({ $leftAddonWidth, $size }) =>
        $leftAddonWidth ? `${$leftAddonWidth + getExtraAddonPadding($size)}px` : undefined};
    padding-right: ${({ $rightAddonWidth, $size }) =>
        $rightAddonWidth ? `${$rightAddonWidth + getExtraAddonPadding($size)}px` : undefined};
    height: ${({ $size }) => `${INPUT_HEIGHTS[$size as InputSize]}px`};
    ${baseInputStyle}
    ${({ $size }) => $size === 'small' && typography.hint};

    &:disabled {
        pointer-events: auto;
        cursor: not-allowed;
    }

    ${withTextProps}
`;

const InputWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
`;

const getInputAddonPadding = (size: InputSize) =>
    size === 'small' ? spacingsPx.sm : spacingsPx.md;

const InputAddon = styled.div<{ $align: InnerAddonAlignment; $size: InputSize }>`
    position: absolute;
    inset: 0 ${({ $align, $size }) => ($align === 'right' ? getInputAddonPadding($size) : 'auto')} 0
        ${({ $align, $size }) => ($align === 'left' ? getInputAddonPadding($size) : 'auto')};
    display: flex;
    align-items: center;
`;

const InputLabel = styled(Label)`
    /* move up when input is focused OR has a placeholder OR has value  */
    input:focus ~ &,
    input:not(:placeholder-shown) ~ &,
    input:not([value='']) ~ & {
        transform: ${LABEL_TRANSFORM};
    }
`;

type InnerAddonAlignment = Extract<UIHorizontalAlignment, 'left' | 'right'>;

type InputHTMLProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type InputProps = InputHTMLProps &
    AllowedFrameProps &
    AllowedTextProps &
    Omit<FormCellProps, 'children'> & {
        value?: string;
        innerRef?: Ref<HTMLInputElement>;
        label?: ReactElement | string;
        innerAddon?: ReactElement;
        size?: InputSize;
        'data-testid'?: string;
        innerAddonAlign?: InnerAddonAlignment;
        /**
         * @description the clear button replaces the addon on the right side
         */
        showClearButton?: 'hover' | 'always';
        onClear?: () => void;
    };

const Input = ({
    value,
    innerRef,
    label,
    innerAddon,
    innerAddonAlign = 'right',
    size = 'large',
    'data-testid': dataTest,
    showClearButton,
    placeholder,
    onClear,
    ...rest
}: InputProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { elevation } = useElevation();
    const textProps = pickAndPrepareTextProps(rest, allowedInputTextProps);
    const formCellProps = pickFormCellProps(rest);
    const { isDisabled, inputState } = formCellProps;
    const inputProps = Object.entries(rest).reduce((props, [propKey, propValue]) => {
        if (!(propKey in formCellProps) && !(propKey in textProps)) {
            props[propKey as keyof InputHTMLProps] = propValue;
        }

        return props;
    }, {} as InputHTMLProps);

    const hasShowClearButton =
        (showClearButton === 'always' || (showClearButton === 'hover' && isHovered)) &&
        value &&
        value?.length > 0;

    const [measureLeftAddon, { width: leftAddonWidth }] = useMeasure<HTMLDivElement>();
    const [measureRightAddon, { width: rightAddonWidth }] = useMeasure<HTMLDivElement>();

    return (
        <FormCell {...formCellProps}>
            <InputWrapper
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {innerAddon && innerAddonAlign === 'left' && (
                    <InputAddon $align="left" ref={measureLeftAddon} $size={size}>
                        {innerAddon}
                    </InputAddon>
                )}

                {((innerAddon && innerAddonAlign === 'right') || hasShowClearButton) && (
                    <InputAddon $align="right" ref={measureRightAddon} $size={size}>
                        {!hasShowClearButton && innerAddon}

                        {hasShowClearButton && <Icon name="xCircle" size={16} onClick={onClear} />}
                    </InputAddon>
                )}

                <StyledInput
                    $elevation={elevation}
                    value={value}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    $inputState={inputState}
                    disabled={isDisabled ?? false}
                    $size={size}
                    ref={innerRef}
                    data-lpignore="true"
                    $leftAddonWidth={leftAddonWidth}
                    $rightAddonWidth={rightAddonWidth}
                    $isWithLabel={!!label}
                    placeholder={placeholder || ''} // needed for uncontrolled inputs
                    data-testid={dataTest}
                    {...textProps}
                    {...inputProps}
                />

                {label && (
                    <InputLabel $size={size} $isDisabled={isDisabled}>
                        {label}
                    </InputLabel>
                )}
            </InputWrapper>
        </FormCell>
    );
};

Input.InputAddon = InputAddon;

export { Input };
