function getWeatherInfo(code) {
    switch (code) {
        case 0:
            return { status: "Ясно", icon: "☀️" };
        case 1:
        case 2:
            return { status: "Малохмарно", icon: "🌤️" };
        case 3:
            return { status: "Хмарно", icon: "☁️" };
        case 45:
        case 48:
            return { status: "Туман", icon: "🌫️" };
        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 65:
            return { status: "Дощ", icon: "🌧️" };
        case 71:
        case 73:
        case 75:
            return { status: "Сніг", icon: "❄️" };
        case 80:
        case 81:
        case 82:
            return { status: "Злива", icon: "🌦️" };
        case 95:
        case 96:
        case 99:
            return { status: "Гроза", icon: "⛈️" };
        default:
            return { status: "Мінлива хмарність", icon: "⛅" };
    }
}

function formatDayTitle(dateString, index) {
    if (index === 0) return "Сьогодні";
    if (index === 1) return "Завтра";
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });
}

export async function getWeather(lat, long) {
    const url =`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=auto`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Помилка сервера погоди: ${response.status}`);
        }

        const data = await response.json();
        const daily = data.daily;

        const forecastDays = daily.time.slice(0,5).map((date, index) => {
            const code = daily.weather_code[index];
            const weather = getWeatherInfo(code);

            return {
                id: date,
                dayTitle: formatDayTitle(date, index),
                tempMax: Math.round(daily.temperature_2m_max[index]),
                tempMin: Math.round(daily.temperature_2m_min[index]),
                windSpeed: Math.round(daily.wind_speed_10m_max[index]),
                status: weather.status,
                icon: weather.icon,
            };
        });
        return forecastDays;
    } catch (error) {
        console.error("Не вдалося завантажити погоду:", error);
        throw error;
    }
}

export async function getCityName(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=uk`
    );
    const data = await response.json();
    return data.city || data.locality || data.principalSubdivision || "Ваше місто";
  } catch {
    return "Ваше місто";
  }
}