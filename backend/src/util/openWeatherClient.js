class OpenWeatherClient {
    static async getCoordinates(zipcode) {
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${apiKey}`);
        return await response.json();
    }
    static async getCurrentWeather(lat, lon) {
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        return await response.json();
    }
}
module.exports = OpenWeatherClient;