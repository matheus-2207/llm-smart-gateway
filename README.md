# LLM Smart Gateway

Um gateway intermediário leve, resiliente e escalável construído com **Node.js**, **TypeScript** e **Fastify** para centralizar, gerenciar e otimizar chamadas a Modelos de Linguagem (LLMs).

---

## Recursos Principais

* **Centralização de Provedores:** Ponto único de entrada para requisições de IA.
* **Seleção Dinâmica:** Suporte à escolha de provedores (`gemini`, `mock`) diretamente no payload JSON.
* **Resiliência e Fallback:** Redirecionamento automático para respostas alternativas (*Mock Fallback*) em caso de falhas de rede, bloqueios corporativos ou erro na API externa.
* **Cache em Memória:** Armazenamento de respostas para prompts idênticos, garantindo respostas instantâneas e redução de custos.
* **Health Check:** Endpoint dedicado para monitoramento do status da aplicação (`/health`).

---

## Tecnologias Utilizadas

* **Node.js** & **TypeScript**
* **Fastify** (Framework Web de alta performance)
* **@google/generative-ai** (SDK Oficial do Gemini)
* **dotenv** (Gerenciamento de variáveis de ambiente)
* **tsx** (Execução e *Hot-reload* em desenvolvimento)

---

## Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone <https://github.com/matheus-2207/llm-smart-gateway.git>
cd LLM-Smart-Gateway