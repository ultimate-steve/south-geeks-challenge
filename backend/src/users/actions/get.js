const { getDocument } = require("../../db");

const get = async(params) =>
{
    const path = `users/${params.id}`;
    const document = await getDocument(path);
    if(document)
    {
        return {
            status: true,
            data: document
        }
    }
    return {
        status: false,
        error: "User not found"
    };
}

module.exports = get;