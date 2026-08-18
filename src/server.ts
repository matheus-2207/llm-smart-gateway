import Fastify from 'fastify';
import dotenv from 'dotenv';
import { generateResponseWithFallback } from './services/gemini.js';

dotenv.config();

const app = Fastify({
  logger: true
});

app.get('/health', async () => {
  return { status: 'ok', service: 'LLM Gateway', timestamp: new Date() };
});

app.post('/chat', async (request, reply) => {
  const { prompt } = request.body as { prompt?: string };

  if (!prompt) {
    return reply.status(400).send({ error: 'O campo "prompt" é obrigatório.' });
  }

  try {
    const { text, provider } = await generateResponseWithFallback(prompt);
    return { prompt, response: text, provider };
  } catch (error) {
    return reply.status(500).send({ error: 'Erro interno ao processar a requisição.' });
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