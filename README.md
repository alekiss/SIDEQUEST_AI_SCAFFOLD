# SideQuest AI

Aplicativo educacional em **Expo SDK 57 + React Native 0.86.3 + TypeScript 6**, seguindo o padrão de projetos desenvolvido em sala.

## Executar

```powershell
npm install
npx expo install --fix
Copy-Item .env.example .env
```

Edite o `.env` e informe a chave do Gemini. Depois:

```powershell
npx expo start -c
```

O ponto de entrada do projeto é `index.ts`, conforme o package.json usado nos projetos da disciplina.

Leia `DOCUMENTACAO_SIDEQUEST_AI.docx` para o roteiro completo, explicação dos arquivos, APIs e sequência didática.

## Observação de segurança

A chave `EXPO_PUBLIC_GEMINI_API_KEY` fica visível no bundle do aplicativo. É aceitável apenas para demonstração didática com chave de teste e limites controlados. Em produção, mova a chamada do Gemini para um backend/BFF e mantenha a chave no servidor.
