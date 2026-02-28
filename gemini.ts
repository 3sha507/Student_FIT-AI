import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, WorkoutPlan, MealPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateFitnessPlan(profile: UserProfile): Promise<{ workout: WorkoutPlan; meal: MealPlan }> {
  const model = "gemini-3-flash-preview";

  const prompt = `
    As an expert Fitness Scientist and Nutritionist, generate a highly personalized workout and diet plan for a student with the following profile:
    ${JSON.stringify(profile, null, 2)}

    The plan must be:
    1. Practical for a student schedule.
    2. Budget-sensitive.
    3. Culturally appropriate (${profile.cuisine} cuisine).
    4. Safe given medical conditions: ${profile.medicalConditions || 'None'}.

    Return the response in JSON format matching the schema provided.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          workout: {
            type: Type.OBJECT,
            properties: {
              weeklySplit: { type: Type.STRING },
              dailyExercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING },
                    focus: { type: Type.STRING },
                    exercises: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          sets: { type: Type.STRING },
                          reps: { type: Type.STRING },
                          rest: { type: Type.STRING },
                          notes: { type: Type.STRING }
                        }
                      }
                    },
                    estimatedCalories: { type: Type.NUMBER }
                  }
                }
              },
              progressiveOverload: { type: Type.STRING },
              homeAlternative: { type: Type.STRING }
            }
          },
          meal: {
            type: Type.OBJECT,
            properties: {
              weeklyMeals: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING },
                    meals: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          type: { type: Type.STRING },
                          name: { type: Type.STRING },
                          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                          calories: { type: Type.NUMBER },
                          macros: {
                            type: Type.OBJECT,
                            properties: {
                              p: { type: Type.NUMBER },
                              c: { type: Type.NUMBER },
                              f: { type: Type.NUMBER }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              groceryList: { type: Type.ARRAY, items: { type: Type.STRING } },
              budgetTips: { type: Type.ARRAY, items: { type: Type.STRING } },
              culturalNotes: { type: Type.STRING }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
}
