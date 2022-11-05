require('dotenv').config();
import nodemailer from 'nodemailer';


let sendSimpleEmail = async (dataSend) =>{
     // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Nguyễn Minh Hiếu" <nguyenminhhieu20010624@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend),
  
  });
}



// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
}

let getBodyHTMLEmail = (dataSend) =>{
  let result = ''
  if(dataSend.language === 'vi'){
    result =  `
    <h3>Xin chào ${dataSend.patientName}! </h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website của Nguyễn Minh Hiếu</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <div><p>Thời gian: ${dataSend.time}  </p></div>
    <div><p>Bác sĩ: ${dataSend.doctorName}  </p></div>

    <p>Nếu các thông tin trên là đúng, vui lòng click vào đường link bên dưới để xác nhận
    và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div>
        <a href= ${dataSend.redirectLink} target="_blank" >Nhấn tại đây</a>
    </div>
    <div>Xin chân thành cảm ơn bạn đã tin tưởng và đặt lịch hẹn khám bệnh tại bệnh viện
    của chúng tôi.</div>
    `
  }
  if(dataSend.language === 'en'){
    result =  `
    <h3>Dear ${dataSend.patientName}! </h3>
    <p>You received this email because you booked an online medical appointment on Nguyen Minh Hieu's website</p>
    <p>Information to schedule an appointment: </p>
    <div><p>Time: ${dataSend.time}  </p></div>
    <div><p>Doctor: ${dataSend.doctorName}  </p></div>

    <p>If the above information is correct, please click on the link below to confirm and complete the procedure to book an appointment.</p>
    <div>
        <a href= ${dataSend.redirectLink} target="_blank" >Click here</a>
    </div>
    <div>Thank you very much for trusting and booking an appointment at our hospital.</div>
    `
  }
  return result;
}

let getBodyHTMLEmailRemedy = (dataSend) =>{
  let result = ''
  if(dataSend.language === 'vi'){
    result =  `
    <h3>Xin chào ${dataSend.patientName}! </h3>
    <p>Bạn nhận được email này vì bạn đã hoàn tất quá trình khám bệnh tại bệnh viện của Nguyễn Minh Hiếu.</p>
    <p>Thông tin đơn thuốc/ hóa đơn được gửi trong file đính kèm.</p>
    <div>Xin chân thành cảm ơn bạn đã tin tưởng và chúc bạn có thật nhiều sức khỏe.</div>

    `
  }
  if(dataSend.language === 'en'){
    result =  `
    <h3>Dear  ${dataSend.patientName}! </h3>
    <p>You received this email because you have completed the medical examination at Nguyen Minh Hieu's hospital.</p>
    <p>Prescription/invoice information is sent in the attachment.</p>
    <div>Thank you for your trust and wish you a lot of health.</div>

    `
  }
  return result;
}

let sendAttachment = async (dataSend) =>{

  return new Promise( async (resolve, reject) => {
    try {
       // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Nguyễn Minh Hiếu" <nguyenminhhieu20010624@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `remedy-${dataSend.patientId}-${dataSend.patientName}-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: 'base64'
      },
    ],
  
  });

    resolve(true)

    } catch (e) {
      reject(e);
    }
  })

  
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
}