require('dotenv').config();
const zxpSignCmd = require('zxp-sign-cmd');

(async() => {
    const verifyResult = await zxpSignCmd.verify({
        input: './Specify.zxp',
        info: true,
    });
    console.log(verifyResult);
})()