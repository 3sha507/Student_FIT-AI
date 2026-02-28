import React, { useState, useEffect } from 'react';
import { UserProfile, WorkoutPlan, MealPlan, ProgressMetric } from './types';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import { generateFitnessPlan } from './services/gemini';
import { Loader2, Sparkles, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [meal, setMeal] = useState<MealPlan | null>(null);
  const [progress, setProgress] = useState<ProgressMetric[]>([]);
  const [userId] = useState(() => Math.random().toString(36).substring(7));

  useEffect(() => {
    // Attempt to load existing user data
    const loadUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data.profile);
          setWorkout(data.current_plan.workout);
          setMeal(data.current_plan.meal);
          setProgress(data.progress || []);
        }
      } catch (e) {
        console.error("Failed to load user", e);
      }
    };
    // loadUser(); // Disabled for demo purposes to always show onboarding if no profile in state
  }, [userId]);

  const handleOnboardingComplete = async (newProfile: UserProfile) => {
    setLoading(true);
    try {
      const plan = await generateFitnessPlan(newProfile);
      setProfile(newProfile);
      setWorkout(plan.workout);
      setMeal(plan.meal);
      
      // Save to DB
      await fetch(`/api/user/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: newProfile,
          current_plan: plan,
          progress: []
        })
      });
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (metric: ProgressMetric) => {
    const newProgress = [...progress, metric];
    setProgress(newProgress);
    
    // Update DB
    await fetch(`/api/user/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile,
        current_plan: { workout, meal },
        progress: newProgress
      })
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-6 text-emerald-600"
        >
          <Sparkles size={64} />
        </motion.div>
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Crafting Your Perfect Plan</h2>
        <p className="text-zinc-500 max-w-md">
          Our AI is analyzing your schedule, budget, and goals to create a personalized fitness and nutrition strategy just for you.
        </p>
        <div className="mt-8 flex items-center space-x-2 text-zinc-400">
          <Loader2 className="animate-spin" size={18} />
          <span className="text-sm font-medium">Generating routines and recipes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 relative">
      {/* Background Image for Onboarding */}
      {!profile && (
        <div 
          className="absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
      )}
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!profile ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12 min-h-screen flex flex-col items-center justify-center"
            >
              <div className="text-center mb-12 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/50 inline-block max-w-xl w-full">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-emerald-200">
                  <Dumbbell size={32} />
                </div>
                <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">StudentFit AI</h1>
                <p className="text-zinc-700 mt-2 font-medium">Personalized fitness for the modern student.</p>
              </div>
              <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
                <OnboardingForm onComplete={handleOnboardingComplete} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Dashboard 
                profile={profile} 
                workout={workout!} 
                meal={meal!} 
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
