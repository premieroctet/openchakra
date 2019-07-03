import React, {Fragment} from 'react';
const axios = require("axios");

class ShowEquipment extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            equipment: []
        };

    }
    componentDidMount() {
        let self = this;
        const {id} = this.props.match.params;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`http://localhost:3122/myAlfred/api/admin/equipment/all/${id}`)
            .then(function (response) {

                let equipment = response.data;


                self.setState({
                    equipment:equipment
                })




            })
            .catch(function (error) {
                console.log(error);
            });
    }



    render() {

        const {equipment}= this.state;
        const equipments =


                <img src={`/images/${equipment.name_logo}`} alt={equipment.label}/>

        ;
        return (
            <Fragment>


                {equipment.label}
                {equipments}
            </Fragment>

        )
    }
}

export default ShowEquipment

