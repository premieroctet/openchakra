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
  const {data} = props
  const classes = useStyles()

  const listGrades = [
    {
      label: '',
      summary: data.grade_text ? data.grade_text : '',
      IconName: <SchoolIcon classes={{root: classes.colorIconSchool}}/>,
    },
    {
      label: '',
      summary: data.insurance_text ? data.insurance_text : '',
      IconName: <VerifiedUserIcon classes={{root: classes.colorIconSchool}}/>,
    },
  ]
  
  const condition = data.insurance ? data.grade_text ? listGrades : listGrades[1] : null

  return(
    <>
      <ListAlfredConditions
        columnsXl={12}
        columnsLG={12}
        columnsMD={12}
        columnsSM={12}
        columnsXS={12}
        wrapperComponentProps={condition}
      />
    </>
  )
}

export default CustomListGrades
