import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateQuestions(role: string, resumeText?: string, difficulty: string = "medium", count: number = 5) {
  let difficultyDescription = "";
  
  switch(difficulty) {
    case "easy":
      difficultyDescription = "Junior level - Focus on basic concepts, fundamentals, and simple problem-solving. Avoid advanced topics.";
      break;
    case "hard":
      difficultyDescription = "Senior level - Include advanced topics, system design, architectural decisions, scalability, and complex problem-solving.";
      break;
    default: // medium
      difficultyDescription = "Mid level - Include intermediate concepts, practical application, and moderate problem-solving.";
  }

  let prompt = `
Generate ${count} technical interview questions for a ${role} position.

DIFFICULTY LEVEL: ${difficulty.toUpperCase()}
${difficultyDescription}
`;

  if (resumeText && resumeText.trim().length > 0) {
    prompt += `
Based on the following resume, create personalized questions that target the candidate's specific skills, technologies, and experience mentioned:

RESUME:
${resumeText.slice(0, 3000)}

Create questions that:
1. Test their knowledge of technologies they claim to know
2. Ask about projects or experiences they mentioned
3. Probe deeper into their stated skills and responsibilities
4. Are directly relevant to their background
5. Match the ${difficulty} difficulty level
`;
  } else {
    prompt += `
Create general technical questions appropriate for this role at ${difficulty} level.
`;
  }

  prompt += `
Respond strictly in JSON format without any markdown code blocks or backticks:
{
  "questions": [
${Array.from({ length: count }, (_, i) => `    { "id": "q${i + 1}", "text": "<question text>", "difficulty": "${difficulty}" }`).join(',\n')}
  ]
}
`;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  // Remove markdown code blocks if present
  const cleanText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
  return JSON.parse(cleanText).questions;
}

export async function evaluateAnswer(question: string, answer: string) {
  const prompt = `
Evaluate the answer.
Question: ${question}
Answer: ${answer}

Respond in JSON format without any markdown code blocks or backticks:
{ "score": number, "feedback": string }
`;
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  // Remove markdown code blocks if present
  const cleanText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
  return JSON.parse(cleanText);
}
