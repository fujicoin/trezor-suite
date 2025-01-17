import Animated, { FadeIn } from 'react-native-reanimated';

import { AlertBox, Box, Toggle, VStack } from '@suite-native/atoms';
import { getNetwork, NetworkSymbol } from '@suite-common/wallet-config';
import { Translation } from '@suite-native/intl';

type IncludeTokensToggleProps = {
    networkSymbol: NetworkSymbol;
    isToggled: boolean;
    onToggle: () => void;
};

export const IncludeTokensToggle = ({
    networkSymbol,
    isToggled,
    onToggle,
}: IncludeTokensToggleProps) => {
    const networkName = getNetwork(networkSymbol).name;

    return (
        <VStack spacing="sp24" marginTop="sp8">
            <Box marginHorizontal="sp24">
                <Toggle
                    leftLabel={networkName}
                    rightLabel={<Translation id="transactions.tokens.toggleTokens" />}
                    isToggled={isToggled}
                    onToggle={onToggle}
                />
            </Box>
            {isToggled && (
                <Animated.View entering={FadeIn}>
                    <Box marginHorizontal="sp8">
                        <AlertBox
                            variant="info"
                            title={
                                <Translation
                                    id="transactions.tokens.title"
                                    values={{ networkName }}
                                />
                            }
                        />
                    </Box>
                </Animated.View>
            )}
        </VStack>
    );
};
