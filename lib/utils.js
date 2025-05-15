import crypto from "crypto-js";
export { generateHOTP, getCounterFromTime };
function generateHOTP({ key, counter = 0 }) {
    let bits = key.toUpperCase().replace(/=+$/, "").split("").map((value) => {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(value).toString(2).padStart(5, "0");
    }).join("");
    key = (bits.match(/.{1,8}/g) ?? []).map((chunk) => {
        return Number.parseInt(chunk, 2).toString(16).padStart(2, "0");
    }).join("");
    let digest = crypto.HmacSHA1(crypto.enc.Hex.parse(counter.toString(16).padStart(16, "0")), crypto.enc.Hex.parse(key)).toString(crypto.enc.Hex);
    let bytes = (digest.match(/.{1,2}/g) ?? []).map((char) => {
        return Number.parseInt(char, 16);
    });
    let offset = (bytes[19] & 0xF);
    let v = (((bytes[offset] & 0x7F) << 24) | ((bytes[offset + 1] & 0xFF) << 16) | ((bytes[offset + 2] & 0xFF) << 8) | (bytes[offset + 3] & 0xFF));
    return String(v % 1000000).padStart(6, "0");
}
function getCounterFromTime({ now, timeStep }) {
    return Math.floor(now / 1000 / timeStep);
}
//# sourceMappingURL=utils.js.map