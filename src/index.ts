import lodash from "lodash";
import {toDataURL, type QRCodeToDataURLOptions} from "qrcode";
import {generateHOTP, getCounterFromTime} from "~/utils.js";

export {
    generateSecret,
    generateTOTP,
    verifyTOTP,
    generateKeyUri,
    generateQRCode
};

function generateSecret() {
    let length = 16;
    let delimiter = "";

    let array = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".repeat(length).split(delimiter);

    for (let i = (array.length - 1); i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array.join(delimiter).substring(0, length);
}

function generateTOTP({
                          secret,
                          now = Date.now(),
                          timeStep = 30
                      }: {
    secret: string;
    now?: number;
    timeStep?: number
}) {
    let counter = getCounterFromTime({
        now,
        timeStep
    });

    return generateHOTP({
        key: secret,
        counter
    });
}

function verifyTOTP({
                        secret,
                        token,
                        now = Date.now(),
                        timeStep = 30
                    }: {
    token: string
    secret: string
    now?: number
    timeStep?: number
}) {
    let counter = getCounterFromTime({
        now,
        timeStep
    });

    return generateHOTP({
        key: secret,
        counter
    }) === token;
}

function generateKeyUri({
                            secret,
                            account,
                            app = "",
                            timeStep = 30
                        }: {
    secret: string
    account: string
    app?: string
    timeStep?: number
}) {
    let params = {};

    if (app) {
        params = {
            ...params,
            issuer: app
        }
    }

    params = {
        ...params,
        secret,
        algorithm: "SHA1",
        digits: 6,
        period: timeStep
    };

    let paramsString = lodash(params).map((value, key) => {
        return (encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }).join("&");

    return ("otpauth://totp/" + (app ?? (encodeURIComponent(app) + ":")) + encodeURIComponent(account) + "?" + paramsString);
}

async function generateQRCode({
                                  text,
                                  options = {
                                      errorCorrectionLevel: "medium",
                                      type: "image/png",
                                      width: 500,
                                      color: {
                                          dark: "#000000",
                                          light: "#ffffff"
                                      }
                                  }
                              }: {
    text: string
    options?: QRCodeToDataURLOptions
}) {
    return toDataURL(text.trim(), {
        ...options
    });
}
