// Thawani Payments
const makeThawaniPayments = async (req, res) => {
    const {
        id
    } = req.params;
    if (!id) {
        return res.status(404).json({
            success: false,
            message: 'Id of Order is Reqiured'
        })
    } else {
        let checkOrder = await Orders.findOne({
            orderId: id
        })
        if (!checkOrder) {
            return res.status(404).json({
                success: false,
                message: 'Id of Order is In Correct'
            })
        }

        const merchent = await Customers.findById(checkOrder.postedBy)
        console.log("email : ", merchent.firstname)
        try {
            // creating customer
            let customer_token = null;
            const response = await api.customer.create(merchent.firstname);
            customer_token = response.data.id;
            //console.log("customer_token : ", customer_token)

            // creating session
            let new_session = null;
            const payload = {
                client_reference_id: "2021293168",
                products: [{
                    name: "Service Charges for Oturq Trading App",
                    unit_amount: checkOrder.priceOfOrder,
                    quantity: 1,
                }, ],
                success_url: "https://www.linkedin.com/company/mexatechub/?originalSubdomain=pk",
                cancel_url: "http://mtechub.com/",
                metadata: {
                    customer: merchent.firstname,
                    order_id: 10,
                },
            };
            const sess = await api.session.create(payload);
            new_session = sess.data.session_id;
            //console.log("new_session Id : ", new_session)

            // getting session token
            const sessionToken = await api.session.findSessionByID(new_session);
            //console.log("sessionToken : ", sessionToken)

            // redirecting to payment gateway
            const expected_redirect = api.redirect(new_session);
            const toBe_redirect =
                process.env.Thawani_NODE_API_DEV_URI +
                "/pay/" +
                new_session +
                "?key=" +
                process.env.PUBLISH;

            console.log("expected_redirect : ", expected_redirect)
            console.log("toBe_redirect : ", toBe_redirect)


            // gtting all sessions
            const allSessions = await api.session.findAll();
            //console.log("allSessions : ", allSessions)

            res.status(200).json({
                success: true,
                ReDirectLink: expected_redirect,
                message: "Please Click on This Link to Make Payments."
            })

        } catch (e) {
            res.status(200).json({
                success: false,
                message: "Some Thawani  Error"
            })
        }

    }
}