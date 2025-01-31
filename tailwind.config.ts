import { padding } from "@mui/system";

/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',   // Tailwind default for small screens (sm)
        md: '768px',   // Medium screens (md) for tablets and smaller desktops
        lg: '1024px',  // Large screens (lg) for laptops and desktops
        xl: '1280px',  // Extra-large screens (xl) for large desktop views
      },
      colors: {
        'custom-blue-right': '#6054FF',
        'custom-blue-left': '#459AFF',
        'letter-theme-clr':'#334155',
        'text-theme':'#53565a',
        'node-active':'#ffffff',
        'drag-border':'#d1d5db',
        'drag-text':'#6b7280',
        'divider':'#e5e7eb',
        'msg-icons':'rgb(15 171 73)',
        'highlight-clr':'#FF1493',
        'group-icon':'#800080',
        'delete-icon':'#c51f1f',
        'error':'#ff065e',
        'close-btn-h':'#9c0909',
        'op-handil': 'rgb(23 196 220)'
      },
      fontSize: {
        'xxxs':'0.5rem', //8px
        'xxm':'0.625rem', //10px
        'xxs': '.6875rem', //11px
        'xs': '.75rem', // 12px
        'sm': '.875rem', // 14px
        'base': '1rem', // 16px
        'lg': '1.125rem', // 18px
        'xl': '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '4rem', // 64px
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
      padding: {
        '2px': '2px',
      }
    },
  },
  plugins: [],
};

