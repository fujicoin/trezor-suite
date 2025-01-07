import { TranslationKey } from '@suite-common/intl-types';
import { desktopApi } from '@trezor/suite-desktop-api';
import { EXPERIMENTAL_PASSWORD_MANAGER_KB_URL, HELP_CENTER_TOR_URL, Url } from '@trezor/urls';
import { Route } from '@suite-common/suite-types';
import { isDesktop } from '@trezor/env-utils';

import { Dispatch } from '../../types/suite';

export type ExperimentalFeature =
    | 'password-manager'
    | 'tor-external'
    | 'nft-section'
    | 'ethereum-l2-support';

export type ExperimentalFeatureConfig = {
    title: TranslationKey;
    description: TranslationKey;
    knowledgeBaseUrl?: Url;
    routeName?: Route['name'];
    isDisabled?: (context: { isDebug: boolean }) => boolean;
    onToggle?: ({ newValue, dispatch }: { newValue: boolean; dispatch: Dispatch }) => void;
};

export const EXPERIMENTAL_FEATURES: Record<ExperimentalFeature, ExperimentalFeatureConfig> = {
    'password-manager': {
        title: 'TR_EXPERIMENTAL_PASSWORD_MANAGER',
        description: 'TR_EXPERIMENTAL_PASSWORD_MANAGER_DESCRIPTION',
        knowledgeBaseUrl: EXPERIMENTAL_PASSWORD_MANAGER_KB_URL,
        routeName: 'password-manager-index',
    },
    'tor-external': {
        title: 'TR_EXPERIMENTAL_TOR_EXTERNAL',
        description: 'TR_EXPERIMENTAL_TOR_EXTERNAL_DESCRIPTION',
        knowledgeBaseUrl: HELP_CENTER_TOR_URL,
        isDisabled: () => !isDesktop(),
        onToggle: async ({ newValue }) => {
            const result = await desktopApi.getTorSettings();
            if (result.success && result.payload.useExternalTor !== newValue) {
                await desktopApi.changeTorSettings({
                    ...result.payload,
                    useExternalTor: newValue,
                });
            }
        },
    },
    'ethereum-l2-support': {
        title: 'TR_EXPERIMENTAL_ETHEREUM_L2_SUPPORT',
        description: 'TR_EXPERIMENTAL_ETHEREUM_L2_SUPPORT_DESCRIPTION',
    },
    'nft-section': {
        title: 'TR_EXPERIMENTAL_NFT_SECTION',
        description: 'TR_EXPERIMENTAL_NFT_SECTION_DESCRIPTION',
    },
};
