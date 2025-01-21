import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,jsx,ts,tsx,html}' // Include your paths
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'alice-blue': '#D1E0E5ff',
  			'alice-blue-2': '#DFE5ECff',
  			'light-blue': '#C0DDDDff',
  			'pomp-and-power': '#746D9Bff',
  			silver: '#C0C5C4ff',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		backgroundImage: {
  			'gradient-top': 'linear-gradient(0deg, #D1E0E5ff, #DFE5ECff, #C0DDDDff, #746D9Bff, #C0C5C4ff)',
  			'gradient-right': 'linear-gradient(90deg, #D1E0E5ff, #DFE5ECff, #C0DDDDff, #746D9Bff, #C0C5C4ff)',
  			'gradient-bottom': 'linear-gradient(180deg, #D1E0E5ff, #DFE5ECff, #C0DDDDff, #746D9Bff, #C0C5C4ff)',
  			'gradient-left': 'linear-gradient(270deg, #D1E0E5ff, #DFE5ECff, #C0DDDDff, #746D9Bff, #C0C5C4ff)',
  			'gradient-top-right': 'linear-gradient(45deg, #D1E0E5ff, #DFE5ECff, #C0DDDDff, #746D9Bff, #C0C5C4ff)',
  			'gradient-bottom-right': 'linear-gradient(135deg, #D1E0E5ff, #DFE5ECff, #C0DDDDff, #746D9Bff, #C0C5C4ff)',
  			'gradient-top-left': 'linear-gradient(225deg, #D1E0E5ff, #DFE5ECff, #C0DDDDff, #746D9Bff, #C0C5C4ff)',
  			'gradient-bottom-left': 'linear-gradient(315deg, #D1E0E5ff, #DFE5ECff, #C0DDDDff, #746D9Bff, #C0C5C4ff)',
  			'gradient-radial': 'radial-gradient(#D1E0E5ff, #DFE5ECff, #C0DDDDff, #746D9Bff, #C0C5C4ff)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
