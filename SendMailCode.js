// sending mails
const sendMail = async(req,res) => {
    const {email} = req.params;
    let randomNo = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    await Users.findOne({email : email})

    // step 01
    const transport= nodeMailer.createTransport({
        service : "gmail",
    })
    // setp 02
    const mailOption = {
        from: process.env.myEmail, // sender/own eamil
        to: email, // reciver eamil
        subject: "Secret Code For Changing in E-Learning App Password",
    }
    // step 03
    transport.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log("Error occured : ", err)
            return res.json({success: false, message : "Error in sending mail" , err})
        } else {
            console.log("Email Sent and info is : ", info.response)
            return res.json({success: true, message: 'Email Sent SuccessFully' })
        }
    })
}
