import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import { changeTheme } from './action';


const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({
                           classes,
                           theme,
                           changeTheme

                       }) => (
    <Card>
        <Title title={"Configuration"} />
        <CardContent>
            <div className={classes.label}>Thème</div>
            <Button
                variant="raised"
                className={classes.button}
                color={theme === 'light' ? 'primary' : 'default'}
                onClick={() => changeTheme('light')}
            >
                Thème light
            </Button>
            <Button
                variant="raised"
                className={classes.button}
                color={theme === 'dark' ? 'primary' : 'default'}
                onClick={() => changeTheme('dark')}
            >
                Thème dark
            </Button>
        </CardContent>

    </Card>



);

const mapStateToProps = state => ({
    theme: state.theme,

});

const enhance = compose(
    connect(
        mapStateToProps,
        {
            changeTheme,
        }
    ),

    withStyles(styles)
);

export default enhance(Configuration);
