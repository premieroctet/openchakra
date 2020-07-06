import React, { Fragment } from 'react';
import Layout from '../hoc/Layout/Layout';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

class ShopBanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: [],
        };
    }

    componentWillMount() {
        axios.get('/myAlfred/api/shopBanner/all')
            .then(response => {
                let banner = response.data;

                this.setState({banner: banner})
            })
            .catch(err =>{console.error(err)});
    }

    onSubmit = e => {
        e.preventDefault();
        const label = e.target.label.value;
        //this.setState({ label: label });
        console.log(label)
    };

    render() {
        const {banner} = this.state;

        const image = banner.map(e => (
            <div key={e._id}>
                <img src={`../../${e.picture}`} alt={e.label}/>
                <div className="legend">
                <p>{e.label}</p>
                    <form onSubmit={this.onSubmit}><input type='hidden' value={e.picture} name='label'/><button type='submit'>Choisir</button></form>
                </div>
            </div>
        ));
        return (
            <Fragment>
                <Layout>
                    <div style={{width: 1000, margin: '0 auto',marginTop: 64}}>
                    <Carousel>

                        {image}

                    </Carousel>
                    </div>
                </Layout>
            </Fragment>

        )
    }
}


export default ShopBanner;
