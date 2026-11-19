import type { Energy, Mission, Mood, WeatherInfo } from "../types/Mission";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const MODEL = process.env.EXPO_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash";

type GenerateInput = {
  mood: Mood;
  energy: Energy;
  availableMinutes: number;
  weather: WeatherInfo | null;
};

export async function generateMissions(
  input: GenerateInput,
): Promise<Mission[]> {
  if (!API_KEY) {
    throw new Error(
      "Chave Gemini não configurada. Preencha EXPO_PUBLIC_GEMINI_API_KEY no arquivo .env.",
    );
  }

  const weatherText = input.weather
    ? `${input.weather.temperature}°C, ${input.weather.description}`
    : "clima não disponível";

  const prompt = `
Você é o motor de missões do aplicativo SideQuest AI.
Crie exatamente 3 missões curtas, seguras, realistas e variadas para uma pessoa.
Humor: ${input.mood}. Energia: ${input.energy}. Tempo disponível: ${input.availableMinutes} minutos.
Clima local: ${weatherText}.
As missões devem caber no tempo informado. Não sugira atividades perigosas, gastos obrigatórios,
exposição de dados pessoais, invasão de propriedade ou abordagens invasivas a desconhecidos.
Se estiver chovendo, priorize opções internas. Responda SOMENTE com JSON válido, sem markdown,
neste formato:
{
 "missions": [
  {
   "title": "título curto",
   "description": "descrição em até 220 caracteres",
   "category": "Exploração|Criatividade|Social|Bem-estar",
   "durationMinutes": 10,
   "difficulty": "Fácil|Média|Desafiadora",
   "xp": 20,
   "steps": ["passo 1", "passo 2"]
  }
 ]
}
Não ultrapasse ${input.availableMinutes} minutos por missão. Use português brasileiro.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Gemini respondeu ${response.status}: ${errorBody.slice(0, 250)}`,
    );
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? "")
    .join("");
  if (!rawText) throw new Error("A IA retornou uma resposta vazia.");

  const parsed = JSON.parse(rawText) as { missions?: Omit<Mission, "id">[] };
  if (!Array.isArray(parsed.missions) || parsed.missions.length === 0) {
    throw new Error("A resposta da IA não contém missões válidas.");
  }

  return parsed.missions.slice(0, 3).map((mission, index) => ({
    ...mission,
    id: `${Date.now()}-${index}`,
    steps: Array.isArray(mission.steps) ? mission.steps : [],
  }));
}
