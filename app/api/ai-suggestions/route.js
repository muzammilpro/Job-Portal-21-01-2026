// app/api/ai-suggestions/route.js
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {

  const rawBody = await req.text();
  console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
  console.log('Request body:', rawBody.substring(0, 100) + '...');

  try {
    const { about, skills, experience, education } = JSON.parse(rawBody);
    
    const prompt = `The user wrote this About section: "${about}"

User ki details:
- Skills: ${skills || 'N/A'}
- Experience: ${experience || 'N/A'}
- Education: ${education || 'N/A'}

Create 3 professional 'About Me' suggestions based on this user's profile:
1. Use the user's skills and experience
2. Match the user's writing style 
3. 100–150 words each
4. LinkedIn-style professional

return ONLY JSON array:
["suggestion1", "suggestion2", "suggestion3"]`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      max_tokens: 1000,
      temperature: 0.7,
    });

    let suggestions = [];
    try {
      suggestions = JSON.parse(completion.choices[0]?.message?.content || '[]');
    } catch {
      // Fallback if model fails
      suggestions = [
        `Passionate professional with expertise in ${skills || 'modern technologies'}. ${about || 'Experienced in creating impactful solutions'}.`,
        `Skilled developer specializing in ${skills?.split(',')[0] || 'web development'}. ${education ? `B.S. ${education}` : ''} Seeking growth opportunities.`,
        `Dynamic team player with strong ${skills || 'technical skills'}. Proven ability to deliver ${experience || 'high-quality projects'}.`
      ];
    }

    return Response.json({ 
      success: true, 
      suggestions: Array.isArray(suggestions) ? suggestions.slice(0, 3) : [suggestions],
      count: suggestions.length 
    });

  } catch (error) {
    console.error('AI suggestions error:', error);
    return Response.json({ 
      error: error.message, 
      suggestions: [
        "Experienced professional passionate about technology.",
        "Skilled developer creating impactful solutions.",
        "Dynamic team player with strong technical skills."
      ]
    }, { status: 200 });
  }
}
