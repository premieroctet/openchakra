import { extendTheme, theme as baseTheme } from '@chakra-ui/react'
import { NewThemeType } from '~core/models/customComponents'

const myTheme = (themeState: NewThemeType) =>
  extendTheme({
    semanticTokens: {
      colors: {
        'chakra-body-bg': {
          _light: themeState.bgColor,
          _dark: 'gray.800',
        },
        'chakra-body-text': {
          _light: themeState.textColor,
          _dark: 'gray.100',
        },
        primaryColor: {
          _light: themeState.primaryColor,
          _dark: 'blue.700',
        },
        paperColor: {
          _light: themeState.paperColor,
          _dark: 'gray.700',
        },
        'chakra-border-color': {
          // borderColor: {
          _light: themeState.borderColor,
          _dark: 'gray.700',
        },
      },
    },
    fonts: {
      heading: `Heading Font Family, sans-serif`,
      body: `Body Font Family, sans-serif`,
    },
    colors: {
      brand:
        baseTheme.colors[themeState.brand as keyof typeof baseTheme.colors],
    },
    components: {
      Accordion: {
        baseStyle: {
          container: {
            bg: 'paperColor',
            borderColor: 'chakra-border-color',
          },
        },
      },
      Alert: {
        baseStyle: {
          container: {
            borderColor: 'chakra-border-color',
          },
        },
      },
      Avatar: {
        baseStyle: {
          container: {
            bg: 'paperColor',
            borderColor: 'chakra-border-color',
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
            borderColor: 'chakra-border-color',
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
          color: 'chakra-border-color',
        },
      },
      Icon: {
        baseStyle: {
          color: 'primaryColor',
        },
      },
      IconButton: {
        defaultProps: {
          colorScheme: 'brand',
        },
      },
      Popover: {
        baseStyle: {
          arrow: {
            borderColor: 'chakra-border-color',
            bg: 'paperColor',
          },
          content: {
            backgroundColor: 'paperColor',
          },
        },
      },
      Progress: {
        defaultProps: {
          colorScheme: 'brand',
        },
      },
      Radio: {
        defaultProps: {
          colorScheme: 'brand',
        },
      },
      RangeSlider: {
        defaultProps: {
          colorScheme: 'brand',
        },
      },
      Select: {
        baseStyle: {
          icon: {
            color: 'primaryColor',
          },
        },
      },
      Spinner: {
        baseStyle: {
          color: 'primaryColor',
        },
      },
      Switch: {
        defaultProps: {
          colorScheme: 'brand',
        },
      },
      Slider: {
        defaultProps: {
          colorScheme: 'brand',
        },
      },
      Table: {
        defaultProps: {
          variant: 'striped',
          colorScheme: 'brand',
        },
        baseStyle: {
          table: {
            bg: 'paperColor',
            width: 'full',
          },
        },
      },
      Tabs: {
        defaultProps: {
          variant: 'soft-rounded',
          colorScheme: 'brand',
        },
        baseStyle: {
          tabpanels: {
            bg: 'paperColor',
          },
        },
      },
      Tag: {
        defaultProps: {
          colorScheme: 'brand',
        },
      },
    },
  })

export default myTheme
