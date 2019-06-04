import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";


class profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            address: false,

        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get('http://localhost:5000/myAlfred/api/users/current')
            .then(res => {
                let user = res.data;

                if(user.billing_address.city) {
                    this.setState({address: true})
                } else {
                    this.setState({address:false})
                }
                this.setState({user:user})
            })
            .catch(err =>
                console.log(err)
            );
    }


    render() {

        const {user} = this.state;
        const address = this.state.address;
        const link = <Link href="/addAddress"><a>Ajouter une adresse</a></Link>;
        const other = <p>Ajouter une autre adresse pour les services</p>

        return (
            <Fragment>
                <Layout>
                    <div style={{width: 1000, margin: '0 auto',marginTop: 64}}>
                        <p>Bienvenue {user.name} {user.firstname} !</p>
                        {address ? other : link}
                    </div>
                </Layout>
            </Fragment>
        );
    };
}

export default profile;
