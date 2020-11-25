import React from 'react';
import Grid from "@material-ui/core/Grid";
import Link from '../../../components/Link/Link'
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    link: {
        fontWeight: 'bold',
        borderBottom: '1px solid black',
        '&:hover': {
            color: '#84A5E0',
            borderBottom: '1px solid #84A5E0'
        }
    }
});

class LayoutFaq extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid style={{
                display: ' flex', flexDirection: 'column', justifyContent: 'center',
                borderTop: '1px dotted black'
            }}>
                <Grid style={{margin: '0 auto'}}>
                    <p style={{fontWeight: 'bold'}}>Et si vous souhaitez en savoir plus</p>
                    <p>Vous pouvez consulter <Link href={'/faq/home'}>
                        <span className={classes.link}>notre FAQ</span>
                    </Link>
                    </p>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(LayoutFaq);
