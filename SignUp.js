// Sign Up
const SignUp = async (req, res) => {
    const {email , password } = req.body;

    if (!email || !password ) {
        return res.json({
            success: false,
            message: "Please Provide All Credientials"
        });
    } else {
        const newAdmin = new Admins(
            ...req.body,
        )

        try {
            await newAdmin.save();

            res.status(201).json({
                succes: true,
                message: 'Admin SuccessFully Signed Up'
            })
        } catch (error) {
            console.log("Error in SignUp and error is : ", error)
            res.status(201).json({
                success: false,
            })
        }
    }
}
