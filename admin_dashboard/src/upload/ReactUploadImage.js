import React, {Fragment} from 'react'
const axios = require("axios");

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            picture: []
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        let self = this;
        axios.get('http://localhost:5000/myAlfred/upload/all')
            .then(function (response) {

                let pictures = response.data;
                console.log(pictures);

                self.setState({
                    picture:pictures
                })




            })
            .catch(function (error) {
                console.log(error);
            });
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:5000/myAlfred/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        const {picture}= this.state;
        const file = picture.map(files => (

            <div key={files._id}>
                <img src={`../../../uploads/${files.name}`} alt={files.name} width={40}/></div>

        ));
        return (
            <Fragment>
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} accept="image/*" />
                <button type="submit">Upload</button>
            </form>
            <div>{file}</div>
            </Fragment>

        )
    }
}

export default ReactUploadImage
