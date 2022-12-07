import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import {screen} from '../../../web/styles/screenWidths'
import {CREATE, ORDER, QUOTATION, BASEPATH_EDI, PRODUCT, SHIPRATE, ACCOUNT, FEURST_IMG_PATH, FEURST_ICON_PATH} from '../../utils/feurst/consts'
import {useUserContext} from '../../contextes/user.context'
import ContactUs from './ContactUs'

const MENUS=[
  {
    enabled: rights => rights.hasModel(ORDER),
    label: 'Commandes',
    url: `${BASEPATH_EDI}/orders`,
  },
  {
    enabled: rights => rights.hasModel(QUOTATION),
    label: 'Devis',
    url: `${BASEPATH_EDI}/quotations`,
  },
  {
    enabled: rights => rights.isActionAllowed(PRODUCT, CREATE) || rights.isActionAllowed(SHIPRATE, CREATE) || rights.isActionAllowed(ACCOUNT, CREATE),
    label: 'Administration',
    url: `${BASEPATH_EDI}/accounts`,
  },
]


const LoggedUser = ({user}) => {

  return user ?
    <Link href={`${BASEPATH_EDI}/profile`} >
      <a>
        <div className='flex gap-x-1'>
          <img
            width={20}
            height={20}
            src={`${FEURST_ICON_PATH }/user.icon.svg`}
            alt="" />
            Bienvenue {user?.firstname}

        </div>
      </a>
    </Link> : null
}

const LogOut = ({user}) => {
  return (user ? (
    <Link href={`${BASEPATH_EDI}/login?out=true`} >
      <a title={'Se déconnecter'}><img width={20} height={20} src={`${FEURST_IMG_PATH}/logout.png`} alt="" /></a>
    </Link>) : null)
}


const QuickMenu = ({accessRights}) => {

  function containsPartUrl(possibleurl, currentpath) {
    const regEx = new RegExp(possibleurl)
    return regEx.test(currentpath)
  }

  const {user} = useUserContext()
  const router = useRouter()
  const menus = MENUS.filter(m => accessRights && m.enabled(accessRights))

  if (!menus.length) {
    return (<ContactUs />)
  }

  return (
    <>
      <QuickMenuStyled className='flex w-full justify-evenly gap-x-4'>
        {menus.map((menu, i) => (
          <Link key={`menu${i}`} href={menu.url}>
            <a className={containsPartUrl(menu.url, router.pathname) ? 'current' : null}>{menu.label}</a>
          </Link>
        ))}
        {user && <>
          <LoggedUser user={user} />
          <LogOut user={user} />
        </>}
      </QuickMenuStyled>
    </>
  )
}


const QuickMenuStyled = styled.div`
 a {
    font-size: var(--text-sm);
    text-decoration-line: none;
    font-weight: var(--font-bold);
    transition: all var(--delayIn) ease-out;
    color: var(--black) !important;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    row-gap: var(--spc-1);
    align-items: center;

    &.current::after, &::after {
      opacity: 0;
      transition: transform var(--delayIn) ease-out;
      width: 4ch;
      height: 6px;
      background-color: var(--yellow-500);
      content: '';
      transform: translateY(var(--spc-1));
    }

    &.current::after, &:hover::after {
      opacity: 1;
      transform: translateY(0);
    }


    @media (${screen.lg}) {
      font-size: var(--text-base);
    }
  }

  span {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    white-space: nowrap;
    color: var(--black) !important;

    @media (${screen.lg}) {
      font-size: var(--text-base);
    }
  }
`

export default QuickMenu
