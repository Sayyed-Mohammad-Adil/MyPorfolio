# 🚀 Sayyed Mohammad Adil — Full Stack Developer Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-www.sayyedmohammadadil.online-00f5c4?style=for-the-badge&logo=googlechrome&logoColor=black)](https://www.sayyedmohammadadil.online/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**A high-performance, immersive developer portfolio featuring interactive 3D graphics, TrueColor ASCII profile rendering, animated contribution games, and responsive cross-device architecture.**

[Explore Live Demo](https://www.sayyedmohammadadil.online/) · [Report Bug](https://github.com/Sayyed-Mohammad-Adil/MyPorfolio/issues) · [Request Feature](https://github.com/Sayyed-Mohammad-Adil/MyPorfolio/issues)

</div>

---

## 🌟 Highlights & Key Features

### 🖥️ Interactive 3D Developer Workspace
- Powered by **Three.js**, **@react-three/fiber**, and **@react-three/drei**.
- Features an interactive desk setup with monitor screens, ambient neon lighting, floating particle effects, and touch-optimized orbit controls.

### 👾 TrueColor ASCII Profile Modal
- **Dynamic ASCII Art Profile**: High-fidelity TrueColor ASCII portrait with typing/slow-print animation.
- **Dedicated Theme Toggle**: Dedicated Light and Dark mode options tailored specifically for terminal ASCII visibility.
- **Adaptive Layout**: Zero-scroll dashboard design for desktop with smooth touch scrolling on mobile.
- Quick access to bio, core stats, social links, and CV download.

### 🐍 Snake Contribution Activity Grid
- Custom GitHub-inspired activity matrix.
- Interactive animated snake that slithers through commits to spell **"CODING"**.
- Automatically transforms backward into a sparkling **Winner's Trophy** with theme-matching particle physics.
- Responsive horizontal swipe support for mobile and touch devices.

### 💼 Featured Projects Showcase
- **[MSQE (Message Queue Engine)](http://msqe.org/)**: A lightweight, partition-based distributed message queue engine with wildcard routing, QoS guarantees, and zero external infrastructure ([npm client](https://www.npmjs.com/package/msqe-client) | [GitHub](https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise)).
- **[Priortiq](https://prioritiq.vercel.app/)**: Real-time collaborative task management platform built with React, Node.js, and MongoDB ([GitHub](https://github.com/Sayyed-Mohammad-Adil/Prioritiq)).
- **[EliteSell](https://elitesell.vercel.app/)**: Scalable modern e-commerce platform built with Next.js, Node.js, Stripe, and TailwindCSS ([GitHub](https://github.com/Sayyed-Mohammad-Adil/EliteSell)).

### ⚡ Seamless Responsiveness & Micro-Interactions
- Built mobile-first across all viewport breakpoints (mobile 320px–430px, tablet 768px–834px, desktop 1024px+).
- Frosted glassmorphism mobile navigation drawer with active section highlights.
- Smooth scrolling with header offset compensation across all navigation actions.
- Tech stack infinite marquee powered by `react-fast-marquee`.
- Blog reader modal with full article inspection.
- Interactive contact form with real-time feedback popup alerts.

---

## 🛠️ Tech Stack & Libraries

| Category | Technologies & Tools |
| :--- | :--- |
| **Core** | React 19, TypeScript, Vite 7 |
| **3D & Canvas** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Styling & UI** | Tailwind CSS, Lucide React, React Icons |
| **Animations** | Framer Motion, GSAP, `@gsap/react` |
| **Components** | `react-fast-marquee`, `recharts`, `react-helmet-async` |
| **Analytics & Perf** | `@vercel/speed-insights` |

---

## 📁 Project Structure

```bash
MyPorfolio/
├── public/
│   ├── images/
│   │   ├── projects/          # High-res project previews (MSQE, Priortiq, EliteSell)
│   │   └── ...
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── About.tsx          # Bio, experience & stats grid
│   │   ├── AsciiProfileModal.tsx # TrueColor ASCII terminal popup
│   │   ├── BackToTop.tsx      # Smooth return-to-top floating button
│   │   ├── Blog.tsx           # Technical writings & reader modal
│   │   ├── Contact.tsx        # Contact form & social connections
│   │   ├── ContributionGrid.tsx # Snake contribution matrix & trophy
│   │   ├── CTA.tsx            # Call to action & collaboration section
│   │   ├── Footer.tsx         # Quick links & newsletter
│   │   ├── Header.tsx         # Navbar with mobile drawer & theme switcher
│   │   ├── Hero.tsx           # Hero intro & quick action triggers
│   │   ├── LoadingScreen.tsx  # Cyberpunk loader & progress animation
│   │   ├── Projects.tsx       # Portfolio projects card grid
│   │   ├── TechStack.tsx      # Infinite scrolling tech marquee
│   │   ├── Testimonials.tsx   # Peer reviews & recommendations
│   │   └── WorkspaceIllustration.tsx # Three.js 3D canvas workstation
│   ├── App.tsx                # Main layout composition
│   ├── index.css              # Custom Tailwind utilities & design tokens
│   └── main.tsx               # App entrypoint
├── index.html                 # HTML shell with meta tags & viewport config
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sayyed-Mohammad-Adil/MyPorfolio.git
   cd MyPorfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🤝 Connect & Feedback

- **Website**: [sayyedmohammadadil.online](https://www.sayyedmohammadadil.online/)
- **GitHub**: [@Sayyed-Mohammad-Adil](https://github.com/Sayyed-Mohammad-Adil)
- **LinkedIn**: [Sayyed Mohammad Adil](https://www.linkedin.com/in/sayyed-mohammad-adil/)
- **Email**: [aadil.connect@gmail.com](mailto:aadil.connect@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
