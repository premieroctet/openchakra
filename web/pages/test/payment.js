const {setAuthToken, setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button'
const {getLoggedUserId}=require('../../utils/functions');
import Router from 'next/router';

class PaymentTest extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      user:null,
      result: null,
    }
  }

  static getInitialProps({query : {transactionId}}) {
    return {transaction_id : transactionId}
  }

  doIt= loadPromise => {
    loadPromise
    .then( res => {
      this.setState({user: res.data})
      if (this.props.transaction_id) {
        this.setState({ result: 'test OK'})
      }
      else {
        setTimeout(this.pay, 1000)
      }
    })
    .catch (err => {
      if (this.props.transaction_id) {
        this.setState({ result: 'test NOK'})
      }
    })

  }
  componentDidMount() {
    if (this.props.transaction_id) {
      this.doIt(this.loadUser())
    }
    else {
      this.login().then( res => {
        console.log(`sessonStorage:${JSON.stringify(sessionStorage)}`)
        setAuthToken()
        this.doIt(this.loadUser())
      })
    }
  }

  loadUser = () => {
    console.log('Loading user')
    setAxiosAuthentication()
    return axios.get(`/myAlfred/api/users/current`)
  }

  pay = () => {
    axios.post(`/myAlfred/api/payment/payIn`, { amount:18, fees:1, returnUrl:'/test/payment'})
      .then(response => {
        this.setState({result:response.data})
        Router.push(response.data.RedirectURL)
      })
      .catch(err => {
        console.error(err)
      });
  }

  login = () => {
    console.log('Login')
    return axios.post('/myAlfred/api/users/login', { username : 'sebastien.auvray@my-alfred.io', password: '600Bimota'})
  }

  render() {
    const{classes, transaction_id} = this.props;
    const {user, result} = this.state

    const userid=getLoggedUserId()
    return(
      <div>
        <div>{`Utilisateur ${user ? user.avatar_letters : 'Aucun'}`}</div>
        <div>{`Logged id ${userid}`}</div>
        <div>{`Transaction:${JSON.stringify(transaction_id)}`}</div>
        <div>{`Result:${JSON.stringify(result)}`}</div>
      </div>
    )
  }
}

export default PaymentTest
