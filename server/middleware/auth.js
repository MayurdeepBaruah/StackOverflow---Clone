import jwt from "jsonwebtoken";

const auth = (req, res, next) => {           // next allows to access the controllers from the req afte checking the user token is available and valid
    try {
        const token = req.headers.authorization.split(" ")[1];   // string to array and taking the token from bearer
        let decodeData = jwt.verify(token, process.env.JWT_SECRET)              // verfying the token to the secret(used in controllers)
        req.userId = decodeData?.id                       // decodeData id is transferred to new request userId
        next()
    } catch (error) {
        console.log(error)
    }
}
export default auth;