import moment from 'moment';
import {ACCOUNT_MIN_AGE} from './consts'
import ReactHtmlParser from 'react-html-parser'
import Validator from 'validator'
import {checkPass1, checkPass2} from './passwords'
import React from 'react'
import RegisterFirstPage from '../components/RegisterSteps/RegisterFirstPage/RegisterFirstPage'
import RegisterSecondPage from '../components/RegisterSteps/RegisterSecondPage/RegisterSecondPage'
import RegisterThirdPage from '../components/RegisterSteps/RegisterThirdPage/RegisterThirdPage'
import RegisterMode from '../components/RegisterSteps/RegisterMode/RegisterMode'
const {REGISTER_MODE}=require('./consts.js')

const modeValidator = parent => {
  const {company} = parent.state
  let errors={}
  if (!company) {
    return errors
  }
  if (!company.name) {
    errors['company.name']='Entrez un nom'
  }
  if (!company.siret) {
    errors['company.siret']='Entrez un siret'
  }
  if (company.vat_subject && !company.vat_number) {
    errors['company.vat_number']='Entrez un numéro de TVA'
  }
  return errors
}

const firstPageValidator = parent => {
  const {email, firstname, name, password, password2}=parent.state
  let errors={}
  if (Validator.isEmpty(name)) {
    errors.name='Saisissez un nom'
  }
  if (Validator.isEmpty(firstname)) {
    errors.firstname='Saisissez un prénom'
  }
  if (!Validator.isEmail(email)) {
    errors.email=parent.props.t('REGISTER.textfield_email_error')
  }
  const chk1 = checkPass1(password)
  if (!chk1.check) {
    errors.password=chk1.error
  }
  const chk2 = checkPass2(password, password2)
  if (!chk2.check) {
    errors.password2=chk2.error
  }
  return errors
}

const secondPageValidator = parent => {
  const {address, day, month, year, checked}=parent.state
  let errors={}
  if (!address || Validator.isEmpty(address)) {
    errors.address='Veuillez saisir une adresse'
  }
  const birthday=moment().set({date: day, month: month-1, year: year})
  if (!(day && month && year && birthday.isValid())) {
    errors.birthday='Saisissez une date de naissance valide'
  }
  else if (birthday.isBefore(moment().add(-110, 'years'))) {
    errors.birthday='Saisissez une date de naissance valide'
  }
  else if (birthday.isAfter(moment().add(-ACCOUNT_MIN_AGE, 'years'))) {
    errors.birthday=`Vous devez avoir au moins ${ACCOUNT_MIN_AGE} pour vous inscrire`
  }
  if (!checked) {
    errors.checked='Vous devez accepter les conditions générales'
  }
  return errors
}

const MODEREGISTER = {
  component: parent => <RegisterMode
    state={parent.state}
    onChangeCompany = {parent.onChangeCompany}
  />,
  validator: modeValidator,
}

const FIRSTPAGE = {
  component: parent => <RegisterFirstPage
    state={parent.state}
    onChange={parent.onChange}
    handleClickShowPassword={parent.handleClickShowPassword}
    handleClickShowPassword2={parent.handleClickShowPassword2}
    handleMouseDownPassword={parent.handleMouseDownPassword}
  />,
  validator: firstPageValidator,
}

const SECONDEPAGE ={
  component: parent => <RegisterSecondPage
    state={parent.state}
    onChange={parent.onChange}
    onChangeAddress={parent.onChangeAddress}
    onChangeBirthdayDate={parent.onChangeBirthdayDate}
    onChangeBirthdayMonth={parent.onChangeBirthdayMonth}
    onChangeBirthdayYear={parent.onChangeBirthdayYear}
    onChangePhone={parent.onChangePhone}
    handleChecked={parent.handleChecked}
  />,
  validator: secondPageValidator,
}

const THIRDPAGE ={
  component: parent => <RegisterThirdPage
    state={parent.state}
    onChange={parent.onChange}
    checkSmsCode={parent.checkSmsCode}
  />,
  validator: () => true,
}

const STEPS={
  [REGISTER_MODE.COMPLETE]: [MODEREGISTER, FIRSTPAGE, SECONDEPAGE, THIRDPAGE],
  [REGISTER_MODE.INCOMPLETE]: [FIRSTPAGE, SECONDEPAGE],
}

module.exports={STEPS}
