import React, { useState } from 'react';
import { MealPlan, UserProfile } from '../types';
import { ShoppingCart, Lightbulb, Globe, CheckCircle2, DollarSign, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface MealViewProps {
  meal: MealPlan;
  profile: UserProfile;
}

export default function MealView({ meal, profile }: MealViewProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-bold">Weekly Meal Plan</h3>
          <div className="grid grid-cols-1 gap-6">
            {meal.weeklyMeals.map((day, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={day.day} 
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm"
              >
                <div className="bg-zinc-50 px-6 py-3 border-b border-zinc-100 flex justify-between items-center">
                  <h4 className="font-bold text-zinc-900">{day.day}</h4>
                  <span className="text-xs font-bold text-zinc-400 uppercase">
                    Total: {day.meals.reduce((acc, m) => acc + m.calories, 0)} kcal
                  </span>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {day.meals.map((m, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {m.type}
                          </span>
                          <h5 className="font-bold text-zinc-800 mt-1">{m.name}</h5>
                        </div>
                        <span className="text-xs font-mono text-zinc-400">{m.calories} kcal</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {m.ingredients.slice(0, 4).map((ing, j) => (
                          <span key={j} className="text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-md">
                            {ing}
                          </span>
                        ))}
                        {m.ingredients.length > 4 && <span className="text-[10px] text-zinc-400">+{m.ingredients.length - 4} more</span>}
                      </div>
                      <div className="flex space-x-3 pt-1">
                        <div className="text-[10px]"><span className="font-bold text-zinc-400">P:</span> {m.macros.p}g</div>
                        <div className="text-[10px]"><span className="font-bold text-zinc-400">C:</span> {m.macros.c}g</div>
                        <div className="text-[10px]"><span className="font-bold text-zinc-400">F:</span> {m.macros.f}g</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm sticky top-6">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <ShoppingCart size={20} className="text-emerald-600" />
              <span>Grocery List</span>
            </h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {meal.groceryList.map((item, i) => {
                const isChecked = checkedItems.has(i);
                return (
                  <div 
                    key={i} 
                    onClick={() => toggleItem(i)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-50 transition-all cursor-pointer"
                  >
                    <div className={cn(
                      "w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 transition-colors",
                      isChecked ? "bg-emerald-500 border-emerald-500" : "border-zinc-300"
                    )}>
                      {isChecked && <Check size={14} className="text-white" />}
                    </div>
                    <span className={cn(
                      "text-sm transition-all",
                      isChecked ? "text-zinc-400 line-through" : "text-zinc-700"
                    )}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 bg-zinc-900 text-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <DollarSign size={20} className="text-emerald-400" />
              <span>Budget Optimization</span>
            </h3>
            <ul className="space-y-3">
              {meal.budgetTips.map((tip, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <h3 className="text-lg font-bold text-orange-900 mb-2 flex items-center space-x-2">
              <Globe size={20} />
              <span>Cultural Customization</span>
            </h3>
            <p className="text-sm text-orange-800/80 leading-relaxed">
              {meal.culturalNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
