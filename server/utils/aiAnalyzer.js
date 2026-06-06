const axios = require('axios');

const analyzeWithAI = async (payload) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.AI_MODEL || 'claude-3-opus';

    if (!apiKey) {
      throw new Error('No OpenRouter API key configured. Get one at https://openrouter.ai/');
    }

    const systemPrompt = `You are a career assessment engine. Given a student's scores and portfolio, classify them as Beginner / Intermediate / Advanced and return a JSON object:
{
  "level": "Beginner|Intermediate|Advanced",
  "reason": "string explaining classification",
  "roadmap": [
    {
      "phase": "Phase name",
      "duration": "time estimate",
      "tasks": ["task1", "task2"],
      "resources": ["resource1", "resource2"]
    }
  ],
  "recommendedProjects": [
    {
      "title": "Project title",
      "description": "Project description",
      "difficulty": "Easy|Medium|Hard"
    }
  ],
  "mentorFocus": "String describing what mentor should focus on"
}

Classification Rules:
- Beginner    : totalScore < 40 OR projectCount < 2
- Intermediate: totalScore 40–70 AND projectCount 2–5
- Advanced    : totalScore > 70 AND projectCount > 5`;

    const userMessage = `Analyze this student profile:
Career Goal: ${payload.careerGoal}
Aptitude Score: ${payload.aptitudeScore}
Programming Score: ${payload.programmingScore}
Career Specific Score: ${payload.careerSpecificScore}
Project Count: ${payload.projectCount}
Project Titles: ${payload.projectTitles?.join(', ') || 'None'}`;

    // Using OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'AI Future Campus',
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    // Parse JSON from AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response');
    }

    const aiAnalysis = JSON.parse(jsonMatch[0]);
    return aiAnalysis;
  } catch (error) {
    console.error('AI Analysis Error:', error.message);
    throw error;
  }
};

module.exports = { analyzeWithAI };
