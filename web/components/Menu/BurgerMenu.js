import React, {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import {useUserContext} from '../../contextes/user.context'
import {clearAuthenticationToken} from '../../utils/authentication'
import {
  removeAlfredRegistering,
} from '../../utils/context'
import {
  canAlfredParticularRegister,
  canAlfredSelfRegister,
  isMonoProvider,
  getDataModel,
} from '../../config/config'

const BurgerMenu = ({t, companyPage, ifHomePage, classes}) => {

  const [anchorEl, setAnchorEl] = useState(null)
  const {user} = useUserContext()
  const router = useRouter()
  
  const handleOpenMenuItem = event => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClosenMenuItem = () => {
    setAnchorEl(false)
  }
  
  const handleClickLink = event => {
    setAnchorEl(false)
    const linkto = event.target.querySelector('a')
    linkto && linkto.click()
  }
  
  const LinkMenuItem = props => {
    return <MenuItem onClick={handleClickLink} {...props} />
  }
  
  const logout = () => {
    clearAuthenticationToken()
    localStorage.removeItem('path')
    removeAlfredRegistering()
    if (ifHomePage) {
      window.location.reload(false)
    }
    else {
      router.push('/')
    }
  }

  return (
    <>
      <IconButton
        aria-label="open drawer"
        onClick={handleOpenMenuItem}
        classes={{root: 'custombgburger'}}
      >
        <MenuIcon classes={{root: `customburgerlogo ${companyPage ? classes.menuIconB2b : classes.menuIcon}`}}/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClosenMenuItem}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        classes={{paper: 'customburger'}}
      >
        <MenuItem disabled={true} style={{opacity: 1}}>
          {`${ReactHtmlParser(t('SEARCHBAR.hello')) } ${ user.firstname}`} !
        </MenuItem>
        {
          getDataModel() !== 'aftral' &&
        <LinkMenuItem>
          <Link href={`/profile/about?user=${user._id}`}><a>{ReactHtmlParser(t('SEARCHBAR.my_profil'))}</a></Link>
        </LinkMenuItem>

        }
        <LinkMenuItem>
          <Link href={'/account/editProfile'}><a>{ReactHtmlParser(t('SEARCHBAR.my_settings'))}</a></Link>
        </LinkMenuItem>
        {
          (!user.is_employee && !isMonoProvider()) ?
            user.is_alfred ?
              <LinkMenuItem>
                <Link href={`/profile/services?user=${user._id}`} ><a>{ReactHtmlParser(t('SEARCHBAR.my_services'))}</a></Link>
              </LinkMenuItem>
              :
              canAlfredSelfRegister() && (!!user.professional || canAlfredParticularRegister()) && <MenuItem><Link href={'/creaShop/creaShop'}><a>{ReactHtmlParser(t('SEARCHBAR.create_shop'))}</a></Link></MenuItem>
            : null
        }
        <LinkMenuItem>
          <Link href={`/profile/messages?user=${user._id}`}><a>{ReactHtmlParser(t('SEARCHBAR.my_messages'))}</a></Link>
        </LinkMenuItem>
        <LinkMenuItem>
          <Link href={'/reservations/reservations'}><a>{ReactHtmlParser(t('SEARCHBAR.my_resa'))}</a></Link>
        </LinkMenuItem>
        {user.is_admin ?
          <LinkMenuItem>
            <Link href={'/dashboard'}><a>{ReactHtmlParser(t('SEARCHBAR.dashboard_alfred'))}</a></Link>
          </LinkMenuItem>
          : null
        }
        <MenuItem onClick={logout}>{ReactHtmlParser(t('SEARCHBAR.log_out'))}</MenuItem>
      </Menu>
    </>
  )
}

export default withTranslation('custom', {withRef: true})(BurgerMenu)
