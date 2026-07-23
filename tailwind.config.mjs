/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        base: {
          black: "#0B0B0B",
          softBlack: "#121212",
          white: "#FFFFFF",
          muted: "#6B6B6B",
        },
        neutral: {
          cream: "#F5F1EB",
          warm: "#D6D1C9",
        },
        coffee: {
          light: "#6B4F3A",
          dark: "#3E2C23",
        },
        accent: {
          gold: "#D1AA49",
        }
      },
      fontFamily: {
        // El manual pide Gotham en TODA la web (títulos incluidos). Ambos
        // tokens resuelven a Gotham; la jerarquía la dan los calibres
        // (light/book/medium/bold). El serif queda solo de respaldo.
        serif: ['Gotham', 'Playfair Display', 'serif'],
        sans: ['Gotham', 'Montserrat', 'system-ui', 'sans-serif'],
      },
    },
	},
	plugins: [],
}
