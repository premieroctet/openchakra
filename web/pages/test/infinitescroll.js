import {withTranslation} from 'react-i18next'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
const {setAxiosAuthentication}=require('../../utils/authentication')
import axios from 'axios'
import CardServiceUser from '../../components/Card/CardServiceUser/CardServiceUser'

class InfiniteTest extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      count: 0,
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/serviceUser/search', {})
      .then(res => {
        console.log(`Got ${res.data.length} services`)
        this.setState({items: res.data.slice(0, 200), count: 50})
      })
      .catch(err => console.error(err))
  }

  fetchMoreData = () => {
    setTimeout(
      () => {
        console.log(`Loading`)
        this.setState({count: this.state.count+50})
      },
      1000,
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
            items.slice(0, count).map(i => (
              <CardServiceUser
                key={i._id}
                item={i._id}
              />
            ))
          }
        </InfiniteScroll>
      </div>
    )
  }
}

export default withTranslation('custom', {withRef: true})(InfiniteTest)
