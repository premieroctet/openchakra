import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TextField from "@material-ui/core/TextField";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import styles from '../../../static/css/components/RegisterSteps/RegisterFirstPage/RegisterFirstPage';

class RegisterFirstPage extends React.Component{

  render() {
    const{classes, state} = this.props;

    return(
      <Grid container>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <MailOutlineIcon className={classes.colorIcon}/>
            </Grid>
            <Grid item className={classes.widthTextField}>
              <TextField
                id="input-with-icon-grid"
                label="Email"
                placeholder="Email"
                style={{width: '100%'}}
                type="email"
                value={state.email}
                onChange={(e) => this.props.onChangeEmail(e)}
                error={state.errors.email}
                helperText={state.errors.email}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <PersonOutlineIcon className={classes.colorIcon}/>
            </Grid>
            <Grid item className={classes.widthTextField}>
              <TextField
                id="standard-with-placeholder"
                label="Prénom"
                placeholder="Prénom"
                style={{width: '100%'}}
                type="text"
                name="firstname"
                value={state.firstname}
                onChange={(e) => this.props.onChange(e)}
                error={state.errors.firstname}
              />
            </Grid>
            <em style={{color: 'red'}}>{state.errors.firstname}</em>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <PersonOutlineIcon className={classes.colorIcon}/>
            </Grid>
            <Grid item className={classes.widthTextField}>
              <TextField
                label="Nom"
                placeholder="Nom"
                style={{width: '100%'}}
                type="text"
                name="name"
                value={state.name}
                onChange={(e) => this.props.onChange(e)}
                error={state.errors.name}
              />
            </Grid>
            <em style={{color: 'red'}}>{state.errors.name}</em>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                <Grid item>
                  <LockOpenOutlinedIcon className={classes.colorIcon}/>
                </Grid>
                <Grid item className={classes.widthTextField}>
                  <TextField
                    label="Créer un mot de passe"
                    placeholder="Créer un mot de passe"
                    style={{width: '100%'}}
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={(e) => this.props.onChange(e)}
                    onKeyUp={(e) => this.props.onChangePassword(e)}
                    error={state.status1.error}
                    helperText={state.status1.error}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                <Grid item>
                  <LockOutlinedIcon className={classes.colorIcon}/>
                </Grid>
                <Grid item className={classes.widthTextField}>
                  <TextField
                    label="Confirmer mot de passe"
                    placeholder="Confirmer mot de passe"
                    style={{width: '100%'}}
                    type="password"
                    name="password2"
                    value={state.password2}
                    onChange={(e) => this.props.onChange(e)}
                    onKeyUp={(e) => this.props.onChangePassword(e)}
                    error={state.status2.error}
                    helperText={state.status2.error}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(RegisterFirstPage);
