import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import InfiniteScroll from 'react-infinite-scroll-component'
const {setAxiosAuthentication}=require('../../utils/authentication')
import axios from 'axios';
import CardService from "../../components/Card/CardService/CardService";

class InfiniteTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items:[],
      count:0,
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/serviceUser/search', {})
      .then(res => {
        console.log(`Got ${res.data.length} services`)
        this.setState({items:res.data.slice(0, 200), count:50})
      })
      .catch (err => console.error(err))
  }

  fetchMoreData = () => {
    setTimeout(
      () => {
        console.log(`Loading`)
        this.setState({count : this.state.count+50})
      },
      1000
    )
 };

 render() {
   const {items, count}=this.state
   console.log(`Count:${count}`)
   return (
     <div>
       <InfiniteScroll
         dataLength={count}
         next={this.fetchMoreData}
         hasMore={count<items.length}
         loader={<h4>Loading...</h4>}
       >
         {
           items.slice(0, count).map( i => (
             <CardService
               key={i._id}
               item={i._id}
              />
           ))
         }
       </InfiniteScroll>
     </div>
   );
 }
}

export default InfiniteTest
