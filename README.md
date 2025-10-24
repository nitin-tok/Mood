# Quantum Works

A modern React website with GSAP animations built with Vite.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **GSAP 3** - Professional-grade animation library with ScrollTrigger
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS 3** - Utility-first CSS framework
- **React Router 6** - Client-side routing
- **React Three Fiber** - 3D graphics ready
- **Radix UI** - Accessible UI components (Toast, Tooltip)

## 📦 Project Structure

```
quantum-works/
├── src/             # React application source
│   ├── App.tsx      # Main app component with routing
│   ├── pages/       # Page components
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions
│   └── global.css   # Global styles & Tailwind
├── public/          # Static assets
├── index.html       # HTML entry point
└── vite.config.ts   # Vite configuration
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Install Dependencies

```bash
pnpm install
```

### Start Development Server

```bash
pnpm dev
```

Visit [http://localhost:8080](http://localhost:8080)

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Other Commands

```bash
pnpm typecheck  # Run TypeScript type checking
pnpm test       # Run tests
pnpm format.fix # Format code with Prettier
```

## ✨ Features

### GSAP Animations

The project uses GSAP with ScrollTrigger for smooth, performant animations:

- **Hero Section**: Entrance animations with staggered timing
- **Services Cards**: Scroll-triggered staggered reveals
- **Work Gallery**: Animated grid items
- **Contact Form**: Smooth entrance animations
- **Scroll Effects**: Video overlay fade on scroll

### Responsive Design

- Mobile-first approach with TailwindCSS
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

### Performance

- Code splitting with React Router
- Optimized animations with GSAP
- Fast builds with Vite
- SWC for ultra-fast TypeScript compilation

## 📝 License

Private project

## 🔧 Configuration

- **Vite**: See `vite.config.ts`
- **TypeScript**: See `tsconfig.json`
- **Tailwind**: See `tailwind.config.ts`
- **PostCSS**: See `postcss.config.js`
