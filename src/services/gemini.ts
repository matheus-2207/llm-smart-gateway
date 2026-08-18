import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

/**
 * Processa a requisição com base no provider solicitado
 */
export async function processChatRequest(
  prompt: string,
  requestedProvider: string = 'gemini'
): Promise<{ text: string; providerUsed: string }> {
  
  // Se o cliente solicitar explicitamente 'mock'
  if (requestedProvider.toLowerCase() === 'mock') {
    const text = await callMockProvider(prompt);
    return { text, providerUsed: 'mock' };
  }

  // Tenta o provedor Gemini
  try {
    const text = await callGeminiApi(prompt);
    return { text, providerUsed: 'gemini-api' };
  } catch (error) {
    console.warn(`⚠️ Falha no provedor '${requestedProvider}'. Redirecionando para mock-fallback...`);
    const text = await callMockProvider(prompt);
    return { text, providerUsed: 'mock-fallback' };
  }
}