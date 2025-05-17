# otp-code-generator-and-validator

Generate and validate time-based OTP (one time password) for multifactor authentication.

## Install

```
$ npm install otp-code-generator-and-validator
```

## Usage

## Generate Secret

```javascript
import {generateSecret} from "otp-code-generator-and-validator";

let secret = generateSecret();

console.log(secret); // IGJZFST44NAHVVXT
```

### generateSecret()

- Returns: \<string> 16 character setup key.

## Generate Token

```javascript
import {generateTOTP} from "otp-code-generator-and-validator";

let tokens = {
    previous: generateTOTP({
        secret: secret,
        now: Date.now() - 30000
    }),
    current: generateTOTP({
        secret: secret
    }),
    next: generateTOTP({
        secret: secret,
        now: Date.now() + 30000
    })
}

console.log(tokens); // {previous: "608121", current: "394406", next: "714744"}
```

### generateTOTP({secret, now?, timeStep?})

- `secret` \<string> 16 character setup key.
- `now` [optional] \<number> Token creation time in Unix format. **Default:** `Date.now()`.
- `timeStep` [optional] \<number> Token change time in seconds. **Default:** `30`.
- Returns: \<number> 6 digit token.

## Verify Token

```javascript
import {verifyTOTP} from "otp-code-generator-and-validator";

let verify = verifyTOTP({
    secret: secret,
    token: tokens.current
});

console.log(verify); // true | false
```

### verifyTOTP({secret, token, now?, timeStep?})

- `secret` \<string> 16 character setup key.
- `token` \<number> 6 digit token.
- `now` [optional] \<number> Token creation time in Unix format. **Default:** `Date.now()`.
- `timeStep` [optional] \<number> Token change time in seconds. **Default:** `30`.
- Returns: \<boolean> true | false.

## Generate URL

```javascript
import {generateKeyUri} from "otp-code-generator-and-validator";

let url = generateKeyUri({
    secret: secret,
    account: "Account Name"
});

console.log(url); // otpauth://totp/Account%20Name?secret=IGJZFST44NAHVVXT&algorithm=SHA1&digits=6&period=30
```

### generateKeyUri({secret, account, app?, timeStep?})

- `secret` \<string> 16 character setup key.
- `account` \<string> User account name.
- `app` [optional] \<string> The name of the application that adds verification. **Default:** `null`.
- `timeStep` [optional] \<number> Token change time in seconds. **Default:** `30`.
- Returns: \<string> A link that can be opened by authentication apps.

## Generate QR Code

```javascript
import {generateQRCode} from "otp-code-generator-and-validator";

let code = await generateQRCode({
    text: url
});

console.log(code); // data:image/png;base64,iVBORw0KGg...0lAlwyn0==
```

### async generateQRCode({text, options?})

- `text` \<string> Text that will be encoded in QR code.
- `options` [optional] [\<QRCodeToDataURLOptions>](https://www.npmjs.com/package/qrcode#qr-code-options)
  See [QR Code options](https://www.npmjs.com/package/qrcode#qr-code-options). **Default:**

```json
{
    "errorCorrectionLevel": "medium",
    "type": "image/png",
    "width": 500,
    "color": {
        "dark": "#000000",
        "light": "#ffffff"
    }
}
```

- Returns: Promise\<string> Data URI containing a representation of the QR Code image.

# Donating

If you find useful this package, please consider the opportunity to donate:
See [GitHub Funding](https://github.com/JackieWaltRyan/otp-code-generator-and-validator) or [My Site](https://jackiewaltryan.top).
