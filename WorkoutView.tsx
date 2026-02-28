import React from 'react';
import { WorkoutPlan, UserProfile } from '../types';
import { Dumbbell, Clock, Repeat, Info, Home, Building2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface WorkoutViewProps {
  workout: WorkoutPlan;
  profile: UserProfile;
}

export default function WorkoutView({ workout, profile }: WorkoutViewProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <Repeat size={20} className="text-emerald-600" />
            <span>Weekly Split</span>
          </h3>
          <p className="text-zinc-600 leading-relaxed">{workout.weeklySplit}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <TrendingUp size={20} className="text-emerald-600" />
            <span>Progressive Overload</span>
          </h3>
          <p className="text-zinc-600 leading-relaxed">{workout.progressiveOverload}</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold">Daily Breakdown</h3>
        <div className="grid grid-cols-1 gap-6">
          {workout.dailyExercises.map((day, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={day.day} 
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm"
            >
              <div className="bg-zinc-900 p-4 flex justify-between items-center">
                <div>
                  <h4 className="text-white font-bold text-lg">{day.day}</h4>
                  <p className="text-emerald-400 text-sm font-medium">{day.focus}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs uppercase font-bold">Est. Burn</p>
                  <p className="text-white font-mono">{day.estimatedCalories} kcal</p>
                </div>
              </div>
              <div className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50 border-b border-zinc-100">
                    <tr>
                      <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase">Exercise</th>
                      <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase">Sets</th>
                      <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase">Reps</th>
                      <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase">Rest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {day.exercises.map((ex, i) => (
                      <tr key={i} className="hover:bg-zinc-50 transition-all">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-zinc-800">{ex.name}</p>
                          {ex.notes && <p className="text-xs text-zinc-400 mt-1">{ex.notes}</p>}
                        </td>
                        <td className="px-6 py-4 text-sm font-mono">{ex.sets}</td>
                        <td className="px-6 py-4 text-sm font-mono">{ex.reps}</td>
                        <td className="px-6 py-4 text-sm font-mono">{ex.rest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm">
            {profile.gymAccess ? <Home size={24} /> : <Building2 size={24} />}
          </div>
          <div>
            <h4 className="text-lg font-bold text-emerald-900 mb-2">
              {profile.gymAccess ? "Home Alternative" : "Gym Alternative"}
            </h4>
            <p className="text-emerald-800/80 leading-relaxed">
              {workout.homeAlternative}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
