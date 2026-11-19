export type Mood = 'Animado' | 'Tranquilo' | 'Cansado' | 'Desafiado';
export type Energy = 'Baixa' | 'Média' | 'Alta';
export type MissionCategory = 'Exploração' | 'Criatividade' | 'Social' | 'Bem-estar';

export type Mission = {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  durationMinutes: number;
  difficulty: 'Fácil' | 'Média' | 'Desafiadora';
  xp: number;
  steps: string[];
  completed?: boolean;
};

export type WeatherInfo = {
  temperature: number;
  description: string;
  isDay: boolean;
};
