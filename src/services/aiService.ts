import type {
  Energy,
  Mission,
  MissionCategory,
  MissionDifficulty,
  Mood,
  WeatherInfo,
} from '../types/Mission';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const MODEL = process.env.EXPO_PUBLIC_GEMINI_MODEL || 'gemini-2.5-flash';

type GenerateInput = {
  mood: Mood;
  energy: Energy;
  availableMinutes: number;
  weather: WeatherInfo | null;
};

type GeminiMission = {
  title?: string;
  description?: string;
  category?: string;
  durationMinutes?: number;
  difficulty?: string;
  xp?: number;
  steps?: string[];
};

const categories: MissionCategory[] = [
  'Exploração',
  'Criatividade',
  'Social',
  'Desafio pessoal',
];

const difficulties: MissionDifficulty[] = [
  'Fácil',
  'Média',
  'Desafiadora',
];

export async function generateMissions(input: GenerateInput): Promise<Mission[]> {
  if (!API_KEY) {
    throw new Error(
      'Chave Gemini não configurada. Preencha EXPO_PUBLIC_GEMINI_API_KEY no arquivo .env.'
    );
  }

  const weatherText = input.weather
    ? `${input.weather.temperature}°C, ${input.weather.description}`
    : 'clima não disponível';

  const prompt = `
Você é o gerador de missões do aplicativo SideQuest AI.
Crie exatamente 3 missões curtas, seguras, realistas e variadas.

Contexto do usuário:
- Humor: ${input.mood}
- Energia: ${input.energy}
- Tempo disponível: ${input.availableMinutes} minutos
- Clima: ${weatherText}

Use somente estas categorias:
- Exploração: descobrir lugares, observar o ambiente ou experimentar algo novo.
- Criatividade: desenhar, escrever, fotografar ou criar algo.
- Social: fortalecer vínculos e realizar interações respeitosas.
- Desafio pessoal: organização, movimento, aprendizado ou desenvolvimento individual.

Regras:
- Cada missão deve caber no tempo disponível.
- Não sugira atividades perigosas, gastos obrigatórios, exposição de dados pessoais,
  invasão de propriedade ou abordagens invasivas a desconhecidos.
- Se estiver chovendo, priorize opções internas.
- Varie as categorias sempre que possível.
- Use português brasileiro.
- Responda somente com JSON válido, sem markdown.

Formato:
{
  "missions": [
    {
      "title": "Título curto",
      "description": "Descrição em até 220 caracteres",
      "category": "Exploração",
      "durationMinutes": 10,
      "difficulty": "Fácil",
      "xp": 20,
      "steps": ["Passo 1", "Passo 2"]
    }
  ]
}

A propriedade category deve ser exatamente uma destas opções:
"Exploração", "Criatividade", "Social", "Desafio pessoal".

A propriedade difficulty deve ser exatamente uma destas opções:
"Fácil", "Média", "Desafiadora".

Não ultrapasse ${input.availableMinutes} minutos por missão.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Não foi possível consultar a IA (código ${response.status}).`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? '')
    .join('');

  if (!rawText) {
    throw new Error('A IA retornou uma resposta vazia. Tente novamente.');
  }

  let parsed: { missions?: GeminiMission[] };

  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error('A IA retornou um formato inesperado. Tente novamente.');
  }

  if (!Array.isArray(parsed.missions) || parsed.missions.length !== 3) {
    throw new Error('A IA não retornou exatamente três missões. Tente novamente.');
  }

  return parsed.missions.map((item, index) => {
    if (
      !item.title ||
      !item.description ||
      !categories.includes(item.category as MissionCategory) ||
      !difficulties.includes(item.difficulty as MissionDifficulty)
    ) {
      throw new Error('Uma das missões veio com informações inválidas. Gere novamente.');
    }

    const duration = Number(item.durationMinutes);
    const xp = Number(item.xp);

    if (
      !Number.isFinite(duration) ||
      duration <= 0 ||
      duration > input.availableMinutes ||
      !Number.isFinite(xp) ||
      xp <= 0
    ) {
      throw new Error('A IA retornou duração ou XP inválido. Gere novamente.');
    }

    return {
      id: `${Date.now()}-${index}`,
      title: item.title,
      description: item.description,
      category: item.category as MissionCategory,
      durationMinutes: duration,
      difficulty: item.difficulty as MissionDifficulty,
      xp,
      steps: Array.isArray(item.steps)
        ? item.steps.filter((step): step is string => typeof step === 'string')
        : [],
    };
  });
}