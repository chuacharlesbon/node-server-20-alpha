const bcrypt = require("bcrypt")
const MyModel = require("../models/MyModel");
const auth = require("../auth")

module.exports.getTestById = (req, res) => {
    console.log(req.params.id);
    // res.send({ message: `GET Request: ${req.params.id}` });
    MyModel.find({})/*.select({"createdOn": 0, "isAdmin": 0, "__v": 0})*/
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

module.exports.testPost = (req, res) => {

    console.log(req.body);
    const hashedPW = bcrypt.hashSync(req.body.password, 10)

    let newMyModel = new MyModel({
        fullName: req.body.fullName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        password: hashedPW,
        age: req.body.age,
        isAdmin: req.body.isAdmin,
        modelData: req.body.modelData,
    })

    newMyModel.save()
        .then(myModel => res.send(myModel))
        .catch(error => res.send(error))
};