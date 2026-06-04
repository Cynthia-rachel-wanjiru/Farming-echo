import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

interface WeatherWidgetProps {
  region: string;
  language: 'en' | 'sw';
}

export function WeatherWidget({ region, language }: WeatherWidgetProps) {
  const translations = {
    en: {
      today: 'Today',
      humidity: 'Humidity',
      wind: 'Wind',
      plantingAlert: 'Good planting conditions expected',
      rainAlert: 'Rain expected tomorrow - postpone spraying',
    },
    sw: {
      today: 'Leo',
      humidity: 'Unyevu',
      wind: 'Upepo',
      plantingAlert: 'Hali nzuri za kupanda zinatarajiwa',
      rainAlert: 'Mvua inatarajiwa kesho - ahirisha kunyunyizia',
    },
  };

  const t = translations[language];

  // Mock weather data
  const weatherData = {
    temp: 24,
    condition: 'partly-cloudy',
    humidity: 65,
    wind: 12,
    alert: t.plantingAlert,
  };

  return (
    <div className="bg-[#3D6B1F] border-t border-[#4A7C28] py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Weather Icon & Temp */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Cloud className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <div className="text-2xl font-bold text-white">{weatherData.temp}°C</div>
              <div className="text-xs text-white/80 capitalize">{region}</div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <div className="flex items-center gap-1">
              <Droplets className="w-4 h-4" />
              <span>{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="w-4 h-4" />
              <span>{weatherData.wind} km/h</span>
            </div>
          </div>

          {/* Alert */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#4A7C28] px-3 py-1 rounded-full text-white text-xs font-medium flex items-center gap-2"
          >
            <Sun className="w-4 h-4" />
            {weatherData.alert}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
