import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Tenta chamada à API oficial do Gemini
 */
async function callGeminiApi(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * Resposta simulada (Fallback) para uso offline / rede corporativa
 */
async function callMockProvider(prompt: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return `[MOCK FALLBACK]: Resposta simulada para a pergunta: "${prompt}"`;
}

/**
 * Função principal com Fallback Automático
 */
export async function generateResponseWithFallback(prompt: string): Promise<{ text: string; provider: string }> {
  try {
    // 1ª Tentativa: API Real do Gemini
    const text = await callGeminiApi(prompt);
    return { text, provider: 'gemini-api' };
  } catch (error) {
    console.warn('⚠️ Falha na API do Gemini. Acionando Fallback para Mock local...');
    
    // 2ª Tentativa: Mock Provider
    const text = await callMockProvider(prompt);
    return { text, provider: 'mock-fallback' };
  }
}