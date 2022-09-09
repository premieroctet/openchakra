import React, { useState } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import Pages from './Pages'
import { Button } from '@chakra-ui/react'

const menuSections: {
  [section: string]: {
    title: string
    icon: string
    component?: React.ReactNode
  }
} = {
  pages: {
    title: 'Pages',
    icon: '/icons/pages.svg',
    component: <Pages />,
  },
  components: {
    title: 'Components',
    icon: '/icons/components.svg',
    component: <Sidebar />,
  },
  medias: {
    title: 'Medias',
    icon: '/icons/medias.svg',
  },
  settings: {
    title: 'Settings',
    icon: '/icons/settings.svg',
  },
  deploy: {
    title: 'Abracadabra',
    icon: '/icons/abracadabra.svg',
  },
}

const Menu = () => {
  const [activeSection, setActiveSection] = useState('pages')

  return (
    <StyledMenu>
      <img
        className="logo"
        src="/images/wappizyLogo.svg"
        width={150}
        alt="Logo"
      />
      <ul className="menu">
        {Object.keys(menuSections).map(category => {
          return (
            <li>
              <Button
                bg={'none'}
                borderRadius={'none'}
                height="100%"
                width="100%"
                onClick={() => setActiveSection(category)}
                _hover={{
                  background: 'teal.400',
                  color: 'white',
                }}
              >
                <img
                  src={menuSections[category]['icon']}
                  alt=""
                  width={70}
                  style={category === 'deploy' ? { marginRight: '10px' } : {}}
                />
                <span>{menuSections[category]['title']}</span>
              </Button>
            </li>
          )
        })}
      </ul>
      <div className="sidebar">{menuSections[activeSection]['component']}</div>
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  display: grid;
  grid-template-areas:
    'logo logo'
    'menu sidebar';
  grid-template-rows: auto 1fr;
  background-color: rgb(20, 19, 37);
  width: max-content;
  min-width: 20vw;

  .menu {
    grid-area: menu;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    width: 100%;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 0.5rem;
  }

  .logo {
    height: auto;
    grid-area: logo;
    justify-self: end;
    padding: 1rem;
    padding-inline-end: 2rem;
  }

  .sidebar {
    grid-area: sidebar;
    color: white;
  }

  li img {
    aspect-ratio: 1/1;
  }
`

export default Menu
