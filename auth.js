const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        username: user.fullName,
        isAdmin: user.isAdmin
    }
    return jwt.sign(data, secret, {/*option*/ })
}

module.exports.verify = (req, res, next) => {
    //contains sensitive data and especially token
    let token = req.headers.authorization
    console.log(token)
    if (typeof token === "undefined") {
        return res.send({ auth: "Failed. No Token" })
    } else {
        token = token.slice(7, token.length)
        //Bearer uiedhuihsfhff
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.send({
                    auth: "Failed",
                    message: err.message
                })
            } else {
                req.user = decodedToken;
                next()
            }
        })
    }
};

module.exports.verifyAdmin = (req, res, next) => {

    if (req.user.isAdmin) {
        next()
    } else {
        return res.send({
            auth: "Failed",
            message: "Forbidden Action"
        })
    }

}

module.exports.decode = (token) => {

    if (typeof token !== "undefined") {

        token = token.slice(7, token.length);

        return jwt.verify(token, secret, (err, data) => {

            if (err) {

                return null

            } else {

                return jwt.decode(token, { complete: true }).payload
            }
        })

    } else {

        return null
    }
}