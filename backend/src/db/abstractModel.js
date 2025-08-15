const crypto = require("crypto");
const { deleteDocument, getDocument, setDocument } = require(".");

class AbstractModel {

    assign(params)
    {
        if(params.id)
        {
            this.id = params.id;
        }
        const keys = Object.keys(params.data);
        keys.forEach(key => {
            this[key] = params.data[key] ?? undefined;
        });
        Object.defineProperty(this, "exists", {
            value: false,
            enumerable: false,
            writable: true
        });
        Object.defineProperty(this, "errors", {
            value: [],
            enumerable: false
        });
    }

    async create()
    {
        let data = this.getData();
        data.id = crypto.randomUUID();
        await setDocument(`${this.collection}/${data.id}`, data);
        const doc = await getDocument(`${this.collection}/${data.id}`);
        return doc;
    }

    getData()
    {
        const keys = Object.keys(this);
        const data = {};
        keys.forEach(key => {
            data[key] = this[key];
        });
        return data;
    }

    async load()
    {
        const data = await getDocument(`${this.collection}/${this.id}`);
        if(data)
        {
            Object.assign(this, {...data, exists: true});
        }
    }

    async update()
    {
        const data = this.getData();
        return setDocument(`${this.collection}/${this.id}`, data);
    }

    async delete()
    {
        return deleteDocument(`${this.collection}/${this.id}`);
    }

    isValid()
    {
        throw new Error("Not implemented");
    }
}

module.exports = AbstractModel;