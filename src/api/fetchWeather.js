import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "7c5022eb607667b75b6caa9f61108611";

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: "metric",
            APPID: API_KEY,
        },
    });
    return data;
};
