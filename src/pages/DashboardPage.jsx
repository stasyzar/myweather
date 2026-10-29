import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWeather, getCityName } from "../services/weatherService";
import { logout } from "../services/authService";
import Loader from "../components/Loader";
import WeatherCard from "../components/WeatherCard";

export default function DashboardPage() {
    const [weatherData, setWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [locationName, setLocationName] = useState("Київ");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const loadWeather = async (lat, long, cityName) => {
            try {
                setIsLoading(true);
                setError("");
                const data = await getWeather(lat, long);
                setWeatherData(data);
                setLocationName(cityName);
            } catch {
                setError("Не вдалося завантажити дані погоди. Спробуйте пізніше.");
            } finally {
                setIsLoading(false);
            }
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const cityName = await getCityName(latitude, longitude);
                    loadWeather(latitude, longitude, cityName);
                },
                () => {
                    loadWeather(50.45, 30.52, "Київ");
                }
            );
        } else {
            loadWeather(50.45, 30.52, "Київ");
        }
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="city-title">{locationName}</h1>
                    <p className="city-subtitle">Прогноз погоди на 5 днів</p>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    Вийти
                </button>
            </header>
            <main className="dashboard-content">
                {error && <div className="error-message">{error}</div>}
                {isLoading && <Loader />}
                {!isLoading && !error && (
                    <div className="weather-grid">
                        {weatherData.map((day) => (
                            <WeatherCard key={day.id} {...day} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}