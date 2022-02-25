const SearchAvailDrivers = async (lat1, long1,) => {
    var distance;
    try {
        //getting active drivers first
        const allDrivers = await Drivers.find({
            activeStatus: true
        }); // getting only online drivers
        let AllDrivers = [];
        // checking which active driver has vehicle same as mercehent wants
        for (let u = 0; u !== allDrivers.length; u++) {
            let driver = await Vehicles.findOne({
                owner: allDrivers[u]._id,
                vehicleType: myVehicleType
            });
            if (driver) {
                const singleDri = await Drivers.findById(allDrivers[u]._id); // getting only online drivers
                AllDrivers.push(singleDri)
            }
        }
        // sending request to finalized drivers
        if (AllDrivers.length > 0) {
            for (var i = 0; i !== AllDrivers.length; i++) {
                distance = await calcCrow(lat1, long1, AllDrivers[i].curntLoc[0], AllDrivers[i].curntLoc[1]);
                if (distance < 10) { // puts drivers which are less than 10 km in array
                    await Drivers.findByIdAndUpdate(AllDrivers[i]._id, {
                        $push: {
                            availOrders: id
                        }
                    }, {
                        new: true
                    })
                    await Orders.findByIdAndUpdate(id, {
                        $push: {
                            availDrivers: AllDrivers[i]._id
                        }
                    }, {
                        new: true
                    })
                }
                console.log("distance : ", distance)
            }
            return "Done";
        } else {
            return "Sorry , No Driver Found In Your Region"
        }
    } catch (e) {
        console.log("Errr  is : ", e.message);
        return "Not Done"
    }
}