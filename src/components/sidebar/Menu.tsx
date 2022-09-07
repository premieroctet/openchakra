import React from 'react'
import styled from 'styled-components'

const menuSections = {
  pages: {
    title: 'Pages',
    icon: '/icons/pages.svg',
  },
  components: {
    title: 'Components',
    icon: '/icons/components.svg',
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
  return (
    <StyledMenu>
      <img
        className="logo"
        src="/images/wappizyLogo.svg"
        width={224}
        alt="Logo"
      />
      <ul className="menu">
        {Object.keys(menuSections).map(category => {
          return (
            <li>
              <img src={menuSections[category]['icon']} alt="" width={70} />
              <span>{menuSections[category]['title']}</span>
            </li>
          )
        })}
      </ul>
      <div className="sidebar">Les beaux composants ici</div>
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  display: grid;
  grid-template-areas:
    'logo logo'
    'menu sidebar';
  grid-template-rows: auto 1fr;
  background-color: black;
  width: max-content;
  padding: 1rem;

  .menu {
    grid-area: menu;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }

  .logo {
    grid-area: logo;
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
