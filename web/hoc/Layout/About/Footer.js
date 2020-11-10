import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Link from 'next/link';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid style={{
                padding: '0 150px',
                borderTop: '1px dotted black'
            }}>
                <span style={{float: 'start', paddingTop: '10px'}}>&Agrave; propos de nous</span>

                <Grid style={{float: 'right', display: 'flex'}}>
                    <Link href={'/'}>

                        <p style={{marginTop: '2.5px', paddingRight: '18px'}}>Sécurité</p>
                    </Link>
                    <Link>
                        <p style={{marginTop: '2.5px', paddingRight: '18px'}}>Informations légales</p>
                    </Link>
                    <Link>
                        <p style={{marginTop: '2.5px', paddingRight: '18px'}}>Confidentialité</p>
                    </Link>
                </Grid>
            </Grid>
        )
    }
}

export default Footer;
