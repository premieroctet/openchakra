import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {RESA_SERVICE} from '../../../utils/i18n';
import Link from '../../Link/Link'

class ResaService extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {style} = this.props;
        return (
            <Grid className={style.ResaServiceMainContainer}>
                <Grid className={style.becomeAlfredContainer}>
                    <Grid>
                        <h2 className={style.becomeAlfredTitle}>{RESA_SERVICE.title}</h2>
                    </Grid>
                    <Grid>
                        <p className={style.becomeAlfredText}>{RESA_SERVICE.text}</p>
                    </Grid>
                    <Grid>
                        <Link href={'/creashop/creashop'}>
                            <Button variant={'contained'}
                                    className={style.resaServiceButton}>{RESA_SERVICE.button}</Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid/>
            </Grid>
        );
    }
}

export default ResaService;
