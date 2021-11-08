import React from 'react'
import ListAlfredConditions from '../ListAlfredConditions/ListAlfredConditions'
import SchoolIcon from '@material-ui/icons/School'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  colorIconSchool: {
    color: 'rgba(39,37,37,35%)',
  },
}))

function CustomListGrades(props) {
  const {grade, insurance} = props

  const classes = useStyles()

  let listGrades = []
  grade && listGrades.push({
    summary: grade || '',
    IconName: <SchoolIcon classes={{root: classes.colorIconSchool}}/>,
  })

  insurance && listGrades.push(
    {
      summary: insurance || '',
      IconName: <VerifiedUserIcon classes={{root: classes.colorIconSchool}}/>,
    },
  )

  return(
    <>
      <ListAlfredConditions
        columnsXl={12}
        columnsLG={12}
        columnsMD={12}
        columnsSM={12}
        columnsXS={12}
        wrapperComponentProps={listGrades}
      />
    </>
  )
}

export default CustomListGrades
