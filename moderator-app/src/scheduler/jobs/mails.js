const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendModeratorEmail = async (firstMod, secondMod) => {
  const date = new Date();
  const twoWeekLater = new Date(Date.now() + 12096e5); // Two weeks later
  const dateArr = date.toString().split(" ");
  const twoWeekLaterArr = twoWeekLater.toString().split(" ");
  await sgMail.send({
    to: "erenyusufduran1905@gmail.com",
    from: "eren.duran@colins.com",
    subject: "Sprint Moderatörleri Hk.",
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          div {
            background-color: #F8EAD8;
            color: #333;
            padding: 15px;
          }
        </style>
      </head>
      <body>
        <h1>Sprint Moderatörleri</h1>
        <br/>
        <div>
            <p>
                <strong>${dateArr[2]} ${dateArr[1]}, ${dateArr[3]} - ${twoWeekLaterArr[2]} ${twoWeekLaterArr[1]}, ${twoWeekLaterArr[3]} tarihleri arasındaki moderatörlerimiz:</strong>
            </p>
            <ul>
                <h3><strong>Main Moderator:</strong> ${firstMod.name} ${firstMod.surname}</h3>
                <h3><strong>Backup Moderator:</strong> ${secondMod.name} ${secondMod.surname}</h3>
            </ul>
        </div>
      </body>
    </html>`,
  });
};

module.exports = {
  sendModeratorEmail,
};

// API Uygulaması JSON placeholder
// JSON server npm paketi
