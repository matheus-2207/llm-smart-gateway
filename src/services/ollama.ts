import { Ollama } from 'ollama';

// Conecta à instância do Ollama rodando na porta padrão 11434
const ollama = new Ollama({ host: 'http://localhost:11434' });

/**
 * Envia um prompt para o modelo de código do Ollama e retorna a resposta
 */
export async function generateOllamaResponse(prompt: string): Promise<string> {
  try {
    const response = await ollama.chat({
      model: 'qwen2.5-coder',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.message.content;
  } catch (error) {
    console.error('Erro ao comunicar com o Ollama:', error);
    throw new Error('Falha ao gerar resposta do modelo local.');
  }
}