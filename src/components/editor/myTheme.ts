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
      paperColor: {
        _light: newThemeState.paperColor,
        _dark: 'gray.700',
      },
    },
  },
  colors: {
    primary:
      baseTheme.colors[newThemeState.primary as keyof typeof baseTheme.colors],
    secondary:
      baseTheme.colors[
        newThemeState.secondary as keyof typeof baseTheme.colors
      ],
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Accordion: {
      baseStyle: {
        container: {
          bg: 'paperColor',
        },
      },
    },
  },
})

export default myTheme
