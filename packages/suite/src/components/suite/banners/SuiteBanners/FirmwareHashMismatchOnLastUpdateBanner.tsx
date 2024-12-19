import { Banner } from '@trezor/components';

import { Translation } from 'src/components/suite';

export const FirmwareHashMismatchOnLastUpdateBanner = () => (
    <Banner icon variant="destructive">
        <Translation id="TR_FIRMWARE_HASH_MISMATCH" />
    </Banner>
);