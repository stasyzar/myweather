export default function WeatherCard({ tempMax, tempMin, status, windSpeed, icon, dayTitle }) {
    return (
        <div className="weather-card">
            <h3 className="card-day">{dayTitle}</h3>
            <div className="card-icon">{icon}</div>
            <p className="card-status">{status}</p>
            <div className="card-temps">
                <p className="temp-max">
                    <span>Max:</span> <strong>{tempMax}°C</strong>
                </p>
                <p className="temp-min">
                    <span>Min:</span> <strong>{tempMin}°C</strong>
                </p>
            </div>
            <p className="card-wind">💨 {windSpeed} км/год</p>
        </div>
    )
}