# azambmusa.my — Retro Technical Portfolio

> A high-performance, retro technical personal portfolio featuring an interactive 3D Macintosh 128k workstation, CRT viewfinders, and blueprint design system.

[![Website](https://img.shields.io/badge/Live_Demo-azambmusa.my-0D0D0D?style=for-the-badge&logo=googlechrome&logoColor=white)](https://azambmusa.my)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🖥️ Overview

This portfolio showcases the software engineering projects, academic credentials, and technical background of **Muhammad Azamuddin bin Musa** (`@ZamLeu`). Designed with a brutalist retro blueprint & ink aesthetic inspired by 1980s personal computing hardware and technical schematics.

### ✨ Key Features

- **Interactive 3D Macintosh 128k Workstation**:
  - Built with procedural Three.js geometries (`RoundedBoxGeometry` chamfers + 2px ink contours).
  - Real-time interactive CRT monitor canvas that boots sections on click.
  - Orbit drag controls and dive-in camera transition when launching modules.
  - 2D Blueprint graph paper backdrop (`24×24` grid, optical alignment reticle, and corner crosshairs).
- **Operator CRT Viewfinder**:
  - Live feed style 16:9 personnel dossier with scanline overlays, corner brackets, recording indicator `[REC ●]`, and hover grayscale-to-color transition.
- **Computer Environment (Desktop OS)**:
  - Full-screen retro OS interface with movable draggable windows, system diagnostic stats, project previewers, and terminal modules.
- **Zero-Waste GPU Performance**:
  - Three.js animation loops automatically pause via `IntersectionObserver` when scrolled out of viewport to preserve mobile battery and system resources.
- **High-Contrast Monochrome & Amber Accent**:
  - Architectural blueprint monochrome palette (`#0D0D0D` / `#F4F4F2`) with 5% vintage amber phosphor accent (`#D97706` / `#F59E0B`).
  - Native Day / Night theme switching.

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ZamLeu/azambmusa.git
   cd azambmusa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   Generates optimized static assets inside the `dist/` folder.

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```text
azambmusa/
├── public/                 # Static assets (images, icons, favicons)
│   ├── azam.jpeg           # 16:9 Operator live feed avatar
│   ├── link1t.png          # Link1t project preview
│   └── touchbytiha.png     # TouchByTiha project preview
├── src/
│   ├── components/         # Core UI components
│   │   ├── canvas/         # Three.js 3D workstation & shaders
│   │   │   └── RetroTerminal3D.ts
│   │   ├── RetroHero.tsx   # Hero section & 3D workstation mount
│   │   ├── RetroNavbar.tsx # Top architectural navigation bar
│   │   ├── RetroProjects.tsx
│   │   ├── RetroProjectPreview.tsx
│   │   ├── RetroContact.tsx
│   │   ├── RetroFooter.tsx
│   │   └── ...
│   ├── data/
│   │   └── portfolioData.ts # Centralized portfolio content & metadata
│   ├── index.css           # Global typography, scanline keyframes & theme styles
│   ├── App.tsx             # Root layout & OS state management
│   └── main.tsx            # Application entrypoint
├── index.html              # HTML shell & font imports
├── tailwind.config.js      # Custom theme colors & fonts
└── package.json            # Scripts & project dependencies
```

---

## 👤 Author

**Muhammad Azamuddin bin Musa**
- **Website**: [azambmusa.my](https://azambmusa.my)
- **GitHub**: [@ZamLeu](https://github.com/ZamLeu)
- **Email**: [azambmusa@gmail.com](mailto:azambmusa@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
