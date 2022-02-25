// Logging In
const LogIn = async (req, res) => {
    const {email , password } = req.body

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please Provide All Credediantials"
        })
    } else {
        try {
            const isExist = await Admins.findOne({
                email: email
            });

            return res.json({
                success: true,
                token
            });
        } catch (error) {
            console.log("Error in LogIn and error is : ", error)
            return res.json({
                success: false,
            });
        }
    }

}