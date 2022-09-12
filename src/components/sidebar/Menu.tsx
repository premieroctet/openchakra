import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Pages from './Pages'
import Sidebar from './Sidebar'
import { getShowLayout } from '~core/selectors/app'
import useDispatch from '~hooks/useDispatch'
import MenuActions from './MenuActions'
import ResponsiveActions from './ResponsiveActions'

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
  // settings: {
  //   title: 'Settings',
  //   icon: '/icons/settings.svg',
  // },
}

const Menu = () => {
  const [activeSection, setActiveSection] = useState('components')
  const showLayout = useSelector(getShowLayout)
  const dispatch = useDispatch()

  return (
    <>
      <StyledMenu show={showLayout}>
        <div className="leftpanel">
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
                    className={category === activeSection ? 'highlight' : ''}
                    onClick={() => {
                      setActiveSection(category)
                    }}
                  >
                    <img
                      src={menuSections[category]['icon']}
                      alt=""
                      width={30}
                      style={
                        category === 'deploy' ? { marginRight: '10px' } : {}
                      }
                    />
                    <span>{menuSections[category]['title']}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="menuactions">
            <MenuActions />
          </div>
          <div className="responsive">{/* <ResponsiveActions /> */}</div>
          <div className="sidebar">
            {menuSections[activeSection]['component']}
          </div>
        </div>
        <button
          className="buildermode"
          onClick={() => dispatch.app.toggleBuilderMode()}
        >
          <span role="img" alt="toggle builder mode">
            {'<'}
          </span>
        </button>
      </StyledMenu>
    </>
  )
}

const StyledMenu = styled.div`
  position: relative;
  --panel-width: 300px;
  --primary-color: #5bbdc5;
  --secondary-color: rgb(20, 19, 37);

  .leftpanel {
    height: 100%;
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-areas:
      'logo logo'
      'menu sidebar'
      'menu sidebar'
      'actions actions';
    grid-template-rows: auto 1fr 1fr auto;
    grid-template-columns: 1fr 3fr;
    background-color: var(--secondary-color);
    width: ${props => (props.show ? 'var(--panel-width)' : 0)};
    transition: all 0.2s ease-in-out;
    transform: ${props =>
      props.show ? 'none' : 'translateX(calc(var(--panel-width) * -1))'};
  }

  .highlight {
    background-color: var(--primary-color);
  }

  .menu {
    grid-area: menu;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 1rem;
    align-items: center;
    width: 100%;

    li {
      width: inherit;
    }

    li button {
      width: inherit;
      padding-block: 0.5rem;
    }

    button span {
      font-size: 12px;
      word-wrap: break-word;
      /* font-weight: bold; */
    }
  }

  .menu button,
  .sidebar button {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }

  li img {
    aspect-ratio: 1/1;
  }

  .menuactions {
    padding: 0.5rem;
    grid-area: actions;
    background-color: var(--secondary-color);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .responsive {
    grid-area: responsive;
  }

  .logo {
    height: auto;
    grid-area: logo;
    justify-self: center;
    padding: 1rem;
    padding-inline-end: 2rem;
  }

  .sidebar {
    grid-area: sidebar;
    color: white;
  }

  .buildermode {
    margin-left: -2rem;
    z-index: 1;
    color: white;
    position: absolute;
    top: 45%;
    width: 55px;
    height: 45px;
    left: ${props => (props.show ? 'var(--panel-width)' : '0')};
    background-color: var(--secondary-color);
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 2px 5px #aaa;

    span {
      padding-left: 1.5rem;
    }
  }
`

export default Menu
