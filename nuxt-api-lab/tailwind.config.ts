import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,ts}',
    './components/**/*.{vue,ts}',
    './layouts/**/*.{vue,ts}',
    './pages/**/*.{vue,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8'
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8fafc',
          dark: '#0f172a'
        },
        text: {
          primary: '#0f172a',
          secondary: '#475569',
          inverted: '#f8fafc'
        },
        danger: '#dc2626'
      },

      // Radius
      borderRadius: {
        app: '0.75rem',
        card: '1rem'
      },

      // Spacing
      spacing: {
        18: '4.5rem',
        22: '5.5rem'
      },

      // Typography
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }]
      },

      // Shadow
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.08)',
        soft: '0 2px 8px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: []
}
