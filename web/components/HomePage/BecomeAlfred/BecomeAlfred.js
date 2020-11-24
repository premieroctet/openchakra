import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {BECOME_ALFRED} from '../../../utils/i18n';
import Link from 'next/link'

class BecomeAlfred extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {style} = this.props;
        return (
            <Grid className={style.becomeAlfredMainContainer}>
                <Grid className={style.becomeAlfredContainer}>
                    <Grid>
                        <h2 className={style.becomeAlfredTitle}>{BECOME_ALFRED.title}</h2>
                    </Grid>
                    <Grid>
                        <p className={style.becomeAlfredText}>{BECOME_ALFRED.text}</p>
                    </Grid>
                    <Grid>
                        <Link href={'/footer/becomeAlfred'}>
                            <Button variant={'contained'}
                                    className={style.becomeAlfredButton}>{BECOME_ALFRED.button}</Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid/>
            </Grid>
        );
    }
}

export default BecomeAlfred;
