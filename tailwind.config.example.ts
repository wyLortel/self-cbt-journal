/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: '#4F46E5',
        'primary-hover': '#4338CA',
        'primary-light': '#EEF2FF',

        // Semantic
        background: '#F8F7F4',
        surface: '#FFFFFF',
        border: '#E5E7EB',

        // Text
        'text-primary': '#111827',
        'text-secondary': '#4B5563',
        'text-muted': '#9CA3AF',

        // Status
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#EF4444',
        'error-light': '#FEF2F2',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Custom spacing if needed
      },
      borderRadius: {
        sm: '0.5rem',    // rounded-lg
        md: '0.75rem',   // rounded-xl
        lg: '1rem',      // rounded-2xl
        xl: '1.5rem',    // rounded-3xl
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // 필요시 비활성화
  },
}
