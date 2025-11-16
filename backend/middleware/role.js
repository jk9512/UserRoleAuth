module.exports = function (requiredRoles = []) {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) return res.status(403).json({ message: 'Forbidden' });
    const hasRole = req.user.roles.some(r => requiredRoles.includes(r));
    if (!hasRole) return res.status(403).json({ message: 'Insufficient role' });
    next();
  };
};
