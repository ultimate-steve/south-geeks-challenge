const User = require("../models/user");

const update = async (params) => {
    let user = new User(params);
    await user.load();
    if(user.exists)
    {
        user.name = params.data?.name;
        user.zipCode = params.data?.zipCode;
        if(user.isValid())
        {
            try
            {
                await user.populateFromZipCode();
                user = await user.update();
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
}

module.exports = update