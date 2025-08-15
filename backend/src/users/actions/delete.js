const User = require("../models/user");

const del = async (params) => {
    let user = new User(params);
    await user.load();
    if(user.exists)
    {
        await user.delete();
        return {
            status: true
        }
    }
}

module.exports = del