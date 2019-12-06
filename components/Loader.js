import React, {Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import '../static/loader.css';

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

componentDidMount() {
    setTimeout(()=>{ document.getElementById('loader').style.opacity = '1';}, 1300);
    setTimeout(()=>{ document.getElementById('loader').style.opacity = '0.87';}, 1325);
    setTimeout(()=>{ document.getElementById('loader').style.opacity = '0.75';}, 1350);
    setTimeout(()=>{ document.getElementById('loader').style.opacity = '0.63';}, 1375);
    setTimeout(()=>{ document.getElementById('loader').style.opacity = '0.5';}, 1400);
    setTimeout(()=>{ document.getElementById('loader').style.opacity = '0.38';}, 1425);
    setTimeout(()=>{ document.getElementById('loader').style.opacity = '0.25';}, 1450);
    setTimeout(()=>{ document.getElementById('loader').style.opacity = '0.12';}, 1475);
    setTimeout(()=>{ document.getElementById('loader').style.display = 'none';}, 1500);
}

render() {
    return (
            <Grid id="loader" className="container1">
                <div className="loader-anim">
                    <div></div>
                    <div></div>
                </div>
            </Grid>
    );
};
}

export default Loader;