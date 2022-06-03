import React, {useState, useEffect} from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import {checkPass1, checkPass2} from '../../utils/passwords'

const RenewPassword = ({t, setPassword, passChanged}) => {

  const [state, setState] = useState({
    newPassword: '',
    newPassword2: '',
    check1: false,
    check2: false,
    showNewPassword: false,
    showConfirmPassword: false,
  })

  const onChange = e => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const onClick1 = () => {
    setState({...state,
      check1: checkPass1(state.newPassword).check,
      check2: checkPass2(state.newPassword, state.newPassword2).check,
    })
  }

  useEffect(() => {
    setPassword(state)
  }, [setPassword, state])

  useEffect(() => {
    setState({...state, newPassword: '', newPassword2: ''})
  }, [passChanged])


  const {showNewPassword, showConfirmPassword, newPassword, newPassword2} = state

  return (<>
    <Input
      placeholder={ReactHtmlParser(t('SECURITY.placeholder_newpassword'))}
      type= {showNewPassword ? 'text' : 'password' }
      name="newPassword"
      value={newPassword || ''}
      onChange={onChange}
      variant={'outlined'}
      onKeyUp={onClick1}
      classes={{root: `customsecurityrepeatpass `}}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            tabIndex="-1"
            aria-label="toggle password visibility"
            onClick={() => setState({...state, showNewPassword: !showNewPassword}) }
          >
            {showNewPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />

    <em className={`customsecurityrepeatnewpass`}>{checkPass1(newPassword).error}</em>

    <Input
      placeholder={ReactHtmlParser(t('SECURITY.placeholder_repeat_password'))}
      type={showConfirmPassword ? 'text' : 'password' }
      name="newPassword2"
      value={newPassword2}
      onChange={onChange}
      variant={'outlined'}
      onKeyUp={onClick1}
      classes={{root: `customsecurityrepeatpass`}}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            tabIndex="-1"
            aria-label="toggle password visibility"
            onClick={() => setState({...state, showConfirmPassword: !showConfirmPassword}) }
          >
            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
    <em className={`customsecurityrepeatpasserror` }>{checkPass2(newPassword, newPassword2).error}</em>
  </>
  )
}

export default withTranslation('custom', {withRef: true})(RenewPassword)
