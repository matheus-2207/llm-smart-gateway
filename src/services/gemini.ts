import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Armazenamento do cache em memória (Prompt -> Resposta)
const responseCache = new Map<string, { text: string; providerUsed: string }>();

async function callGeminiApi(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function callMockProvider(prompt: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return `[MOCK RESPONSE]: Resposta simulada para: "${prompt}"`;
}

export async function processChatRequest(
  prompt: string,
  requestedProvider: string = 'gemini'
): Promise<{ text: string; providerUsed: string; cached: boolean }> {
  const cacheKey = `${requestedProvider.toLowerCase()}:${prompt.trim().toLowerCase()}`;

  // 1. Verifica se já existe em cache
  if (responseCache.has(cacheKey)) {
    const cachedData = responseCache.get(cacheKey)!;
    return { ...cachedData, cached: true };
  }

  let text = '';
  let providerUsed = requestedProvider;

  // 2. Processa via Mock ou Gemini com Fallback
  if (requestedProvider.toLowerCase() === 'mock') {
    text = await callMockProvider(prompt);
    providerUsed = 'mock';
  } else {
    try {
      text = await callGeminiApi(prompt);
      providerUsed = 'gemini-api';
    } catch (error) {
      console.warn(`⚠️ Falha no provedor '${requestedProvider}'. Redirecionando para mock-fallback...`);
      text = await callMockProvider(prompt);
      providerUsed = 'mock-fallback';
    }
  }

  // 3. Salva o resultado no cache
  const result = { text, providerUsed };
  responseCache.set(cacheKey, result);

  return { ...result, cached: false };
}