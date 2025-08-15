const User = require("../models/user");

const create = async (params) => {
    let user = new User(params);
    if(user.isValid())
    {
        try
        {
            await user.populateFromZipCode();
            user = await user.create();
            return {
                status: true,
                data: user
            }
        }
        catch(e)
        {
            return {
                status: false,
                errors: [e.message]
            }
        }
    }
    else
    {
        return {
            status: false,
            errors: user.errors
        }
    }
}

module.exports = create