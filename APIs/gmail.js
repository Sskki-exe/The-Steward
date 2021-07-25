// Import APIs
const nodemailer = require('nodemailer');
const {
    google
} = require('googleapis');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');

// Gmail Login Details
const botGmail = "steward.mitp@gmail.com";

// Set Client Variables
const CLIENT_ID = "1080530118333-95hfb0n431o6nvp37fsfthf953vv37hk.apps.googleusercontent.com";
const CLIENT_SECRET = "db5gVnxqcoOpQIVf1KPZGC7c";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04_TxfqYGrKq2CgYIARAAGAQSNwF-L9IrBzXryXKgDPUYTdX2TghtoXthXiBHsM5KEShgBljTDn7Wlg_I4A56qFalKQGz69kD4Xw";

// Generate a new Access Token
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

// Send E Mail
async function sendMail(options) {
    let mailOptions = {
        to: options.email,
        from: `The Steward <${botGmail}>`,
        subject: "Model Infinity Train",
        text: "",
        html: genHTML(options.name,Object.values(options.numbers),options.vCode),
        attachments: [{
                filename: 'emailBanner.png',
                path: __dirname + '/emailAttachments/emailBanner.png',
                cid: 'emailBanner'
            }
        ]
    };
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAUTH2',
                user: botGmail,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}


// backerNum,totalRaised,carsNum,engineNum,posterNum
function genHTML(backerName, numData, verifCode) {
    return `<!doctype html><html><head><title>Model Infinity Train Set</title><style> .poster {background: #ff920d !important;} .discord {background: #5865F2 !important;} .kickstarter {background: #05ce78 !important;} .verifCode {color: black !important;background: #f6f6f6 !important;} .bi {font-weight: bold;font-style: italic;} .rr {color: white;background: #36393f;padding: 2px 7px;border-radius: 6px;white-space: nowrap;font-weight: bold;} .content {background: white;margin: auto;width: 80%;} .footer {margin-top: 10px;text-align: center;color: #999999;} .footer p a {color: inherit;} body {font-family: sans-serif;} img {-ms-interpolation-mode: bicubic;} ul {list-style-type: none;} ul,ol {padding-left: 60px;margin: 0;line-height: 25px;} p,ul {margin-bottom: 10px;line-height: 20px;}</style></head><body style="font-size: 16px;"><div style="background: #f6f6f6; padding: 20px 0;"><div class="content"><img src="cid:emailBanner" style="width: 100%;"><div style="padding: 10px 20px;"><p>Hello <span class="rr">
    ${backerName}</span>!</p><p>I'm <span class="bi">The Steward</span>, an email and Discord bot written by <span class="bi">The Project Creator</span>, Harry "sskki" Choi.</p><p>First of all, thank you for backing the <span class="rr kickstarter">Model Infinity Train Set Kickstarter</span>!</p><p>Over the 30 day campaign, a total of <b>${numData[0]} backers</b> raised a total of <b>${numData[1]} AUD</b>! This money will fund the creation of:</p><div><ul class="infobox"><li><b>${numData[2]} Infinity Train Cars</b></li><li><b>${numData[3]} Infinity Train Engines</b></li><li><b>and ${numData[4]} Posters!</b></li></ul></div><p>
    The <span class="rr poster">Digital Poster</span> of all the wonderful car titles was too large to attach but can be downloaded using the button below. What an interesting range of titles they are!<br></p><div class="rr" align="center" style="margin:auto;width: fit-content;padding: 15px 20px;">The Car Titles Poster<div class="rr poster" style="width: fit-content;padding: 10px; margin: 10px;"><a href="https://drive.google.com/file/d/1CtbkSHoNiohwLh59pu2TfVLxku7V8M2B/view?usp=sharing" style="text-decoration: none;color: white;">Download</a></div></div><p>A lot of trouble was undergone working with freelance artists to get it just right so I hope that you love the design as much as I do.<br>And while it won't be enforced, please remember that your fellow backers have paid for its commission so don't share it with non-backers.</p><p>To join the <span class="rr discord">Project Discord</span>, where backers can get updates, watch the build process and give feedback:<ol><li>Copy the <span class="rr verifCode">Verification Code</span> below</li><li>Click the <span class="rr discord">Join The Discord</span> button below then <span class="rr discord">Accept Invite</span></li><li>Please read what's posted in the Discord server's <span class="rr">🚪-welcome-and-rules</span> channel</li><li>Paste and send your <span class="rr verifCode">Verification Code</span> in the <span class="rr">📼-tape-car</span> channel</li><li>I, <span class="rr" style="color: #50faff;">The Steward</span>, will be checking the <span class="rr">📼-tape-car</span> daily to accept your codes and grant you access to the other channels in the server<br><b>This may take up to 24 hours</b>, so please be patient</li></ol></p><div class="rr" align="center" style="margin:auto;width: fit-content;padding: 15px 20px;">Your Verification Code:<div class="rr" style="background: white; color:black; padding: 5px 15px; margin: 10px 0; font-weight: normal;">${verifCode}</div><div class="rr discord" style="width: fit-content;padding: 10px;"><a href="https://discord.gg/t9eA2NYPKR" style="text-decoration: none;color: white;">Join The Discord</a></div></div><p><b>Never used Discord before?</b> <a style="color: black;" href="https://www.youtube.com/watch?v=TJ13BA3-NR4">This YouTube video</a> gives a brief introduction to how Discord works. If you are still having troubles, please reply to <b>this email</b>.</p><p>Finally, if you want to contact <span class="bi">The Project Creator</span>, the preferred method of contact is either through the <span class="rr discord">Project Discord</span> or through <b>steward.MITP@gmail.com</b> (you can reply to this email).<br>Replies to emails may come from their personal email, <b>nameIsHarryChoi@gmail.com</b> (which is <b>not</b> the preferred email to contact).<br><span class="rr kickstarter">Kickstarter</span> messages and comments will also be checked</span> from time to time, but not as frequently.</p><p>Once again, this project would not have been possible without your support! All efforts will be put into delivering your rewards as quickly as possible.</p><p>Many thanks, <br>from <span class="bi">The Steward</span> and <span class="bi">The Project Creator</span>.</p></div></div><div class="footer" style="font-size: 14px;"><p>Sskki's Model Infinity Train Kickstarter, 2021<br>Follow me!&nbsp;<a href="https://twitter.com/the_real_sskki">Twitter</a>&nbsp;<a href="https://sskki.tumblr.com/">Tumblr</a></p></div></div></body></html>`;
}

var test = {
    email: "beaver.hacker@gmail.com",
    name: "Mr Test",
    numbers: {
        backers: "40", //backerNum
        money: "$7,880.32", //totalRaised
        cars: "105", //carsNum
        engines: "30", //engineNum
        posters: "28" //posterNum
    },
    vCode: "TXIgVGVzdE1NTU1N"
};

// sendMail(test);

module.exports = {sendMail};