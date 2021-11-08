import React from 'react'
import IndexDashboard from '../components/Dashboard/IndexDashboard/IndexDashboard'
import Team from '../components/Dashboard/Team/Team'
import LocalFloristOutlinedIcon from '@material-ui/icons/LocalFloristOutlined'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined'
import ServicesCompany from '../components/Dashboard/ServicesCompany/ServicesCompany'
import ScheduleCompany from '../components/Dashboard/ScheduleCompany/ScheduleCompany'
import AccountCompany from '../components/Dashboard/AccountCompany/AccountCompany'
import Invoices from '../components/Dashboard/Invoices/Invoices'
import moment from 'moment'
moment.locale('fr')


const {MICROSERVICE_MODE, CARETAKER_MODE} = require('./consts.js')

const INDEX = {
  menu: 'Tableau de bord',
  icon: <HomeOutlinedIcon />,
  component: () => <IndexDashboard/>,
}

const TEAM = {
  menu: 'Mon équipe',
  icon: <PersonOutlineOutlinedIcon />,
  component: parent => <Team key={moment()} mode={parent.props.mode}/>,
}

const SERVICES = {
  menu: 'Mes services',
  icon: <LocalFloristOutlinedIcon />,
  component: parent => <ServicesCompany key={moment()} mode={parent.props.mode}/>,
}

const INVOICES = {
  menu: 'Factures',
  icon: <DescriptionOutlinedIcon/>,
  component: () => <Invoices/>,
}

const SCHEDULE = {
  menu: 'Planning réservations',
  icon: <CalendarTodayOutlinedIcon />,
  component: () => <ScheduleCompany />,
}

const ACCOUNT = {
  menu: 'Mon compte',
  icon: <WorkOutlineOutlinedIcon />,
  component: () => <AccountCompany />,
}

const TEAM_CONCIERGE = {
  menu: 'Collaborateurs',
  icon: <PersonOutlineOutlinedIcon />,
  component: parent => <Team key={moment()} mode={parent.props.mode}/>,
}

const SERVICES_CONCIERGE = {
  menu: 'Services proposés',
  icon: <LocalFloristOutlinedIcon />,
  component: parent => <ServicesCompany key={moment()} mode={parent.props.mode}/>,
}

const STEPS={
  [MICROSERVICE_MODE]: [INDEX, TEAM, SERVICES, INVOICES, SCHEDULE, ACCOUNT],
  [CARETAKER_MODE]: [INDEX, TEAM_CONCIERGE, SERVICES_CONCIERGE, INVOICES, ACCOUNT],
}

module.exports={STEPS}
