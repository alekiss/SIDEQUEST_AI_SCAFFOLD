import axios from 'axios';
import type { WeatherInfo } from '../types/Mission';

const api = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 10000,
});

const weatherDescriptions: Record<number, string> = {
  0: 'Céu limpo', 1: 'Predominantemente limpo', 2: 'Parcialmente nublado',
  3: 'Nublado', 45: 'Neblina', 48: 'Neblina com geada',
  51: 'Garoa leve', 53: 'Garoa moderada', 55: 'Garoa intensa',
  61: 'Chuva leve', 63: 'Chuva moderada', 65: 'Chuva intensa',
  80: 'Pancadas de chuva', 81: 'Pancadas moderadas', 82: 'Pancadas fortes',
  95: 'Trovoadas',
};

export async function getCurrentWeather(latitude: number, longitude: number): Promise<WeatherInfo> {
  const { data } = await api.get('/forecast', {
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,weather_code,is_day',
      timezone: 'auto',
    },
  });

  return {
    temperature: Math.round(data.current.temperature_2m),
    description: weatherDescriptions[data.current.weather_code] ?? 'Condição variável',
    isDay: data.current.is_day === 1,
  };
}
