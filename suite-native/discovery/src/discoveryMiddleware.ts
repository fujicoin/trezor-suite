import { createMiddlewareWithExtraDeps } from '@suite-common/redux-utils';
import { periodicCheckTokenDefinitionsThunk } from '@suite-common/token-definitions';
import {
    deviceActions,
    discoveryActions,
    selectDeviceModel,
    selectDeviceFirmwareVersion,
    authorizeDeviceThunk,
    accountsActions,
} from '@suite-common/wallet-core';
import { isFirmwareVersionSupported } from '@suite-native/device';
import { hasBitcoinOnlyFirmware } from '@trezor/device-utils';

import { startDescriptorPreloadedDiscoveryThunk, discoveryCheckThunk } from './discoveryThunks';
import {
    selectAreTestnetsEnabled,
    selectIsCoinEnablingInitFinished,
    toggleAreTestnetsEnabled,
    setEnabledDiscoveryNetworkSymbols,
    toggleEnabledDiscoveryNetworkSymbol,
    addEnabledDiscoveryNetworkSymbol,
} from './discoveryConfigSlice';

export const prepareDiscoveryMiddleware = createMiddlewareWithExtraDeps(
    (action, { dispatch, next, getState }) => {
        if (
            deviceActions.forgetDevice.match(action) &&
            action.payload.device.state?.staticSessionId
        ) {
            dispatch(discoveryActions.removeDiscovery(action.payload.device.state.staticSessionId));
        }

        const deviceModel = selectDeviceModel(getState());
        const deviceFwVersion = selectDeviceFirmwareVersion(getState());
        const areTestnetsEnabled = selectAreTestnetsEnabled(getState());
        const isCoinEnablingInitFinished = selectIsCoinEnablingInitFinished(getState());

        const isDeviceFirmwareVersionSupported = isFirmwareVersionSupported(
            deviceFwVersion,
            deviceModel,
        );

        // If user enables testnets discovery, run discovery with testnets enabled.
        if (
            toggleAreTestnetsEnabled.match(action) &&
            !areTestnetsEnabled &&
            isDeviceFirmwareVersionSupported &&
            isCoinEnablingInitFinished
        ) {
            dispatch(
                startDescriptorPreloadedDiscoveryThunk({
                    forcedAreTestnetsEnabled: areTestnetsEnabled,
                }),
            );
        }

        // We need to wait until `authorizeDeviceThunk` action is fulfilled, because we need
        // to know the device state when starting discovery of newly authorized device.
        next(action);

        // On successful authorization, create discovery instance and run it with received device state.
        if (
            authorizeDeviceThunk.fulfilled.match(action) &&
            isDeviceFirmwareVersionSupported &&
            isCoinEnablingInitFinished
        ) {
            dispatch(
                startDescriptorPreloadedDiscoveryThunk({
                    forcedDeviceState: action.payload.state?.staticSessionId,
                }),
            );
        }

        // ensure that BTC is enabled when device with BTC-only firmware is connected
        // (it could have been disabled via some other device with universal firmware)
        if (deviceActions.selectDevice.match(action)) {
            const device = action.payload;
            if (device?.connected && hasBitcoinOnlyFirmware(device)) {
                dispatch(addEnabledDiscoveryNetworkSymbol('btc'));
            }
        }

        // for further continual discovery check for various other reasons
        if (
            deviceActions.selectDevice.match(action) || // user switched device
            deviceActions.receiveAuthConfirm.match(action) || // user confirmed device auth
            accountsActions.changeAccountVisibility.match(action) // account visibility changed - e.g. when incoming txn to hidden account
        ) {
            dispatch(discoveryCheckThunk());
        }

        // if we changed enabled networks, check for token definitions right away
        if (
            (toggleEnabledDiscoveryNetworkSymbol.match(action) ||
                setEnabledDiscoveryNetworkSymbols.match(action)) &&
            isCoinEnablingInitFinished
        ) {
            dispatch(periodicCheckTokenDefinitionsThunk());
        }

        return action;
    },
);
