/** @type {import('tailwindcss').Config} */
export default {
  // darkMode removed, only light theme
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NeuralHealer brand palette
        primary: '#A36BAD',          // Soft lavender-purple
        secondary: '#7E57C2',        // Deep violet (buttons/highlights)
        accent: '#D1A9E0',           // Light pastel purple (hovers/cards)
        background: '#F7F4FA',       // Light background
        backgroundDark: '#1C1A2B',   // Dark background (for future use)
        textPrimary: '#2E1A47',      // Headings
        textSecondary: '#6B5B95',    // Paragraph text
        lightText: '#E5D9F2',        // On dark backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
