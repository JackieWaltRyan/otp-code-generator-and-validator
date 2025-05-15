import { type QRCodeToDataURLOptions } from "qrcode";
export { generateSecret, generateTOTP, verifyTOTP, generateKeyUri, generateQRCode };
declare function generateSecret(): string;
declare function generateTOTP({ secret, now, timeStep }: {
    secret: string;
    now?: number;
    timeStep?: number;
}): string;
declare function verifyTOTP({ secret, token, now, timeStep }: {
    token: string;
    secret: string;
    now?: number;
    timeStep?: number;
}): boolean;
declare function generateKeyUri({ secret, account, app, timeStep }: {
    secret: string;
    account: string;
    app?: string;
    timeStep?: number;
}): string;
declare function generateQRCode({ text, options }: {
    text: string;
    options?: QRCodeToDataURLOptions;
}): Promise<string>;
