export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type Goal = 'Weight loss' | 'Muscle gain' | 'Endurance' | 'General fitness' | 'Fat loss + muscle toning';
export type StressLevel = 'Low' | 'Medium' | 'High';
export type DietType = 'Vegetarian' | 'Non-vegetarian' | 'Vegan';
export type Cuisine = 'Indian' | 'Mediterranean' | 'Asian' | 'Western' | 'Other';

export interface UserProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  fitnessLevel: FitnessLevel;
  medicalConditions: string;
  goals: Goal;
  timeline: string;
  classSchedule: string;
  workoutTimePerDay: number;
  sleepDuration: number;
  stressLevel: StressLevel;
  dietType: DietType;
  cuisine: Cuisine;
  allergies: string;
  dislikedFoods: string;
  religiousRestrictions: string;
  weeklyBudget: string;
  cookingAccess: string;
  gymAccess: boolean;
  equipment: string;
  outdoorAccess: boolean;
}

export interface WorkoutPlan {
  weeklySplit: string;
  dailyExercises: {
    day: string;
    focus: string;
    exercises: {
      name: string;
      sets: string;
      reps: string;
      rest: string;
      notes?: string;
    }[];
    estimatedCalories: number;
  }[];
  progressiveOverload: string;
  homeAlternative: string;
}

export interface MealPlan {
  weeklyMeals: {
    day: string;
    meals: {
      type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
      name: string;
      ingredients: string[];
      calories: number;
      macros: { p: number; c: number; f: number };
    }[];
  }[];
  groceryList: string[];
  budgetTips: string[];
  culturalNotes: string;
}

export interface ProgressMetric {
  date: string;
  weight: number;
  energyLevel: number;
  workoutCompleted: boolean;
  score: number;
}
