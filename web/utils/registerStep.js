import React from "react";
import RegisterFirstPage from "../components/RegisterSteps/RegisterFirstPage/RegisterFirstPage";
import RegisterSecondPage from "../components/RegisterSteps/RegisterSecondPage/RegisterSecondPage";
import RegisterThirdPage from "../components/RegisterSteps/RegisterThirdPage/RegisterThirdPage";
const {REGISTER_MODE}=require('./consts.js')

const FIRSTPAGE = {
  component: parent => <RegisterFirstPage
    state={parent.state}
    onChangeEmail={parent.onChangeEmail}
    onChange={parent.onChange}
    onChangePassword={parent.onChangePassword}
    handleClickShowPassword={parent.handleClickShowPassword}
    handleClickShowPassword2={parent.handleClickShowPassword2}
    handleMouseDownPassword={parent.handleMouseDownPassword}
  />

}

const SECONDEPAGE ={
  component : parent => <RegisterSecondPage
    state={parent.state}
    onChangeAddress={parent.onChangeAddress}
    onChangeBirthdayDate={parent.onChangeBirthdayDate}
    onChangeBirthdayMonth={parent.onChangeBirthdayMonth}
    onChangeBirthdayYear={parent.onChangeBirthdayYear}
    onChangePhone={parent.onChangePhone}
    handleChecked={parent.handleChecked}
  />
}

const THIRDPAGE ={
  component: parent => <RegisterThirdPage
    state={parent.state}
    onChange={parent.onChange}
    checkSmsCode={parent.checkSmsCode}
  />
}

const STEPS={
  [REGISTER_MODE.COMPLETE] : [ FIRSTPAGE,SECONDEPAGE, THIRDPAGE],
  [REGISTER_MODE.INCOMPLETE] : [ FIRSTPAGE, SECONDEPAGE],
}

module.exports={STEPS}
