require('dotenv').config();
const zxpSignCmd = require('zxp-sign-cmd');

(async() => {
    const signResult = await zxpSignCmd.sign({
        input: './dist',
        output: './Specify.zxp',
        cert: './Specify.p12',
        password: process.env.SPECIFY_CERTIFICATE_PASSWORD,
        timestamp: 'http://time.certum.pl/',
    });

    console.log(signResult)

    const verifyResult = await zxpSignCmd.verify({
        input: './Specify.zxp',
        info: true,
    });

    console.log(verifyResult)
})()