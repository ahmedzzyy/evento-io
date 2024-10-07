const checkRole = (roles) => (req, res, next) => {
    if (!roles.include(req.user.role)) {
        return res.status(403).json(
            { msg: 'Access denied: You do not have permission' }
        );
    }
    next();
};

export default checkRole;