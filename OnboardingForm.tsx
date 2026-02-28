import React, { useState } from 'react';
import { UserProfile, FitnessLevel, Goal, StressLevel, DietType, Cuisine } from '../types';
import { cn } from '../lib/utils';
import { ArrowRight, ArrowLeft, Check, Dumbbell, Utensils, Calendar, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingFormProps {
  onComplete: (profile: UserProfile) => void;
}

export default function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: 'Other',
    fitnessLevel: 'Beginner',
    goals: 'General fitness',
    stressLevel: 'Medium',
    dietType: 'Non-vegetarian',
    cuisine: 'Western',
    gymAccess: false,
    outdoorAccess: true,
    weeklyBudget: '$50-100',
  });

  const totalSteps = 6;

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!(profile.age && profile.height && profile.weight);
      case 3:
        return !!(profile.workoutTimePerDay && profile.sleepDuration);
      default:
        return true;
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    const bmi = profile.weight! / ((profile.height! / 100) ** 2);
    onComplete({ ...profile, bmi } as UserProfile);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900">Personal Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <input 
                  type="number" 
                  value={profile.age || ''} 
                  onChange={e => updateProfile({ age: e.target.value ? parseInt(e.target.value) : ('' as any) })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <select 
                  value={profile.gender} 
                  onChange={e => updateProfile({ gender: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Height (cm)</label>
                <input 
                  type="number" 
                  value={profile.height || ''} 
                  onChange={e => updateProfile({ height: e.target.value ? parseInt(e.target.value) : ('' as any) })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight (kg)</label>
                <input 
                  type="number" 
                  value={profile.weight || ''} 
                  onChange={e => updateProfile({ weight: e.target.value ? parseInt(e.target.value) : ('' as any) })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900">Fitness Goals</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fitness Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as FitnessLevel[]).map(level => (
                    <button
                      key={level}
                      onClick={() => updateProfile({ fitnessLevel: level })}
                      className={cn(
                        "p-3 border rounded-lg text-sm transition-all",
                        profile.fitnessLevel === level ? "bg-emerald-500 text-white border-emerald-500" : "hover:bg-zinc-50"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Goal</label>
                <select 
                  value={profile.goals} 
                  onChange={e => updateProfile({ goals: e.target.value as Goal })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option>Weight loss</option>
                  <option>Muscle gain</option>
                  <option>Endurance</option>
                  <option>General fitness</option>
                  <option>Fat loss + muscle toning</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Medical Conditions / Injuries</label>
                <textarea 
                  placeholder="Any conditions we should know about?"
                  value={profile.medicalConditions}
                  onChange={e => updateProfile({ medicalConditions: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900">Lifestyle & Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Workout Time (mins/day)</label>
                <input 
                  type="number" 
                  value={profile.workoutTimePerDay || ''} 
                  onChange={e => updateProfile({ workoutTimePerDay: e.target.value ? parseInt(e.target.value) : ('' as any) })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sleep (hours/night)</label>
                <input 
                  type="number" 
                  value={profile.sleepDuration || ''} 
                  onChange={e => updateProfile({ sleepDuration: e.target.value ? parseInt(e.target.value) : ('' as any) })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="space-y-2 col-span-full">
                <label className="text-sm font-medium">Stress Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as StressLevel[]).map(level => (
                    <button
                      key={level}
                      onClick={() => updateProfile({ stressLevel: level })}
                      className={cn(
                        "p-3 border rounded-lg text-sm transition-all",
                        profile.stressLevel === level ? "bg-emerald-500 text-white border-emerald-500" : "hover:bg-zinc-50"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 col-span-full">
                <label className="text-sm font-medium">Class Schedule (Briefly describe)</label>
                <textarea 
                  placeholder="e.g. 9 AM - 3 PM daily, busy on Tuesdays"
                  value={profile.classSchedule}
                  onChange={e => updateProfile({ classSchedule: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-20"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900">Food Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Diet Type</label>
                <select 
                  value={profile.dietType} 
                  onChange={e => updateProfile({ dietType: e.target.value as DietType })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option>Vegetarian</option>
                  <option>Non-vegetarian</option>
                  <option>Vegan</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cuisine</label>
                <select 
                  value={profile.cuisine} 
                  onChange={e => updateProfile({ cuisine: e.target.value as Cuisine })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option>Indian</option>
                  <option>Mediterranean</option>
                  <option>Asian</option>
                  <option>Western</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2 col-span-full">
                <label className="text-sm font-medium">Allergies / Restrictions</label>
                <input 
                  type="text" 
                  placeholder="e.g. Peanuts, Gluten-free"
                  value={profile.allergies}
                  onChange={e => updateProfile({ allergies: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900">Budget & Resources</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Weekly Food Budget</label>
                <select 
                  value={profile.weeklyBudget} 
                  onChange={e => updateProfile({ weeklyBudget: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option>$20-50</option>
                  <option>$50-100</option>
                  <option>$100-200</option>
                  <option>$200+</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-zinc-50">
                  <input 
                    type="checkbox" 
                    checked={profile.gymAccess} 
                    onChange={e => updateProfile({ gymAccess: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  <span className="text-sm font-medium">Gym Access</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-zinc-50">
                  <input 
                    type="checkbox" 
                    checked={profile.outdoorAccess} 
                    onChange={e => updateProfile({ outdoorAccess: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  <span className="text-sm font-medium">Outdoor Access</span>
                </label>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Equipment Available</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dumbbells, Resistance bands, None"
                  value={profile.equipment}
                  onChange={e => updateProfile({ equipment: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">Ready to Generate!</h2>
            <p className="text-zinc-500">
              We've collected all the details. Our AI will now craft a plan that fits your student life, budget, and goals.
            </p>
            <div className="p-4 bg-zinc-50 rounded-xl text-left space-y-2">
              <p className="text-sm"><strong>Goal:</strong> {profile.goals}</p>
              <p className="text-sm"><strong>Diet:</strong> {profile.dietType} ({profile.cuisine})</p>
              <p className="text-sm"><strong>Budget:</strong> {profile.weeklyBudget}</p>
              <p className="text-sm"><strong>Gym:</strong> {profile.gymAccess ? 'Yes' : 'No'}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Step {step} of {totalSteps}</span>
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1 w-8 rounded-full transition-all",
                  i + 1 <= step ? "bg-emerald-500" : "bg-zinc-200"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex justify-between">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={cn(
            "flex items-center space-x-2 px-6 py-2 rounded-full font-medium transition-all",
            step === 1 ? "opacity-0 pointer-events-none" : "hover:bg-zinc-100 text-zinc-600"
          )}
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        
        {step < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            className={cn(
              "flex items-center space-x-2 px-8 py-2 rounded-full font-medium transition-all",
              isStepValid() 
                ? "bg-zinc-900 text-white hover:bg-zinc-800" 
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            )}
          >
            <span>Next</span>
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-8 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-all"
          >
            <span>Generate Plan</span>
            <Check size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
