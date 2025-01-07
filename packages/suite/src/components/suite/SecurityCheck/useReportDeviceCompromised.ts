import { useEffect, useMemo } from 'react';

import { getFirmwareVersion } from '@trezor/device-utils';
import { isDeviceAcquired } from '@suite-common/suite-utils';

import { useDevice, useSelector } from 'src/hooks/suite';
import { captureSentryMessage, withSentryScope } from 'src/utils/suite/sentry';
import { selectFirmwareRevisionCheckError } from 'src/reducers/suite/suiteReducer';
import { hashCheckErrorScenarios } from 'src/constants/suite/firmware';

export const reportCheckFail = (
    checkType: 'Firmware revision' | 'Firmware hash' | 'Entropy',
    contextData: any,
) =>
    withSentryScope(scope => {
        scope.setLevel('error');
        scope.setTag('deviceAuthenticityError', `firmware ${checkType} check failed`);
        captureSentryMessage(`${checkType} check failed! ${JSON.stringify(contextData)}`, scope);
    });

const reportCheckWarning = (checkType: 'Firmware revision' | 'Firmware hash', contextData: any) =>
    withSentryScope(scope => {
        scope.setLevel('warning');
        scope.setTag('deviceAuthenticityError', `firmware ${checkType} check warning`);
        captureSentryMessage(`${checkType} check warning! ${JSON.stringify(contextData)}`, scope);
    });

const useCommonData = () => {
    const { device } = useDevice();
    const model = device?.features?.internal_model;
    const revision = device?.features?.revision;
    const version = getFirmwareVersion(device);
    const vendor = device?.features?.fw_vendor;

    return useMemo(
        () => ({ model, revision, version, vendor }),
        [model, revision, version, vendor],
    );
};

const useReportRevisionCheck = () => {
    const commonData = useCommonData();
    const revisionCheckError = useSelector(selectFirmwareRevisionCheckError);

    useEffect(() => {
        if (revisionCheckError !== null) {
            reportCheckFail('Firmware revision', { ...commonData, revisionCheckError });
        }
    }, [commonData, revisionCheckError]);
};

const useReportHashCheck = () => {
    const { device } = useDevice();
    const commonData = useCommonData();

    // `errorPayload` must also be extracted, which is why `selectFirmwareHashCheckError` would be impractical
    const hashCheck = isDeviceAcquired(device) ? device.authenticityChecks?.firmwareHash : null;
    const isHashCheckError = hashCheck && !hashCheck.success;
    const hashCheckError = isHashCheckError ? hashCheck.error : null;
    const hashCheckErrorPayload = isHashCheckError ? hashCheck.errorPayload : null;

    useEffect(() => {
        if (hashCheckError && hashCheckErrorScenarios[hashCheckError].shouldReport) {
            reportCheckFail('Firmware hash', {
                ...commonData,
                hashCheckError,
                hashCheckErrorPayload,
            });
        }
    }, [commonData, hashCheckError, hashCheckErrorPayload]);

    // success bears warning if it needed retries, so we report the previous error payload, see Device.ts in connect
    const isHashCheckSuccess = hashCheck && hashCheck.success;
    const hashCheckWarning = isHashCheckSuccess ? hashCheck.warningPayload : null;
    useEffect(() => {
        if (hashCheckWarning) {
            reportCheckWarning('Firmware hash', { ...commonData, hashCheckWarning });
        }
    }, [commonData, hashCheckWarning]);
};

export const useReportDeviceCompromised = () => {
    useReportRevisionCheck();
    useReportHashCheck();
};
