import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useToast, Button } from '@chakra-ui/react'
import { deploy } from '../../utils/deploy'
import { getComponents } from '../../core/selectors/components'
import Pages from './Pages'
import Sidebar from './Sidebar'
import { getShowLayout } from '~core/selectors/app'
import useDispatch from '~hooks/useDispatch'
import MenuActions from './MenuActions'
import ResponsiveActions from './ResponsiveActions'

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
  // settings: {
  //   title: 'Settings',
  //   icon: '/icons/settings.svg',
  // },
  deploy: {
    title: 'Abracadabra',
    icon: '/icons/abracadabra.svg',
    function: deployComponents,
  },
}

const Menu = () => {
  const components = useSelector(getComponents)
  const toast = useToast()

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
                  <Button
                    bg={category === activeSection ? 'teal.400' : 'none'}
                    borderRadius={'none'}
                    height="100%"
                    width="100%"
                    onClick={() => {
                      setActiveSection(category)
                      menuSections[category].function &&
                        menuSections[category].function(components, toast)
                    }}
                    _hover={{
                      background: 'teal.400',
                      color: 'white',
                    }}
                  >
                    <img
                      src={menuSections[category]['icon']}
                      alt=""
                      width={60}
                      style={
                        category === 'deploy' ? { marginRight: '10px' } : {}
                      }
                    />
                    <span>{menuSections[category]['title']}</span>
                  </Button>
                </li>
              )
            })}
          </ul>
          <div className="menuactions">
            <MenuActions />
          </div>
          <div className="responsive">
            <ResponsiveActions />
          </div>
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

  .leftpanel {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-areas:
      'logo logo'
      'menu sidebar'
      'actions sidebar'
      'responsive sidebar';
    grid-template-rows: auto 1fr 1fr 1fr;
    grid-template-columns: auto 1fr;
    background-color: rgb(20, 19, 37);
    width: ${props => (props.show ? '415px' : 0)};
    transition: all 0.2s ease-in-out;
    transform: ${props => (props.show ? 'none' : 'translateX(-415px)')};
  }

  .menu {
    grid-area: menu;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      width: 100%;
    }
  }

  .menuactions {
    grid-area: actions;
  }

  .responsive {
    grid-area: responsive;
  }

  .buildermode {
    margin-left: -2rem;
    z-index: 1;
    color: #665;
    position: absolute;
    top: 45%;
    width: 55px;
    height: 45px;
    left: ${props => (props.show ? '415px' : '0')};
    background-color: rgb(236, 236, 236);
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 2px 5px #aaa;

    span {
      padding-left: 1.5rem;
    }
  }

  .menu button,
  .sidebar button {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 0.5rem;
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

  li img {
    aspect-ratio: 1/1;
  }
`

export default Menu
