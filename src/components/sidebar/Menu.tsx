import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useToast } from '@chakra-ui/react'
import { deploy } from '../../utils/deploy'
import { getComponents } from '../../core/selectors/components'
import Pages from './Pages'
import Sidebar from './Sidebar'

const deployComponents = (components: IComponents, toast: any) => {
  toast({
    title: 'Starting publishing',
    status: 'success',
    position: 'top',
    duration: 2000,
    isClosable: true,
  })
  deploy(components)
    .then(() => {
      toast({
        title: 'Published on production',
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      })
    })
    .catch(err => {
      toast({
        title: 'Error while publishing',
        description: String(err),
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      })
    })
}

const menuSections: {
  [section: string]: {
    title: string
    icon: string
    component?: React.ReactNode
    function?: (comp: IComponents, toast: any) => any
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
    title: 'Deploy',
    icon: '/icons/deploy.svg',
    function: deployComponents,
  },
}

const Menu = () => {
  const components = useSelector(getComponents)
  const toast = useToast()
  const [activeSection, setActiveSection] = useState(
    menuSections.pages.component,
  )

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
          const menu = menuSections[category]
          return (
            <li>
              <button
                onClick={() => {
                  menu.component && setActiveSection(menu.component)
                  menu.function && menu.function(components, toast)
                }}
              >
                <img src={menu.icon} alt="" width={70} />
                <span>{menu.title}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="sidebar">{activeSection}</div>
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
  padding-block: 1rem;
  padding-inline: 1rem 0;

  .menu {
    grid-area: menu;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }

  .logo {
    grid-area: logo;
    justify-self: end;
    padding: 0.5rem;
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
