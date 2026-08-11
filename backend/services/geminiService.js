const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

/**
 * Initializes the Gemini API client securely using process.env.GEMINI_API_KEY
 */
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in backend/.env');
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Builds system instruction for Gemini as Bharat Yatra's expert India travel planner with Web Research enabled
 */
function buildSystemInstruction() {
  return `You are Bharat Yatra's expert India travel planner.

You have access to Google Search grounding. Use Google Search to research current, real-world travel information before generating the itinerary.

CRITICAL INSTRUCTIONS & CONSTRAINTS:
1. Destination & Duration: Respect the target Indian destination and exact number of days requested.
2. Google Search Research:
   - Search the web for current top attractions, authentic local experiences, seasonal advisories, transport, opening times, and realistic pricing.
   - The database context supplied by Bharat Yatra is supplementary background information and MUST NOT restrict your itinerary.
3. Budget Consciousness:
   - The total estimated cost must stay close to the user's selected total budget.
   - Break down estimated expenses into accommodation, transport, activities, food, entry fees, and miscellaneous.
   - If the budget is tight for the destination, optimize by prioritizing free/low-cost attractions, local street transport, and budget food without canceling the trip. Add a warning/note explaining how expenses were optimized.
4. Schedule Realism & Geography:
   - Cluster geographically nearby places. Avoid excessive backtracking.
   - Organize each day into logical MORNING, AFTERNOON, and EVENING segments.
   - Recommend realistic local transport suitable for the region (e.g., Scooty rental in Rishikesh/Goa, Metro in Delhi, Auto-rickshaws, Walking, Boat rides in Varanasi/Alleppey, Bike/Taxi in Ladakh).
5. Travel Style & Pace Adaptation:
   - SOLO: Budget-friendly, flexible, social hostelling/cafes.
   - COUPLE: Scenic, romantic, scenic dining.
   - FAMILY: Comfortable, safe, family-friendly pacing.
   - FRIENDS: High energy, social experiences, group adventure.
   - RELAXED pace: 2-3 major activities/day with ample downtime.
   - MODERATE pace: 3-5 activities/day.
   - PACKED pace: Maximize sightseeing while keeping travel times physically realistic.
6. Festival & Seasonal Awareness:
   - If a travel date is provided, search for active local festivals or events during that period.
   - If travel dates fall outside the recommended season, add a travel note/warning without blocking the trip.

OUTPUT FORMAT REQUIREMENTS:
You MUST respond STRICTLY with valid JSON. Do not include markdown code block backticks (like \`\`\`json), conversational intros, or trailing explanations outside the JSON object.

JSON SCHEMA:
{
  "tripSummary": {
    "title": "String",
    "destination": "String",
    "duration": Number,
    "travelers": Number,
    "travelStyle": "String",
    "budget": Number,
    "estimatedTotal": Number
  },
  "days": [
    {
      "day": Number,
      "date": "String",
      "title": "String",
      "morning": {
        "place": "String",
        "activity": "String",
        "description": "String",
        "duration": "String",
        "transport": "String",
        "estimatedCost": Number
      },
      "afternoon": {
        "place": "String",
        "activity": "String",
        "description": "String",
        "duration": "String",
        "transport": "String",
        "estimatedCost": Number
      },
      "evening": {
        "place": "String",
        "activity": "String",
        "description": "String",
        "duration": "String",
        "transport": "String",
        "estimatedCost": Number
      },
      "foodSuggestion": "String",
      "dayBudget": Number,
      "tips": ["String"]
    }
  ],
  "budgetBreakdown": {
    "accommodation": Number,
    "transport": Number,
    "food": Number,
    "activities": Number,
    "entryFees": Number,
    "miscellaneous": Number,
    "estimatedTotal": Number
  },
  "travelTips": ["String"],
  "warnings": ["String"]
}`;
}

/**
 * Formats user parameters and MySQL database context into a prompt for Gemini
 */
function buildUserPrompt(params, dbContext) {
  const { destination, days, budget, travelStyle, interests, travelers, pace, startDate, previousItinerary } = params;

  let prompt = `Create a realistic ${days}-day personalized travel itinerary for ${destination}.\n\n`;
  prompt += `USER PARAMETERS:\n`;
  prompt += `- Destination: ${destination}\n`;
  prompt += `- Number of Days: ${days}\n`;
  prompt += `- Total Budget: ₹${budget}\n`;
  prompt += `- Number of Travelers: ${travelers || 1}\n`;
  prompt += `- Travel Style: ${travelStyle || 'Friends'}\n`;
  prompt += `- Preferred Pace: ${pace || 'Moderate'}\n`;
  prompt += `- Interests: ${Array.isArray(interests) && interests.length > 0 ? interests.join(', ') : 'Sightseeing, Local Culture, Food'}\n`;
  if (startDate) {
    prompt += `- Start Date: ${startDate}\n`;
  }

  if (previousItinerary) {
    prompt += `\nREGENERATION REQUEST:\nThe user wants a DIFFERENT/ALTERNATIVE itinerary compared to their previous version. Avoid repeating the same activity combinations while maintaining budget and preferences.\n`;
  }

  if (dbContext && dbContext.destination) {
    prompt += `\nBHARAT YATRA DATABASE SUPPLEMENTARY CONTEXT (Reference only, do NOT restrict web search):\n`;
    prompt += `Destination: ${dbContext.destination.name}, ${dbContext.destination.state_name || ''}\n`;
    prompt += `Best Season: ${dbContext.destination.best_time || 'N/A'}\n`;
    prompt += `Average Daily Budget: ₹${dbContext.destination.average_budget || 2500}\n`;
    if (dbContext.attractions && dbContext.attractions.length > 0) {
      prompt += `Database Attractions: ` + dbContext.attractions.map(a => a.name).join(', ') + '\n';
    }
    if (dbContext.activities && dbContext.activities.length > 0) {
      prompt += `Database Activities: ` + dbContext.activities.map(a => a.name).join(', ') + '\n';
    }
    if (dbContext.transport && dbContext.transport.length > 0) {
      prompt += `Database Transport: ` + dbContext.transport.map(t => `${t.name} (${t.transport_type})`).join(', ') + '\n';
    }
  }

  prompt += `\nPlease research Google for current 2026 information on ${destination} matching these interests (${Array.isArray(interests) ? interests.join(', ') : interests}) and pace (${pace}), then return strictly the structured JSON.`;

  return prompt;
}

/**
 * Primary function to generate structured itinerary using Gemini API with Google Search Grounding & model fallbacks
 */
async function generateItineraryFromGemini(params, dbContext) {
  const ai = getGeminiClient();
  const systemInstruction = buildSystemInstruction();
  const userPrompt = buildUserPrompt(params, dbContext);

  // Development & Debugging Logs
  console.log('\n=================== TRIP PLANNER REQUEST ===================');
  console.log(`Destination: ${params.destination} | Days: ${params.days} | Budget: ₹${params.budget}`);
  console.log(`Travelers: ${params.travelers} | Style: ${params.travelStyle} | Pace: ${params.pace}`);
  console.log(`Interests: ${Array.isArray(params.interests) ? params.interests.join(', ') : params.interests}`);
  if (params.startDate) console.log(`Start Date: ${params.startDate}`);
  console.log('Gemini API: CONNECTED | Google Search Grounding: ENABLED');
  console.log('============================================================\n');

  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  let response = null;
  let lastErr = null;
  const backoffDelays = [1500, 3000, 5000];

  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      console.log(`[Attempt ${attempt}/4] Sending request to Gemini API (${modelName})...`);
      response = await ai.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          tools: [{ googleSearch: {} }] // Enable Google Search Grounding
        }
      });

      if (response && response.text) {
        console.log(`✅ Success response from model: ${modelName}`);
        break;
      }
    } catch (err) {
      console.warn(`⚠️ Attempt ${attempt}/4 failed (${err.message || err.status}).`);
      lastErr = err;
      if (attempt < 4) {
        const delay = backoffDelays[attempt - 1] || 3000;
        console.log(`Waiting ${delay / 1000}s before retry...`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  if (!response || !response.text) {
    console.error('Gemini API call failed after 4 attempts:', lastErr?.message || lastErr);
    throw lastErr || new Error('Received empty response from Gemini API.');
  }



  try {
    const rawText = response.text;

    // Extract Grounding Metadata & Web Sources
    const candidate = response.candidates && response.candidates[0];
    const groundingMetadata = candidate?.groundingMetadata || response.groundingMetadata;

    const sources = [];
    const searchQueries = groundingMetadata?.webSearchQueries || [];

    if (groundingMetadata?.groundingChunks && Array.isArray(groundingMetadata.groundingChunks)) {
      const seenUrls = new Set();
      groundingMetadata.groundingChunks.forEach((chunk) => {
        if (chunk.web && chunk.web.uri) {
          const url = chunk.web.uri;
          let title = chunk.web.title || '';
          if (!title) {
            try {
              title = new URL(url).hostname.replace(/^www\./, '');
            } catch (e) {
              title = url;
            }
          }
          if (!seenUrls.has(url)) {
            seenUrls.add(url);
            sources.push({ title, url });
          }
        }
      });
    }

    // Grounding Debugging Logs
    console.log(`Gemini Response Received | Grounding Sources: ${sources.length} | Search Queries: ${searchQueries.length}`);
    if (searchQueries.length > 0) {
      console.log(`Search Queries Executed:`, searchQueries);
    }
    if (sources.length === 0) {
      console.warn('WARNING: Gemini did not return Google Search grounding metadata.');
    } else {
      console.log(`Grounding Sources Extracted: ${sources.map(s => s.title).join(', ')}`);
    }

    // Clean JSON response (strip markdown wrappers ```json ... ```)
    let cleanedText = rawText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Extract JSON substring if conversational text surrounds it
    const firstBrace = cleanedText.indexOf('{');
    const lastBrace = cleanedText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
    }

    let itineraryData;
    try {
      itineraryData = JSON.parse(cleanedText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini JSON output:', cleanedText.slice(0, 300));
      throw new SyntaxError('Gemini returned invalid JSON structure.');
    }

    // Attach extracted web sources & queries
    itineraryData.sources = sources;
    itineraryData.searchQueries = searchQueries;

    return itineraryData;

  } catch (error) {
    console.error('Gemini Service Processing Error:', error.message || error);
    throw error;
  }
}

module.exports = {
  generateItineraryFromGemini,
  buildSystemInstruction,
  buildUserPrompt
};
