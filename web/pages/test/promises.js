const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
const {snackBarError, snackBarSuccess}=require('../../utils/notifications')

class AboutTest extends React.Component{

  constructor(props) {
    super(props);
  }

  test2 = (ok1,ok2) => {
    const url1 = ok1 ? '/myAlfred/api/users/test' : '/myAlfred/api/users/test2'
    const url2 = ok2 ? '/myAlfred/api/users/test' : '/myAlfred/api/users/test2'
    return new Promise( (resolve, reject) => {
      axios.get(url1)
        .then (res => {
          axios.get(url2)
            .then (res => resolve("Ok pour les 2"))
            .catch (err => reject("Raté pour le 2"))
        })
        .catch (err => reject("Raté pour le 1"))
    })
  }

  test = (ok1, ok2) => {
    this.test2(ok1, ok2)
      .then(res => snackBarSuccess(res))
      .catch(err => snackBarError(err))
  }

  render() {

    return(
      <>
      <Button onClick={() => this.test(true, true)}>
      Tester ok
      </Button>
      <Button onClick={() => this.test(false, true)}>
      Tester Fail 1
      </Button>
      <Button onClick={() => this.test(true, false)}>
      Tester Fail 2
      </Button>
      <Button onClick={() => this.test(false, false)}>
      Tester Fail 1 et 2
      </Button>
      </>
    );
  }

}

export default AboutTest
