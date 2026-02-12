module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563eb',
                    dark: '#1d4ed8',
                    light: '#60a5fa',
                },
                secondary: {
                    DEFAULT: '#4b5563',
                    dark: '#374151',
                    light: '#9ca3af',
                },
                accent: '#f59e0b',
                background: '#f9fafb',
                surface: '#ffffff',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            boxShadow: {
                'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
                'premium-hover': '0 20px 35px -5px rgba(0, 0, 0, 0.06), 0 12px 15px -10px rgba(0, 0, 0, 0.06)',
            },
        },
    },
    variants: {
        extend: {
            transform: ['hover', 'focus'],
            scale: ['hover', 'focus'],
            translate: ['hover', 'focus'],
        },
    },
    plugins: [],
}
