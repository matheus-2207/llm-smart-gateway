import Fastify from 'fastify';

const app = Fastify({
  logger: true
});

// Rota de teste
app.get('/health', async (request, reply) => {
  return { status: 'ok', service: 'LLM Gateway', timestamp: new Date() };
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