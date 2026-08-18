export async function generateGeminiResponse(prompt: string): Promise<string> {
  // Simula um delay de processamento da IA (1 segundo)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return `[MOCK GEMINI RESPONSE] Para fazer Hello World em Python:\n\nprint("Hello, World!")`;
}