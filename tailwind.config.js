/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#2196F3",
        background: "#F9FAFB",
        card: "#FFFFFF",
        border: "#E5E7EB",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
        success: "#22C55E",
        error: "#EF4444",
        warning: "#F59E0B",
      },
    },
  },
  plugins: [],
}

