/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        text: "var(--text)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        teal: "var(--teal)",
        steel: "var(--steel)",
        danger: "var(--danger)",
        success: "var(--success)",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
