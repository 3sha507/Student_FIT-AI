import React, { useState, useEffect } from 'react';
import { UserProfile, WorkoutPlan, MealPlan, ProgressMetric } from '../types';
import { Dumbbell, Utensils, TrendingUp, Calendar, Settings, LogOut, ChevronRight, Clock, Flame, Target, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import WorkoutView from './WorkoutView';
import MealView from './MealView';
import ProgressView from './ProgressView';

interface DashboardProps {
  profile: UserProfile;
  workout: WorkoutPlan;
  meal: MealPlan;
  progress: ProgressMetric[];
  onUpdateProgress: (metric: ProgressMetric) => void;
}

export default function Dashboard({ profile, workout, meal, progress, onUpdateProgress }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'meal' | 'progress'>('overview');

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaysWorkout = workout.dailyExercises.find(d => d.day === today) || workout.dailyExercises[0];
  const todaysMeals = meal.weeklyMeals.find(m => m.day === today)?.meals || meal.weeklyMeals[0].meals;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'meal', label: 'Nutrition', icon: Utensils },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 text-white border-r border-zinc-800 p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <Dumbbell size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">StudentFit</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-emerald-500 text-white font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                  : "text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              )}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">
              {profile.gender === 'Male' ? 'M' : profile.gender === 'Female' ? 'F' : 'U'}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-zinc-100">{profile.gender === 'Male' ? 'Mr.' : 'Ms.'} Student</p>
              <p className="text-xs text-zinc-500 truncate w-32">Goal: {profile.goals}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-900">
            {activeTab === 'overview' && "Welcome back!"}
            {activeTab === 'workout' && "Your Workout Plan"}
            {activeTab === 'meal' && "Nutrition & Meal Plan"}
            {activeTab === 'progress' && "Your Progress"}
          </h2>
          <p className="text-zinc-500 mt-1">
            {activeTab === 'overview' && `Today is ${today}. Let's crush your goals.`}
            {activeTab === 'workout' && `Optimized for ${profile.gymAccess ? 'Gym' : 'Home'} training.`}
            {activeTab === 'meal' && `Budget-friendly ${profile.cuisine} meals.`}
            {activeTab === 'progress' && "Tracking your journey to success."}
          </p>
        </header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Flame size={20} /></div>
                    <span className="text-xs font-bold text-zinc-400 uppercase">Daily Burn</span>
                  </div>
                  <p className="text-2xl font-bold">{todaysWorkout.estimatedCalories} kcal</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Clock size={20} /></div>
                    <span className="text-xs font-bold text-zinc-400 uppercase">Workout Time</span>
                  </div>
                  <p className="text-2xl font-bold">{profile.workoutTimePerDay} min</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Target size={20} /></div>
                    <span className="text-xs font-bold text-zinc-400 uppercase">Current BMI</span>
                  </div>
                  <p className="text-2xl font-bold">{profile.bmi.toFixed(1)}</p>
                </div>
              </div>

              {/* Today's Focus */}
              <div className="p-8 bg-zinc-900 text-white rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">Today's Focus</span>
                  <h3 className="text-4xl font-bold mb-4">{todaysWorkout.focus}</h3>
                  <div className="flex flex-wrap gap-4 mb-8">
                    {todaysWorkout.exercises.slice(0, 3).map((ex, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                        <Check size={14} className="text-emerald-400" />
                        <span>{ex.name}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveTab('workout')}
                    className="bg-white text-zinc-900 px-6 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-emerald-50 transition-all"
                  >
                    <span>Start Workout</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
                <Dumbbell size={200} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
              </div>
            </div>

            {/* Meal Preview */}
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                <h4 className="font-bold mb-4 flex items-center space-x-2">
                  <Utensils size={18} className="text-emerald-600" />
                  <span>Today's Meals</span>
                </h4>
                <div className="space-y-4">
                  {todaysMeals.map((meal, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-all group">
                      <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase">{meal.type}</p>
                        <p className="text-sm font-semibold">{meal.name}</p>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">{meal.calories} kcal</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('meal')}
                  className="w-full mt-6 text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-center space-x-1"
                >
                  <span>View Full Meal Plan</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="p-6 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200">
                <h4 className="font-bold mb-2">Budget Tip</h4>
                <p className="text-sm text-emerald-50 leading-relaxed">
                  {meal.budgetTips[0]}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workout' && <WorkoutView workout={workout} profile={profile} />}
        {activeTab === 'meal' && <MealView meal={meal} profile={profile} />}
        {activeTab === 'progress' && <ProgressView progress={progress} onUpdate={onUpdateProgress} />}
      </main>
    </div>
  );
}
