const Params = require("../util/params")

const paramsMiddleware = (req, _res, next) => {
    req.data = new Params(req);
    next();
}

module.exports = paramsMiddleware;