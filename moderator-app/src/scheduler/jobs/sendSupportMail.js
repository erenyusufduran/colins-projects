// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const path = require("path");
const nodemailer = require("nodemailer");

exports.sendSupporterMail = async (sprint, firstSupporter, secondSupporter) => {
  const date = new Date();
  const twoWeekLater = new Date(Date.now() + 12096e5); // Two weeks later
  const dateArr = date.toString().split(" ");
  const twoWeekLaterArr = twoWeekLater.toString().split(" ");
  try {
    const outputMessage = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: arial;
                    max-width: 650px;
                    margin: 0 auto;
                    padding: 0 16px;
                    flex-direction: column;
                    min-height: 100vh;
                    display: flex;
                }
                .main-content {
                    flex-grow: 1;
                    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

                }
                footer {
                    color: #888888;
                    border-top: 1px solid #eeeeee;
                    margin-top: 16px;
                    padding: 16px 0;
                }
                header {
                    margin-top: 16px;
                        margin-bottom: 48px;
                    }
                    button {
                        border: 1px solid #888888;
                        background: #888888;
                        padding: 8px;
                    }
                    h3 {
                        color: #C6AC8F;
                    }
                    button:hover {
                        border: 1px solid #888888;
                        background: #eeeeee;
                        padding: 8px;
                    }
            </style>
        </head>
        <body>
            <div class="main-content">
                <header>
                    <h2>${27 + sprint}. Sprint Destek Ekibimiz</h2>
                </header>
                <ul>
                <img alt="eren" src="cid:gipgg" width="500"/>                   
                <div>
                    <h3><strong>${dateArr[2]} ${dateArr[1]} ${dateArr[3]} - ${twoWeekLaterArr[2]} ${
      twoWeekLaterArr[1]
    } ${twoWeekLaterArr[3]} tarihleri arasındaki destekçilerimiz:</strong></h3>
                    <p><strong><u>Birinci Destekçimiz:</u></strong> ${firstSupporter.name} ${firstSupporter.surname}</p>
                    <p><strong><u>İkinci Destekçimiz:</u></strong> ${secondSupporter.name} ${
      secondSupporter.surname
    }</p>
                    </div>
                </ul>
            </div>
            <footer>
            </footer>
        </body>
    </html>`;

    let transporter = nodemailer.createTransport({
      host: "mail.colins.com.tr",
      port: 25,
      secure: false,
      ignoreTLS: true, // true for 465, false for other ports
      tls: {
        ciphers: "SSLv3",
      },
    });

    const imagePath = path.join(__dirname, "..", "..", "assets", "images", "minions.gif");
    // send mail with defined transport object
    await transporter.sendMail({
      from: "InsightsErdis <insights.erdis@colinsjeans.com>", // sender address
      to: "erenyusufduran1905@gmail.com", // list of receivers
      subject: "Destek Ekibi", // Subject line
      html: outputMessage, // html body
      attachments: [
        {
          filename: "minions.gif",
          path: imagePath,
          cid: "gipgg",
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
