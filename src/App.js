import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

function App() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const [error, setError] = useState({});
    const [progress, setProgress] = useState("");

    const search = async (e) => {
        setProgress("loading");
        setQuery("");
        try {
            const data = await fetchWeather(query);
            setProgress("done");
            setWeather(data);
            console.log("data", data);
        } catch (e) {
            console.log(e.response.data);
            setProgress("error");
            setError(e.response.data);
        }
    };

    return (
        <div className="main-container">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    search();
                }}
            >
                <input
                    type="text"
                    className="search"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="submit-btn">Get Weather Info</button>
            </form>
            {progress.includes("loading") && (
                <div className="city">
                    <div id="loading"></div>
                </div>
            )}
            {weather.main && progress.includes("done") && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;</sup>
                    </div>
                    <div className="info">
                        <a
                            href={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        >
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                                className="city-icon"
                            />
                        </a>
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
            {error.message && progress.includes("error") && (
                <div className="city">
                    <h4 className="error-message">{error.message}</h4>
                </div>
            )}
        </div>
    );
}

export default App;
