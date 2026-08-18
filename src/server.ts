import Fastify from 'fastify';
import dotenv from 'dotenv';
import { generateGeminiResponse } from './services/gemini.js';

dotenv.config();

const app = Fastify({
  logger: true
});

// Endpoint de verificação
app.get('/health', async (request, reply) => {
  return { status: 'ok', service: 'LLM Gateway', timestamp: new Date() };
});

// Endpoint principal para enviar perguntas
app.post('/chat', async (request, reply) => {
  const { prompt } = request.body as { prompt?: string };

  if (!prompt) {
    return reply.status(400).send({ error: 'O campo "prompt" é obrigatório.' });
  }

  try {
    const response = await generateGeminiResponse(prompt);
    return { prompt, response, provider: 'gemini-api' };
  } catch (error) {
    return reply.status(500).send({ error: 'Erro interno ao processar a requisição com o Gemini.' });
  }
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Gateway rodando em http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();