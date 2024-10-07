import User from "../models/User.js";

const checkRole = (roles) => async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!roles.includes(user.role)) {
        return res.status(403).json(
            { msg: 'Access denied: You do not have permission' }
        );
    }
    next();
};

export default checkRole;