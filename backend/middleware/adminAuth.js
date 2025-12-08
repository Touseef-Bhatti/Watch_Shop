import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token is missing." });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: "Invalid authorization token." });
        }
        next();
    } catch (error) {
        console.error("Admin authentication error:", error);
        res.status(401).json({ success: false, message: "Authentication failed. Please log in again." });
    }
};

export default adminAuth;
