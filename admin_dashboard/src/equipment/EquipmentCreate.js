import React, {Fragment} from 'react'
const axios = require("axios");

class EquipmentCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            label: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
    }

    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('logo',this.state.file);
        formData.append('label',this.state.label);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post("http://localhost:3122/myAlfred/admin/equipment/all",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});

    }

    onChange2(e){
        this.setState({label:e.target.value})
    }

    render() {

        return (
            <Fragment>
                <form onSubmit={this.onFormSubmit}>
                    <h1>Ajouter un équipement</h1>
                    <input type="text" name='label' onChange={this.onChange2}/>
                    <input type="file" name="logo" onChange= {this.onChange} accept="image/*" />
                    <button type="submit">Ajouter</button>
                </form>

            </Fragment>

        )
    }
}

export default EquipmentCreate

