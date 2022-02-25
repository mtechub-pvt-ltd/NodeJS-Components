// Checking OtpCode
const checkOtpCode = async (req, res) => {
    const {otpCode } = req.body;
    let curntDateTime = new Date();
    let diff = new Date(curntDateTime - data.codeSentTime) / 100000; //  getting time diff in seconds
    if (diff < 60) {  // checking if sent time is less than 60 seconds
        try{
            if(otpCode === data.otpCode){
                const update = await Users.findOneAndUpdate({email: email}  ,{ $set: { ...data.body }} , {new: true} )
            }else{
                return res.status(504).json({success: false , message: ' InValid Token '})
            }
        }catch (error) {
            console.log("Error is :", error)
            return res.status(501).json({success: false , error ,   message: 'Opps An Error Occured' , error})
        }
    }
}