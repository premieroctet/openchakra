import React from 'react'

class CompanyComponent extends React.Component {
  is_mode_company = () => {
    return Boolean(this.state.company)
  }
}

module.exports = CompanyComponent
