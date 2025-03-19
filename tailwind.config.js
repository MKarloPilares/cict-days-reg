module.exports = {
    theme: {
      extend: {
        keyframes: {
          scaleUp: {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.2)' },
            '100%': { transform: 'scale(1)' },
          },
        },
        animation: {
          scaleUp: 'scaleUp 0.8s ease-in-out',
        },
      },
    },
  }