// Stripe Payments
const makeStripePayment = async (req, res) => {
    const {
        id,
        duration,
        cardNumber,
        expMM,
        expYY,
        cvv,
        email,
        name
    } = req.body;

    const createdUser = await stripe.customers.create({
        email: email || 'testUser@gmail.com',
        name: name || "123"
    })

    //console.log("createdUser", createdUser)
    if (createdUser) {
        try {
            const token = await stripe.tokens.create({
                card: {
                    number: cardNumber,
                    exp_month: expMM,
                    exp_year: expYY,
                    cvc: cvv
                }
            })
            //console.log("token : ", token)
            const AddingCardToUser = await stripe.customers.createSource(createdUser.id, {
                source: token.id
            })

            return res.status(201).json({
                success: true,
                AmountCharged: charge,
                message: "Payment Charged Successfully and also a mail has been sent to User as well as Admin."
            });
        } catch (error) {
            return res.status(501).json({
                success: false,
                message: `Error in ${error.type} and error is :  ${error.message}`
            });
        }
    }
}