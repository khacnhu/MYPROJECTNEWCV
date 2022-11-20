const {google} = require("googleapis")
const nodemailer = require("nodemailer")
require("dotenv").config()

const CLIENT_ID = "969084426923-3dslgql63iobpc8875spjkmdgeulibn5.apps.googleusercontent.com"
console.log(CLIENT_ID)
const CLIENT_SECRET = "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"
const REDIRECT_URI ="https://developers.google.com/oauthplayground"
const REFRESH_TOKEN =  "1//04a-6rm_cDZbaCgYIARAAGAQSNwF-L9Ir8jJVFOkmsklhabz9wFuEb1oDYYpLv2nCYE2GXorSgUOZvrdeFsO436nZn9N703ZFDLQ"


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const SendMail = async () => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "tknhu1302@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <tknhu1302@gmail.com>', // sender address
            to: "henmotmai132@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>MERN AUTHENTICATION</b>", // html body
          });
          
          console.log(info)
        
    } catch (error) {
        console.log(error)
    }
}


SendMail()
