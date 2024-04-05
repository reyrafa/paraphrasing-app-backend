const jwt = require("jsonwebtoken");

const secret = "ECommerceAPI";
const User = require("./models/user.js");

const createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(data, secret, {});
};

const verifyToken = (request, response, next) => {
    let token = request.headers.authorization;
    // console.log(token)

    if (token === undefined) {
        return response.send("No Token Provided");
    }
    token = token.slice(7, token.length);
    // console.log(token)
    jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
            return response.send({
                auth: "failed",
                message: error.message,
            });
        }
        // console.log(decodedToken);
        request.user = decodedToken;
        // console.log(request)
        next();
    });
};

const verifyEmail = (request, response, next) => {
    User.findOne({ _id: request.user.id })
        .then((result) => {
            if (result.emailVerifiedDate === null) {
                return response.status(403).json({
                    access: "Forbidden",
                    message: "Please verify first your email address.",
                });
            }
            next();
        })
        .catch((error) => {
            return response.status(500).json({
                error: "Internal server error",
                message: "An error occurred during email verification",
            });
        });
};

const verifyAdmin = (request, response, next) => {
    if (!request.user.isAdmin) {
        return response.status(403).json({
            access: "Failed",
            message: "Action Forbidden!",
        });
    }
    next();
};




module.exports = {
    createAccessToken,
    verifyToken,
    verifyAdmin
};
