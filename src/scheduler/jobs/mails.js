const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendModeratorEmail = async (firstMod, secondMod) => {
  const date = new Date();
  const twoWeekLater = new Date(Date.now() + 12096e5); // Two weeks later
  await sgMail.send({
    to: "erenyusufduran1905@gmail.com",
    from: "eren.duran@colins.com",
    subject: "Sprint Moderatörleri Hk.",
    html: `
    <h1>Sprint Moderatörleri</h1>
    <br/>
    <div>
        <p>
            <strong>${date.getDate()}/${date.getMonth()} - ${twoWeekLater.getDate()}/${twoWeekLater.getMonth()} tarihleri arasındaki moderatörlerimiz:</strong>
        </p>
        <ul>
            <li>${firstMod.name} ${firstMod.surname}</li>
            <li>${secondMod.name} ${secondMod.surname}</li>
        </ul>
    </div>`,
  });
};

module.exports = {
  sendModeratorEmail,
};
