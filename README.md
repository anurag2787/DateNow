<div align="center">

# 💕 DateNow

## *Find Your Perfect Match with AI-Powered Intelligence*

[![Stars](https://img.shields.io/github/stars/anurag2787/DateNow?style=for-the-badge&logo=github&color=yellow)](https://github.com/anurag2787/DateNow/stargazers)
[![Forks](https://img.shields.io/github/forks/anurag2787/DateNow?style=for-the-badge&logo=github&color=blue)](https://github.com/anurag2787/DateNow/network/members)
[![Issues](https://img.shields.io/github/issues/anurag2787/DateNow?style=for-the-badge&logo=github&color=red)](https://github.com/anurag2787/DateNow/issues)
[![PRs](https://img.shields.io/github/issues-pr/anurag2787/DateNow?style=for-the-badge&logo=github&color=green)](https://github.com/anurag2787/DateNow/pulls)
[![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)](LICENSE)

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

---

</div>

## 🎯 About

**DateNow** is a cutting-edge dating platform that combines modern web technologies with artificial intelligence to create meaningful connections. Built with React 18 and powered by Google Gemini AI, it delivers an intelligent, real-time matchmaking experience.

> 💡 **Frontend Repository** — Backend available at [DateNow-Backend](https://github.com/yourusername/DateNow-Backend)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI-Powered
- Smart matchmaking algorithm
- Intelligent chat assistance
- Personalized recommendations

</td>
<td width="50%">

### ⚡ Real-Time
- Instant messaging with Socket.io
- Live notifications
- Real-time updates

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Secure
- Firebase Authentication
- Protected routes
- Data encryption

</td>
<td width="50%">

### 🎨 Modern UI
- Responsive design
- Smooth animations (GSAP)
- Dark mode support

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

</div>

**Frontend:** React 18, Vite, TailwindCSS, DaisyUI  
**Backend Integration:** Socket.io, Axios  
**Authentication:** Firebase Auth  
**AI:** Google Gemini API  
**Animation:** GSAP  
**Email:** EmailJS  
**Icons:** Lucide React

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 16.x
npm or yarn
Git
```

### Installation

1️⃣ **Clone the repository**

```bash
git clone https://github.com/anurag2787/DateNow.git
cd DateNow
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Configure environment**

```bash
cp .env.example .env
```

4️⃣ **Add your credentials** (see [Environment Setup](#-environment-setup))

5️⃣ **Start development server**

```bash
npm run dev
```

🎉 Open [http://localhost:5173](http://localhost:5173) in your browser!

---

## ⚙️ Environment Setup

### 🔥 Firebase Configuration

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Navigate to Project Settings → Add Web App
4. Copy credentials to `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 🤖 Google Gemini API

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Generate API key
3. Add to `.env`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 🌐 Backend Configuration

**Option A: Hosted Backend (Recommended)**

```env
VITE_BACKEND_URL=https://datenow-backend.onrender.com
```

> ⏱️ First request may take 1-2 minutes (cold start)

**Option B: Local Development**

```env
VITE_BACKEND_URL=http://localhost:9000
```

Clone and run [DateNow-Backend](https://github.com/yourusername/DateNow-Backend)

---

## 📁 Project Structure

```
DateNow/
├── 📂 public/              # Static assets
├── 📂 src/
│   ├── 📂 assets/          # Images, icons, media
│   ├── 📂 components/      # Reusable React components
│   │   ├── Auth/
│   │   ├── Chat/
│   │   ├── Profile/
│   │   └── UI/
│   ├── 📂 context/         # React Context (Auth, Theme)
│   ├── 📂 hooks/           # Custom React hooks
│   ├── 📂 services/        # API services
│   ├── 📂 utils/           # Helper functions
│   ├── App.jsx
│   ├── Layout.jsx
│   └── main.jsx
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🐛 Troubleshooting

<details>
<summary><b>🔌 Backend Connection Issues</b></summary>

- Wait 1-2 minutes for cold start on Render
- Verify `VITE_BACKEND_URL` in `.env`
- Check backend status: <https://datenow-backend.onrender.com>
- For local dev, ensure backend runs on port 9000

</details>

<details>
<summary><b>🔐 Firebase Authentication Errors</b></summary>

- Double-check all `.env` Firebase variables
- Enable sign-in methods in Firebase Console
- Add `localhost:5173` to authorized domains
- Clear browser cache and retry

</details>

<details>
<summary><b>🤖 Gemini API Issues</b></summary>

- Verify API key is active
- Check API quota in Google AI Studio
- Ensure proper environment variable naming

</details>

<details>
<summary><b>💬 Socket.io Not Connecting</b></summary>

- Confirm backend URL is correct
- Check for CORS configuration
- Verify backend is running
- Inspect browser console for errors

</details>

---

## 📖 Documentation

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Key Components

- **AuthContext**: Manages authentication state
- **ChatComponent**: Real-time messaging interface
- **ProfileCard**: User profile display
- **MatchCard**: Swipeable match cards

### API Integration

```javascript
// Example: Gemini AI integration
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### Quick Contribution Guide

1. 🍴 Fork the repository
2. 🌿 Create your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. 💻 Make your changes
4. ✅ Commit with clear messages
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. 📤 Push to your fork
   ```bash
   git push origin feature/amazing-feature
   ```
6. 🎉 Open a Pull Request

### Contribution Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages ([Conventional Commits](https://www.conventionalcommits.org/))
- Test thoroughly before submitting
- Update documentation as needed
- Be respectful and constructive

---

## 👥 Contributors

A huge thank you to all our amazing contributors! 🎉

<div align="center">

<a href="https://github.com/anurag2787/DateNow/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=anurag2787/DateNow" alt="Contributors" />
</a>

</div>

### Core Team

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/anurag2787">
        <img src="https://avatars.githubusercontent.com/anurag2787?v=4" width="100px;" alt="Anurag Yadav"/>
        <br />
        <sub><b>Anurag Yadav</b></sub>
        <br />
        <sub>Lead Developer</sub>
      </a>
    </td>
  </tr>
</table>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Special thanks to:

- [Firebase](https://firebase.google.com/) - Authentication & hosting
- [Google Gemini](https://ai.google.dev/) - AI capabilities
- [React Team](https://react.dev/) - Amazing framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Socket.io](https://socket.io/) - Real-time engine
- All our contributors and supporters! ❤️

---

<div align="center">

### 💕 Made with love by the DateNow Team

**[⬆ Back to Top](#-datenow)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anurag2787/DateNow)

**Star ⭐ this repo if you find it helpful!**

</div>
