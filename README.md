# CheckMyResume

<div align="center">
  <div>
    <img alt="React" src="https://img.shields.io/badge/React-4c84f3?style=for-the-badge&logo=react&logoColor=white">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/-Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" />
    <img alt="Puter.js" src="https://img.shields.io/badge/Puter.js-181758?style=for-the-badge&logoColor=white">
    <img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  </div>

  <h3 align="center">AI-Powered Resume Analysis Platform</h3>

  <p align="center">
    Get intelligent insights for your ideal career with AI-driven resume analysis, ATS scoring, and actionable feedback.
  </p>
</div>

---

## 📋 Table of Contents

1. [✨ Introduction](#-introduction)
2. [⚙️ Tech Stack](#️-tech-stack)
3. [🔋 Features](#-features)
4. [🚀 Getting Started](#-getting-started)
5. [🌐 Deployment](#-deployment)
6. [🔐 Authentication Setup](#-authentication-setup)
7. [📁 Project Structure](#-project-structure)
8. [🛠️ Development](#️-development)

---

## ✨ Introduction

**CheckMyResume** is an AI-powered resume analyzer that helps job seekers optimize their resumes for specific positions. Built with modern web technologies, it provides:

- **ATS Score Analysis**: Get compatibility scores for Applicant Tracking Systems
- **AI-Powered Feedback**: Receive detailed suggestions on content, tone, structure, and skills
- **Resume Management**: Upload, store, and track multiple resume versions
- **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing

This application leverages **Puter.js** for serverless backend services (authentication, file storage, AI processing), eliminating the need for traditional backend infrastructure.

---

## ⚙️ Tech Stack

### Frontend
- **[React 19](https://react.dev/)** - Modern UI library with hooks and concurrent features
- **[React Router v7](https://reactrouter.com/)** - File-based routing with SSR support
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vite 6](https://vite.dev/)** - Lightning-fast build tool and dev server

### Backend Services (Serverless via Puter.js)
- **[Puter.js](https://docs.puter.com/)** - Complete serverless backend SDK
  - Authentication (OAuth-style login)
  - File Storage (resume uploads)
  - Key-Value Store (resume metadata)
  - AI Services (resume analysis via GPT/Claude)

### Additional Libraries
- **[pdfjs-dist](https://mozilla.github.io/pdf.js/)** - PDF rendering and conversion
- **[react-dropzone](https://react-dropzone.js.org/)** - Drag-and-drop file uploads
- **[zustand](https://github.com/pmndrs/zustand)** - Minimal state management

---

## 🔋 Features

✅ **Browser-Based Authentication** - Sign in with Puter (no backend required)  
✅ **Resume Upload & Storage** - Securely store resumes with automatic PDF-to-image conversion  
✅ **AI Resume Analysis** - Get ATS scores and detailed feedback on:
  - Content quality and relevance
  - Tone and professionalism
  - Structure and formatting
  - Skills alignment with job requirements
  
✅ **Dark Mode Toggle** - Switch between light and dark themes  
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile  
✅ **Resume History** - Track all your analyzed resumes in one dashboard  
✅ **Job-Specific Feedback** - Tailor analysis to specific company and role  

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18 or higher)
- **[npm](https://www.npmjs.com/)** or **[yarn](https://yarnpkg.com/)**
- **[Git](https://git-scm.com/)**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/utkarsh7m/CheckMyResume.git
   cd CheckMyResume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run typecheck    # Run TypeScript type checking
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

Vercel provides the best support for React Router v7 + Vite projects.

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **"New Project"**
   - Import your `CheckMyResume` repository
   - Vercel will auto-detect settings (no configuration needed)
   - Click **"Deploy"**

3. **Done!** Your app will be live at `https://your-project.vercel.app`

### Alternative: Deploy to Netlify

```bash
npm run build
# Upload the 'build' folder to Netlify
```

---

## 🔐 Authentication Setup

This application uses **Puter.js** for authentication. No API keys or environment variables are required!

### For Users

1. **First-time users**: Click "Log In" on the authentication page
2. **Puter Sign-In**: A Puter.com login window will open
3. **Create Account**: If you don't have a Puter account, it will be created automatically
4. **Grant Permissions**: Allow the app to access your Puter storage
5. **Done!** You'll be redirected to the dashboard

### How It Works

- **Client-side only**: All authentication happens in the browser
- **No passwords stored**: Puter handles all credential management
- **Secure by default**: OAuth-style authentication flow
- **Cross-device sync**: Access your resumes from any device

### Important Notes

⚠️ **AI Service Limits**: Puter's free tier has usage limits for AI analysis. If you encounter a "Permission denied" error, you may have reached the free tier limit. Consider:
- Upgrading your Puter account at [puter.com](https://puter.com)
- Using the app with fewer AI analyses
- Waiting for the quota to reset

---

## 📁 Project Structure

```
CheckMyResume/
├── app/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Navigation with dark mode toggle
│   │   ├── FileUploader.tsx # Drag-and-drop resume upload
│   │   ├── ResumeCard.tsx  # Resume preview card
│   │   ├── ScoreCircle.tsx # Circular progress indicator
│   │   └── ...
│   ├── routes/            # Page routes
│   │   ├── home.tsx       # Dashboard with resume list
│   │   ├── upload.tsx     # Upload and analyze page
│   │   ├── resume.tsx     # Detailed resume feedback
│   │   └── auth.tsx       # Authentication page
│   ├── lib/               # Utilities
│   │   ├── puter.ts       # Puter.js SDK integration
│   │   ├── pdf2img.ts     # PDF to image conversion
│   │   └── utils.ts       # Helper functions
│   ├── app.css            # Global styles and theme
│   └── root.tsx           # App root component
├── constants/
│   └── index.ts           # Mock data and AI prompts
├── public/
│   ├── images/            # Static images
│   ├── icons/             # SVG icons
│   └── pdf.worker.min.mjs # PDF.js worker
├── types/
│   └── index.d.ts         # TypeScript type definitions
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Development

### Key Technologies Explained

**React Router v7**
- File-based routing (routes are defined in `app/routes/`)
- Built-in data loading and error boundaries
- SSR-ready for production deployments

**Puter.js Integration**
- `usePuterStore()` hook provides access to all services
- `auth.signIn()` - Trigger authentication
- `fs.upload()` - Upload files to cloud storage
- `kv.set()` / `kv.get()` - Store/retrieve metadata
- `ai.feedback()` - Get AI analysis of resumes

**Dark Mode Implementation**
- Toggled via state in `home.tsx`
- CSS class `dark-mode` applied to `<html>` element
- All colors defined in `app.css` with dark mode variants

### Common Development Tasks

**Adding a new route:**
1. Create file in `app/routes/` (e.g., `settings.tsx`)
2. Export default component and optional `meta` function
3. Route automatically available at `/settings`

**Styling components:**
- Use Tailwind utility classes for most styling
- Define custom classes in `app.css` using `@layer components`
- Support dark mode with `html.dark-mode` selectors

**Handling errors:**
- Use try/catch blocks with `withTimeout` wrapper
- Display errors via `setStatusText` state
- Check browser console for detailed error logs

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

**Utkarsh Mishra**  
GitHub: [@utkarsh7m](https://github.com/utkarsh7m)  
Project Link: [https://github.com/utkarsh7m/CheckMyResume](https://github.com/utkarsh7m/CheckMyResume)

---

<div align="center">
  Made with ❤️ using React, TypeScript, and Puter.js
</div>
