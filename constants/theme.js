const COLORS = {
  dark: '#00204A',
  primary: '#005792',
  secondary: '#00BBF0',
  light: '#D9FAFF',

  black: '#000000',
  lightblack: '#231F20',

  darkgray: '#666',
  gray: '#858585',
  gray2: '#C7C7C7',
  lightgray: '#D9D9D9',

  white: '#FFFFFF',
  lightwhite: '#F9F9F9',

  yellow: '#FCB446',
  red: '#C44444',
  transparent: 'rgba(0,0,0,0)',
};

const FONT = {
  regular: 'DMSans-Regular',
  medium: 'DMSans-Medium',
  bold: 'DMSans-Bold',
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  custom: color => ({
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  }),
  small: color => ({
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  }),
  medium: color => ({
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  }),
  large: color => ({
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  }),
};

export {COLORS, FONT, SIZES, SHADOWS};
