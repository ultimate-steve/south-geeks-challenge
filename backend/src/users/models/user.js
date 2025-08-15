const AbstractModel = require("../../db/abstractModel");
const OpenWeatherClient = require("../../util/openWeatherClient");

class User extends AbstractModel {
    id = null;
    name = null;
    zipCode = null;
    latitude = null;
    longitude = null;
    timezone = null;

    constructor(params)
    {
        // const keys = ["id", "name", "zipCode", "latitude", "longitude", "timezone"];
        
        super();
        this.assign(params);
        Object.defineProperty(this, "collection", {
            value: "users",
            enumerable: false
        });
    }

    isValid()
    {
        let valid = true;
        if(!this.name)
        {
            this.errors.push("Name is required");
            valid = false;
        }
        if(!this.zipCode)
        {
            this.errors.push("Zip code is required");
            valid = false;
        }
        return valid;
    }

    async populateFromZipCode()
    {
        if(this.zipCode)
        {
            const zipCodeData = await OpenWeatherClient.getCoordinates(this.zipCode);
            if(zipCodeData?.zip)
            {
                const weatherData = await OpenWeatherClient.getCurrentWeather(zipCodeData.lat, zipCodeData.lon);
                const data = {
                    name: this.name,
                    zipCode: this.zipCode,
                    latitude: zipCodeData.lat,
                    longitude: zipCodeData.lon,
                    timezone: weatherData.timezone
                };
                Object.assign(this, data);
                return;
            }
        }
        throw new Error("Invalid zip code");
    }
}

module.exports = User;