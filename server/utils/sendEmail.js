

const {google} = require("googleapis")
const nodemailer = require("nodemailer")


const CLIENT_ID = "969084426923-3dslgql63iobpc8875spjkmdgeulibn5.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04ukz8A0HSPVYCgYIARAAGAQSNwF-L9Ir8FxBiaQ9cjYpDlNIwP9n2F7GYh-46HwLufjTDukHrwOEtUMM8hCpb9zpwU9TPI29gKE"



const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const SendMail = async (options) => {
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

        mailOptions = {
          from: '"Fred Foo 👻" <tknhu1302@gmail.com>', // sender address
          to: "henmotmai132@gmail.com", // list of receivers
          subject: options.subject,
          html: options.text
        }

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
      
          //   SAU KHI XOG HAY LỖI ĐỀU NÊN TRẢ VỀ TRANG CHU
          //   res.redirect("/")
          } else {
            console.log(info);
          //   res.redirect("/")
          }
        });

    
      
    } catch (error) {
        console.log(error)
    }
}

// module.exports =  SendMail
module.exports = SendMail






