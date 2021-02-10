import React from "react";
const {snackBarSuccess, snackBarError}=require('../../utils/notifications')

class TestNotification extends React.Component {

  componentDidMount() {
    setTimeout(this.testOneMessage, 1000)
    setTimeout(this.testManyMessages, 3000)
  }

  testOneMessage = () => {
    snackBarSuccess('Message test')
  }

  testManyMessages = () => {
    snackBarSuccess({1: 'Message un', 2 : 'Message deux'})
  }

  render() {
    return (
      <h1>Test notifications</h1>
    )
  }

}

export default TestNotification
