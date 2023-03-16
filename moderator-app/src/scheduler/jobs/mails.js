const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendModeratorEmail = async (firstMod, secondMod, sprint) => {
  const date = new Date();
  const twoWeekLater = new Date(Date.now() + 12096e5); // Two weeks later
  const dateArr = date.toString().split(" ");
  const twoWeekLaterArr = twoWeekLater.toString().split(" ");
  await sgMail.send({
    to: "erenyusufduran1905@gmail.com",
    from: "eren.duran@colins.com",
    subject: "Sprint Moderatörleri Hk.",
    html: `<!DOCTYPE html>
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
                        color: #f5cb5c;
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
                    <img style="width: 150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Colins-logo.jpg/800px-Colins-logo.jpg" alt="colins" />
                    <h1>${27 + sprint}. Sprint Destek Ekibimiz</h1>
                </header>
                <ul>
                    <img src="https://media.tenor.com/sZAFBih2R54AAAAC/minions.gif" style="width: 600px;" alt="gif" />
                    <div>
                    <h3><strong>${dateArr[2]} ${dateArr[1]}, ${dateArr[3]} - ${twoWeekLaterArr[2]} ${
      twoWeekLaterArr[1]
    }, ${twoWeekLaterArr[3]} tarihleri arasındaki destekçilerimiz:</strong></h3>
                    <p><strong><u>Birinci Destekçimiz:</u></strong> ${firstMod.name} ${firstMod.surname}</p>
                    <p><strong><u>İkinci Destekçimiz:</u></strong> ${secondMod.name} ${secondMod.surname}</p>
                    </div>
                </ul>
            </div>
            <footer>
            </footer>
        </body>
    </html>`,
  });
};

module.exports = {
  sendModeratorEmail,
};
