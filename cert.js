require('dotenv').config();
const zxpSignCmd = require('zxp-sign-cmd');

(async() => {
    const generateCertResult = await zxpSignCmd.selfSignedCert({
        country: 'US',
        province: 'KY',
        org: 'Adam DeHaven',
        name: 'com.adamdehaven.Specify.Extension',
        password: process.env.SPECIFY_CERTIFICATE_PASSWORD,
        output: './Specify.p12',
        email: 'adam@dehaven.org',
    });

    console.log(generateCertResult)
})()