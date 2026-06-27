module.exports = (req, res, next) => {

    if (req.path === "/login") {
        return next();
    }

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    // JWT verification will go here later

    next();
};