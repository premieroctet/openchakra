import { theme as baseTheme } from '@chakra-ui/react'
import { NewThemeType } from '~core/models/customComponents'

const myTheme = (newThemeState: NewThemeType) => ({
  semanticTokens: {
    colors: {
      'chakra-body-bg': {
        _light: newThemeState.bgColor,
        _dark: 'gray.800',
      },
      'chakra-body-text': {
        _light: newThemeState.textColor,
        _dark: 'gray.100',
      },
      primaryColor: {
        _light: newThemeState.primaryColor,
        _dark: 'blue.700',
      },
      paperColor: {
        _light: newThemeState.paperColor,
        _dark: 'gray.700',
      },
      borderColor: {
        _light: newThemeState.borderColor,
        _dark: 'gray.700',
      },
    },
  },
  colors: {
    brand:
      baseTheme.colors[newThemeState.brand as keyof typeof baseTheme.colors],
    error:
      baseTheme.colors[newThemeState.error as keyof typeof baseTheme.colors],
    success:
      baseTheme.colors[newThemeState.success as keyof typeof baseTheme.colors],
  },
  components: {
    Accordion: {
      baseStyle: {
        container: {
          bg: 'paperColor',
          borderColor: 'borderColor',
        },
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderColor: 'borderColor',
        },
      },
    },
    Avatar: {
      baseStyle: {
        container: {
          bg: 'paperColor',
          borderColor: 'borderColor',
          color: 'chakra-body-text',
        },
        excessLabel: {
          color: 'chakra-body-text',
        },
      },
    },
    Badge: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderColor: 'borderColor',
          backgroundColor: 'paperColor',
        },
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    CloseButton: {
      baseStyle: {
        color: 'primaryColor',
      },
    },
    Code: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Divider: {
      baseStyle: {
        color: 'borderColor',
      },
    },
    Progress: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Spinner: {
      baseStyle: {
        color: 'primaryColor',
      },
    },
  },
})

export default myTheme
