<h1 align="center">🏋️‍♂️ StudentFit AI 🥗</h1>
<h3 align="center">AI-Powered Workout & Diet Planner for Students</h3>

<p align="center">
  🚀 Personalized Fitness | 🧠 Smart AI Recommendations | 📊 Progress Tracking | 🎯 Goal-Based Plans
</p>

---

## 📌 About The Project

**StudentFit AI** is an intelligent workout and diet planning system designed specifically for students.  
It generates **personalized fitness plans**, **calorie-optimized diet suggestions**, and **goal-based workout routines** using AI.

Students often struggle with:
- ❌ Irregular schedules  
- ❌ Budget constraints  
- ❌ Lack of proper fitness guidance  
- ❌ Inconsistent diet habits  

This system solves these problems using **data-driven recommendations** and **AI personalization**.

---

# ✨ Key Features

## 🧠 AI-Based Personalization
- Generates workout plans based on:
  - Age
  - Height & Weight
  - BMI
  - Fitness goal (Weight loss / Muscle gain / Maintenance)
  - Activity level

## 🥗 Smart Diet Planner
- Calculates daily calorie requirements
- Suggests affordable student-friendly meals
- Protein, carbs & fat distribution
- Veg / Non-Veg options

## 📊 Progress Tracking
- Weight tracking
- Weekly progress insights
- Fitness score updates

## ⏰ Time-Smart Scheduling
- Short routines for busy students
- Adjustable workout duration
- Home & gym options

## 🎯 Goal-Oriented Planning
- Fat loss
- Lean muscle gain
- General fitness
- Endurance improvement

---

# 🏗️ System Architecture

```text
+--------------------------------------------------+
|                    USER INPUT                    |
|--------------------------------------------------|
|  • Age                                           |
|  • Gender                                        |
|  • Height & Weight                               |
|  • Fitness Goal                                  |
|  • Activity Level                                |
+--------------------------------------------------+
                      |
                      v
+--------------------------------------------------+
|               DATA PREPROCESSING                 |
|--------------------------------------------------|
|  • Input Validation                              |
|  • Data Cleaning                                 |
|  • Feature Selection                             |
+--------------------------------------------------+
                      |
                      v
+--------------------------------------------------+
|               HEALTH CALCULATIONS                |
|--------------------------------------------------|
|  • BMI Calculation                               |
|  • BMR Calculation                               |
|  • Daily Calorie Requirement                     |
+--------------------------------------------------+
                      |
                      v
+--------------------------------------------------+
|           AI RECOMMENDATION ENGINE               |
|--------------------------------------------------|
|  • Goal Analysis                                 |
|  • Plan Optimization                             |
|  • Macro Distribution Calculation                |
+--------------------------------------------------+
                      |
                      v
+--------------------------------------------------+
|                 OUTPUT GENERATION                |
|--------------------------------------------------|
|  • Personalized Workout Plan                     |
|  • Custom Diet Plan                              |
|  • Weekly Fitness Schedule                       |
+--------------------------------------------------+
```

---

# ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML / CSS / React (Optional) |
| Backend | Python / Flask |
| AI Logic | Rule-Based + ML Model |
| Database | MySQL / SQLite |
| Deployment | Local Server / Cloud |

---


# 🧮 Core Calculations Used

### 🔹 BMI Formula

BMI = Weight (kg) / (Height (m) * Height (m))

---

### 🔹 BMR (Mifflin-St Jeor Equation)

#### 👨 For Men

BMR = (10 * W) + (6.25 * H) - (5 * A) + 5

#### 👩 For Women

BMR = (10 * W) + (6.25 * H) - (5 * A) - 161

Where:

W = Weight in kilograms  
H = Height in centimeters  
A = Age in years  

---


### 🔹 Daily Calorie Requirement

Daily Calories = BMR * Activity Factor

---


# 🚀 Installation Guide

### 1️⃣ Clone the Repository

git clone https://github.com/yourusername/studentfit-ai.git  
cd studentfit-ai  

### 2️⃣ Install Dependencies

pip install -r requirements.txt  

### 3️⃣ Run the Application

python app.py  

### 4️⃣ Open in Browser

http://localhost:5000  

---


# 📂 Project Structure

studentfit-ai/
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── package-lock.json
├── README.md
├── server.ts
├── tsconfig.json
├── vite.config.ts
│
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── types.ts
    │
    ├── services/
    │
    ├── components/
    │
    └── lib/

---

# 📸 Sample User Flow

## 1️⃣ User Enters:

- Age  
- Gender  
- Height  
- Weight  
- Goal  

## 2️⃣ System Calculates:

- BMI  
- BMR  
- Daily Calorie Needs  

## 3️⃣ AI Generates:

- Weekly Workout Routine  
- Balanced Diet Plan  
- Progress Suggestions  

---


# 🧩 Future Enhancements

- Mobile App Version  
- Mood-Based Workout Music  
- AI Progress Prediction Model  
- Emotion-Based Fitness Recommendations  
- Budget Optimization for Meals  

---


# 👨‍💻 Developed For

- Students who want to stay fit  
- AI/ML learners building real-world applications  
- Fitness enthusiasts  

---


# 📜 License

This project is open-source and available under the MIT License.

---

# To Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
