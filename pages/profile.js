import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';

moment.locale('fr');

const { config } = require('../config/config');
const url = config.apiUrl;
class profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            address: false,
            job: false,
            phone: false,
            currentAddress: {},
            otherAddress: false,
            currentOtherAddress: {},
            picture: false,
            currentPicture: ''

        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});

                if(user.billing_address.city) {
                    this.setState({address: true, currentAddress: user.billing_address})
                } else {
                    this.setState({address:false})
                }
                if(user.phone) {
                    this.setState({phone: true})
                } else {
                    this.setState({phone: false})
                }
                if(user.job) {
                    this.setState({job: true})
                } else {
                    this.setState({job: false})
                }
                if(user.picture) {
                    this.setState({picture: true})
                } else {
                    this.setState({picture: false})
                }
                if(!user.service_address.city) {
                    this.setState({otherAddress:false})
                } else {
                    this.setState({otherAddress: true, currentOtherAddress: user.service_address})
                }



            })
            .catch(err =>
                console.log(err)
            );
    }


    render() {

        const {user} = this.state;
        const address = this.state.address;
        const otherAddress = this.state.otherAddress;
        const phone = this.state.phone;
        const job = this.state.job;
        const picture = this.state.picture;
        const link = <Link href="/addAddress"><a>Ajouter une adresse</a></Link>;
        const link2 = <Link href="/addOtherAddress"><a>Ajouter une seconde adresse</a></Link>;
        const addPicture = <Link href="/addPicture"><a>Ajouter une photo de profile</a></Link> ;
        const {currentAddress} = this.state;
        const {currentOtherAddress} = this.state;
        const currentPicture = <img src={`../../${user.picture}`} alt="picture"/>;
        const fullAddress = <div>
            <p>Adresse : {currentAddress.address}</p>
            <p>Ville : {currentAddress.city}</p>
            <p>Code postal : {currentAddress.zip_code}</p>
            <p>Pays : {currentAddress.country}</p>
        </div>;

        const fullOtherAddress = <div><h4>Autre adresse</h4>
            <p>Adresse : {currentOtherAddress.address}</p>
            <p>Ville : {currentOtherAddress.city}</p>
            <p>Code postal : {currentOtherAddress.zip_code}</p>
            <p>Pays : {currentOtherAddress.country}</p>
        </div>;

        const addPhone = <Link href="/addPhone"><a>Ajouter un téléphone</a></Link>;
        const currentPhone = <p>Numéro de téléphone : {user.phone}</p>;

        const addJob = <Link href="/addJob"><a>Ajouter un emploi</a></Link>;
        const currentJob = <p>{user.job}</p>;

        return (
            <Fragment>
                <Layout>
                    <div style={{width: 1000, margin: '0 auto',marginTop: 64}}>
                        <p>Bienvenue {user.name} {user.firstname} !</p>

                        <div>
                            <h4>Vos informations</h4>
                            <p>Email : {user.email}</p>
                            <p>Date de naissance : {moment(user.birthday).format('L')}</p>
                            {address ? fullAddress : link}
                            {otherAddress ? fullOtherAddress : link2}
                            {phone ? currentPhone : addPhone}
                            {job ? currentJob : addJob}
                            {picture ? currentPicture : addPicture}
                        </div>
                    </div>
                </Layout>
            </Fragment>
        );
    };
}

export default profile;
