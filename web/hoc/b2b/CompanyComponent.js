import {withTranslation} from 'react-i18next'
import React from 'react'
import BasePage from '../../pages/basePage'

class CompanyComponent extends BasePage {
  isModeCompany = () => {
    return Boolean(this.state.company)
  }
}

module.exports = CompanyComponent
