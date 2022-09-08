import React, { useState } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import Pages from './Pages'

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
    title: 'Deploy',
    icon: '/icons/deploy.svg',
  },
}

const Menu = () => {
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
          return (
            <li>
              <button
                onClick={() =>
                  setActiveSection(menuSections[category]['component'])
                }
              >
                <img src={menuSections[category]['icon']} alt="" width={70} />
                <span>{menuSections[category]['title']}</span>
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
