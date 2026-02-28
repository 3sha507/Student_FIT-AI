import React, { useState } from 'react';
import { ProgressMetric } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Plus, TrendingUp, Calendar, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgressViewProps {
  progress: ProgressMetric[];
  onUpdate: (metric: ProgressMetric) => void;
}

export default function ProgressView({ progress, onUpdate }: ProgressViewProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newMetric, setNewMetric] = useState<Partial<ProgressMetric>>({
    weight: 70,
    energyLevel: 5,
    workoutCompleted: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = (newMetric.energyLevel! * 10) + (newMetric.workoutCompleted ? 50 : 0);
    onUpdate({
      ...newMetric,
      date: new Date().toISOString().split('T')[0],
      score,
    } as ProgressMetric);
    setShowAdd(false);
  };

  const chartData = progress.map(p => ({
    ...p,
    date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Fitness Journey</h3>
            <p className="text-zinc-500 text-sm">Keep tracking to see your evolution.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="flex items-center space-x-2 bg-zinc-900 text-white px-6 py-2 rounded-full font-bold hover:bg-zinc-800 transition-all"
        >
          <Plus size={18} />
          <span>Log Today</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
          <h4 className="font-bold mb-6 flex items-center space-x-2">
            <TrendingUp size={18} className="text-emerald-600" />
            <span>Weight Trend</span>
          </h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
          <h4 className="font-bold mb-6 flex items-center space-x-2">
            <Award size={18} className="text-emerald-600" />
            <span>Consistency Score</span>
          </h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Log Today's Progress</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Weight (kg)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={newMetric.weight || ''}
                  onChange={e => setNewMetric({ ...newMetric, weight: e.target.value ? parseFloat(e.target.value) : ('' as any) })}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Energy Level (1-10)</label>
                <input 
                  type="range" 
                  min="1" max="10"
                  value={newMetric.energyLevel || 5}
                  onChange={e => setNewMetric({ ...newMetric, energyLevel: parseInt(e.target.value) })}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              <label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-xl hover:bg-zinc-50">
                <input 
                  type="checkbox" 
                  checked={newMetric.workoutCompleted}
                  onChange={e => setNewMetric({ ...newMetric, workoutCompleted: e.target.checked })}
                  className="w-5 h-5 accent-emerald-500"
                />
                <span className="font-medium">Workout Completed?</span>
              </label>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-zinc-500 hover:bg-zinc-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
                >
                  Save Log
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
