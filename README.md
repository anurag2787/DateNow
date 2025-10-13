<!-- GSSoC banner and project insights -->

<h1 align="center">
  <br>
  DATENOW
</h1>
**📊 Project Insights**

<table align="center">
    <thead align="center">
        <tr>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Closed PRs</b></td>
            <td><b>🛠️ Languages</b></td>
            <td><b>👥 Contributors</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/anurag2787/DateNow?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/anurag2787/DateNow?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/anurag2787/DateNow?style=flat&logo=github"/></td>
            <td><img alt="Open PRs" src="https://img.shields.io/github/issues-pr/anurag2787/DateNow?style=flat&logo=github"/></td>
            <td><img alt="Closed PRs" src="https://img.shields.io/github/issues-pr-closed/anurag2787/DateNow?style=flat&color=critical&logo=github"/></td>
            <td><img alt="Languages Count" src="https://img.shields.io/github/languages/count/anurag2787/DateNow?style=flat&color=green&logo=github"></td>
            <td><img alt="Contributors Count" src="https://img.shields.io/github/contributors/anurag2787/DateNow?style=flat&color=blue&logo=github"/></td>
        </tr>
    </tbody>
</table>


# DateNow - Frontend 💕  
A modern dating app built with **React**, **Firebase**, and **Google Gemini AI**. Find your perfect match and chat intelligently.

> **Note:** This is the frontend repository. The backend lives [here](https://github.com/yourusername/DateNow-Backend). Run both for full functionality.

---

## 🌟 Features

- 🤖 AI-Powered Chat using Google Gemini
- 💬 Real-time Messaging via Socket.io
- 🔐 Firebase Authentication
- 🎨 Beautiful, Responsive UI (Tailwind CSS + DaisyUI)
- ❤️ Matchmaking Algorithm
- 📧 Email Integration with EmailJS
- 🧑‍💼 User Profile Management

---

## 🛠️ Tech Stack

**React 18**, Tailwind CSS, DaisyUI, Firebase Auth, Google Gemini API, Socket.io, React Router, Vite, Lucide React, GSAP, EmailJS

---

## 📋 Prerequisites

- Node.js (v16+)
- npm / yarn
- Git

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/DateNow-Frontend.git
cd DateNow-Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env
```

Fill in your `.env` file using the guide below.

### 4. Backend Options

**Option 1: Hosted Backend (Recommended)**

```env
VITE_BACKEND_URL=https://datenow-backend.onrender.com
```

> May take ~1–2 mins to start if inactive.

**Option 2: Local Backend**

```env
VITE_BACKEND_URL=http://localhost:9000
```

Follow setup from: [DateNow-Backend](https://github.com/yourusername/DateNow-Backend)

### 5. Start Development Server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🔧 Environment Variables

```env
# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key

# Backend
VITE_BACKEND_URL=https://datenow-backend.onrender.com
```

---

## 🔑 API Setup

### Firebase

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create/select a project
3. Enable Authentication → Add sign-in methods
4. Add a web app and copy config to `.env`

### Google Gemini API

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key
3. Add it to `.env` as `VITE_GEMINI_API_KEY`

---

## 📁 Project Structure

```
DateNow/
├── public/
├── src/
│   ├── assets/         # Static media
│   ├── components/     # UI components
│   ├── context/        # AuthContext
│   ├── App.jsx
│   ├── auth.js
│   ├── Layout.jsx
│   └── main.jsx
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## 🐛 Troubleshooting

**Backend Not Connecting?**

* Wait 1–2 mins (cold start)
* Check `VITE_BACKEND_URL`
* Local: Ensure it's running on port `9000`

**Firebase Auth Errors?**

* Verify `.env` values
* Check Firebase → Authentication → Sign-in methods
* Add localhost to authorized domains

**API Issues?**

* Validate Gemini and Backend URLs in `.env`
* Check internet / CORS settings

🔗 **Check Backend Status**
[https://datenow-backend.onrender.com](https://datenow-backend.onrender.com)

---

## 🤝 Contributing

1. Fork this repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Added feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request 🚀

**Guidelines**

* Follow code style
* Write clear commit messages
* Test thoroughly
* Keep docs updated

---

## 📄 License

MIT License — see the [LICENSE](LICENSE) file.

---

## 👥 Team

**Lead Developer**: [Anurag Yadav](https://github.com/yourusername)

---

## Contributors ✨

Thanks go to these wonderful people who have contributed to this project:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/anurag2787">
        <img src="https://avatars.githubusercontent.com/anurag2787?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>anurag2787</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Rishav-Bagri">
        <img src="https://avatars.githubusercontent.com/Rishav-Bagri?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>Rishav-Bagri</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/asim770">
        <img src="https://avatars.githubusercontent.com/asim770?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>asim770</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/lokesh0921">
        <img src="https://avatars.githubusercontent.com/lokesh0921?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>lokesh0921</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/arishaix">
        <img src="https://avatars.githubusercontent.com/arishaix?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>arishaix</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/DivyaJain-DataAnalyst">
        <img src="https://avatars.githubusercontent.com/DivyaJain-DataAnalyst?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>DivyaJain-DataAnalyst</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Sameeralam9">
        <img src="https://avatars.githubusercontent.com/Sameeralam9?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>Sameeralam9</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Copilot">
        <img src="https://avatars.githubusercontent.com/Copilot?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>Copilot</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/DivyaJain09">
        <img src="https://avatars.githubusercontent.com/DivyaJain09?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>DivyaJain09</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/AadityaHande">
        <img src="https://avatars.githubusercontent.com/AadityaHande?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>AadityaHande</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/khushthecoder">
        <img src="https://avatars.githubusercontent.com/khushthecoder?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>khushthecoder</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/itspavant">
        <img src="https://avatars.githubusercontent.com/itspavant?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>itspavant</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/FMagueijo">
        <img src="https://avatars.githubusercontent.com/FMagueijo?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>FMagueijo</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/dependabot[bot]">
        <img src="https://avatars.githubusercontent.com/dependabot[bot]?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>dependabot[bot]</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/coding-mrinal">
        <img src="https://avatars.githubusercontent.com/coding-mrinal?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>coding-mrinal</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/Chandan-U2003">
        <img src="https://avatars.githubusercontent.com/Chandan-U2003?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>Chandan-U2003</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/vachan-maker">
        <img src="https://avatars.githubusercontent.com/vachan-maker?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>vachan-maker</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/BUSHAAN">
        <img src="https://avatars.githubusercontent.com/BUSHAAN?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>BUSHAAN</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/swetak0911">
        <img src="https://avatars.githubusercontent.com/swetak0911?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>swetak0911</b></sub>
      </a>
    </td>
    <td colspan="2"></td>
  </tr>
</table>

---

## 🙏 Acknowledgments

* Firebase
* Google Gemini AI
* React + Open Source Libraries
* All contributors ❤️

---

**Made with ❤️ by the DateNow team**
