# 🧠 Emoji Match: Glassmorphism Memory Game

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-Fast-yellow) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-4.0) ![Framer Motion](https://img.shields.io/badge/Motion-Framer-pink)

**Day 07 / 30 - April Vibe Coding Challenge**

## Try the live demo - [Demo](https://emoji-match-memory.vercel.app/)

**Emoji Match** is a premium, highly polished memory flashcard game designed with a "Dreamy Glassmorphism" aesthetic. 

Instead of a basic grid of images, Emoji Match offers a tactile, soft, and elegant interface. With frosted glass panels, smooth 3D card flips, and satisfying visual feedback for matches and errors, it elevates a classic game into a modern web experience.

## ✨ Features

*   **⚡ Robust Game Engine:** Handles card shuffling, flip states, match validation, and error timeouts flawlessly.
*   **👁️ Dreamy Glassmorphism Workspace:** A beautifully engineered interface featuring frosted glass (`backdrop-blur`), translucent borders, and a dynamic gradient background.
*   **🎴 3D Card Physics:** Every card flip is powered by Framer Motion's spring physics and CSS 3D transforms for a realistic feel.
*   **🚦 Visual Feedback:** Cards glow green on a successful match and flash red before flipping back on an error.
*   **📊 Move Tracking & Celebration:** Tracks your efficiency and rewards a completed board with a confetti explosion.

## 🛠️ Tech Stack

*   **Frontend Framework:** React 19 + Vite
*   **Styling:** Tailwind CSS 4 (Custom Glassmorphism implementation)
*   **Animations:** Framer Motion (`motion/react`)
*   **Icons:** Lucide React
*   **Celebration:** Canvas-confetti

## 🚀 Getting Started

Running Emoji Match locally is incredibly simple. No backend required!

### 1. Clone the Repository
```bash
git clone https://github.com/Barrsum/Emoji-Memory-Game.git
cd Emoji-Memory-Game
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App
```bash
npm run dev
```
The app will launch locally on `http://localhost:3000`. 

## 🛡️ Architecture Insights

*   **State Machine:** The game uses a strict state flow to prevent race conditions. When two cards are flipped, the board locks (`isLocked` state) until the match is validated or the error timeout completes.
*   **3D CSS Integration:** Custom Tailwind utilities (`perspective-1000`, `preserve-3d`, `backface-hidden`) are injected via `index.css` to work seamlessly with Framer Motion's `rotateY` animations.

## 👤 Author

**Ram Bapat**
*   [LinkedIn](https://www.linkedin.com/in/ram-bapat-barrsum-diamos)
*   [GitHub](https://github.com/Barrsum)

---
*Part of the April 2026 Vibe Coding Challenge.*
