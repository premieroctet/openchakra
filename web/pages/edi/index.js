import React from 'react'
import EDIHeader from '../../components/Feurst/EDIHeader'
import LogIn from '../../components/LogIn/LogIn'
import LoginComp from '../../components/LogIn/LoginComp'
import Table from '../../components/Table/Table'

import '../../static/feurst.css'

export const feurstImgPath = '../../static/assets/img/feurst'

// const newStyles = {
//   buttonlogin: 'LoginComp-buttonlogin-52',
//   cardContant: 'LoginComp-cardContant-39',
//   colorIcon: 'LoginComp-colorIcon-45',
//   containerDialogContent: 'LoginComp-containerDialogContent-48',
//   flexContainerPics: 'LoginComp-flexContainerPics-50',
//   titleRegister: 'LoginComp-titleRegister-49',
//   widthTextField: 'LoginComp-widthTextField-46',
// }

const accessRights = {
  client: [
    {
      url: 'edi/orders',
      label: 'Commandes',
    },
    {
      url: 'edi/account',
      label: 'Mon compte',
    },
  ]}

const Edi = () => {
  
  return (<>
    <EDIHeader accessRights={accessRights.client} />
    <LogIn/>
    <LoginComp style={newStyles} />
    <Table />
  </>)
}

export default Edi
