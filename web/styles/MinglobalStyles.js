import {createGlobalStyle} from 'styled-components'

export const MinGlobalStyles = createGlobalStyle`

  :root {

    --black: ${props => props.theme?.colors?.black || '#111'};
    --white: ${props => props.theme?.colors?.white || '#FFF'};
    --brand-color: ${props => props.theme?.colors?.brand || 'black'};
    --primary-color: ${props => props.theme?.colors?.primary || 'black'};
    --secondary-color: ${props => props.theme?.colors?.secondary || 'black'};
    --font-family: ${props => props.theme?.fontFamily || 'arial'};

      /* text */
      --text-xxs: 0.6rem;
      --text-xs: 0.75rem;
      --text-sm: 0.875rem;
      --text-base: 1rem;
      --text-lg: 1.125rem;
      --text-xl: 1.25rem;
      --text-2xl: 1.5rem;
      --text-3xl: 1.875rem;
      --text-4xl: 2.25rem;
      --text-5xl: 2.5rem;
      --font-normal: 400;
      --font-medium : 500;
      --font-semibold : 600;
      --font-bold	: 700;

      /* Animation delays */
      --delayIn: .2s;
      --delayOut: .5s;

      /* Spacing */
      --spc-0-5: 0.125rem;
      --spc-1: 0.25rem;
      --spc-1-5: 0.375rem;
      --spc-2: 0.5rem;
      --spc-2-5: 0.625rem;
      --spc-3: 0.75rem;
      --spc-3-5: 0.875rem;
      --spc-4: 1rem;
      --spc-5: 1.25rem;
      --spc-6: 1.5rem;
      --spc-7: 1.75rem;
      --spc-8: 2rem;
      --spc-9: 2.25rem;
      --spc-10: 2.5rem;
      --spc-11: 2.75rem;
      --spc-12: 3rem;
      --spc-18: 4.5rem;
      --spc-24: 6rem;
      --spc-32: 8rem;
      --spc-96: 24rem;

      /* Grid */
      --grid-cols-1: repeat(1, minmax(0, 1fr));
      --grid-cols-2: repeat(2, minmax(0, 1fr));
      --grid-cols-3: repeat(3, minmax(0, 1fr));

      /* BorderRadius */
      --rounded: 0.25rem;
      --rounded-md: 0.375rem;
      --rounded-xl: 0.75rem;
      --rounded-2xl: 1rem;
      --rounded-3xl: 1.5rem;
      --rounded-7xl: 3.5rem;
      --rounded-full: 9999px;

      /* containers */
      --container-sm: ${props => (props.theme?.containerSize?.sm ? props.theme.containerSize.sm : 'min(100% - 2rem, 30rem)')};
      --container-md: ${props => (props.theme?.containerSize?.md ? props.theme.containerSize.md : 'min(100% - 2rem, 40rem)')};
      --container-base: ${props => (props.theme?.containerSize?.base ? props.theme.containerSize.base : 'min(100% - 2rem, 50rem)')};
      --container-lg: ${props => (props.theme?.containerSize?.lg ? props.theme.containerSize.lg : 'min(100% - 2rem, 60rem)')};
      --container-xl: ${props => (props.theme?.containerSize?.xl ? props.theme.containerSize.xl : 'min(100% - 2rem, 70rem)')};

      /* Miscellaneous */
      --minTapSize: 44px;

  /* Avoid Chrome to see Safari hack */
  @supports (-webkit-touch-callout: none) {
    body {
      /* The hack for Safari */
      min-height: -webkit-fill-available;
    }
  }



  .container-sm {
    width: var(--container-sm);
    margin-inline: auto;
  }
  .container-md {
    width: var(--container-md);
    margin-inline: auto;
  }
  .container-base {
    width: var(--container-base);
    margin-inline: auto;
  }

  .container-lg {
    width: var(--container-lg);
    margin-inline: auto;
  }

  .container-xl {
    width: var(--container-xl);
    margin-inline: auto;
  }


  ul[role="menu"] a {
    text-decoration: none;
  }

  /* A11Y */

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

`
