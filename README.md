# Personal Portfolio ✨

A modern, fast, and interactive personal portfolio built with React, Vite, and Tailwind CSS. Showcases projects, skills, and experience with a polished UI featuring beautiful animations, ambient backgrounds, and a seamless developer experience.

## 🌟 Features

- **Modern Tech Stack:** React 18 + Vite for rapid development and optimized builds.
- **Type-safe:** 100% written in TypeScript for robust and maintainable code.
- **Sleek Design:** Styled with Tailwind CSS and pre-built components from [shadcn/ui](https://ui.shadcn.com/).
- **Smooth Animations:** Powered by Framer Motion for scroll effects, page transitions, and interactive elements.
- **Dark Mode Ready:** Seamless theme switching integration with `next-themes`.
- **Responsive Layout:** Looks perfect on all devices, from desktop wide-screens to mobile phones.
- **Interactive UI Components:**
  - Ambient Animated Backgrounds
  - Splash Screen
  - Scroll Progress Indicators
  - Project Showcases and Skill Bars
  - Contact Forms with Validation (`react-hook-form` + `zod`)

## 💻 Tech Stack

- **Framework:** [React 18](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) & [Radix Primitives](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **State Management:** [React Query](https://tanstack.com/query/latest)
- **Testing:** [Vitest](https://vitest.dev/) & React Testing Library

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine (`v18` or later is recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thanhnamle/Portfolio-V1.git
   cd Portfolio-V1
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080` to see the portfolio live.

## 📂 Project Structure

```text
my-portfolio/
├── public/               # Static assets (images, fonts)
├── src/
│   ├── assets/           # Project specific assets
│   ├── components/       # Reusable React components (UI, layout, sections)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configurations
│   ├── pages/            # Page components
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── package.json          # Project dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the app for production.
- `npm run build:dev` - Builds the app for development environment.
- `npm run preview` - Locally preview the production build.
- `npm run test` - Runs Vitest tests.
- `npm run lint` - Lints the codebase using ESLint.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check out the [issues page](https://github.com/yourusername/my-portfolio/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Designed and developed by [Your Name](https://github.com/yourusername).*
