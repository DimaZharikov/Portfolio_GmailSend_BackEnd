import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "gmail",
     port: 25,
     secure: false, // true for 465, false for other ports
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "dima.zharikov@gmail.com", // generated ethereal user
        pass: "3185043@rafellB", // generated ethereal password
    }
})

app.get("/", function (req, res) {
    res.send('base_host');
});

app.post("/message", async function (req, res) {
   let { name, email, message } = req.body

    let info = await transporter.sendMail({
        from: 'Profile_page', // sender address
        to: "dima.zharikov@gmail.com", // list of receivers
        subject: email, // Subject line
         //text: message, // plain text body
      html: `<b>From Portfolio_Page</b> ` +
           `<h1>Name: ${name}</h1> ` +
           `<h2>Email: ${email}</h2>` +
            `<p>Message: ${message}</p>`// html body
     });
    res.send('ok')

})

app.listen(4000, function () {
    console.log("App Listening on port 4000");
})

