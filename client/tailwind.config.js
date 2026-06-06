module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // indigo-600
          light: '#6366f1',
          fade: '#eef2ff',
        },
        accent: {
          DEFAULT: '#06b6d4', // cyan-500
          light: '#7dd3fc',
        },
        neutral: {
          50: '#fafafa',
          100: '#f3f4f6',
          500: '#6b7280',
        },
        success: '#10b981',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        subtle: '0 6px 18px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
}
