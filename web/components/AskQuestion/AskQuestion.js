import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";


class AskQuestion extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      user:{}
    }
  }

  componentDidMount() {
    axios.get(`/myAlfred/api/shop/alfred/${this.props.user}`)
      .then(response => {
        let user = response.data;
        this.setState({
          user: user.alfred,
        })
      }).catch(err => console.error(err))
  }


  render() {
    const {user} = this.state;
    return(
      <Grid style={{textAlign: 'center'}}>
        <Grid>
          <h2>{`Vous souhaitez poser une question à ${user.firstname} ?`}</h2>
        </Grid>
        <Grid>
          <Typography>{`Rendez-vous sur la page du service qui vous intéresse, cliquez sur « demande d’informations » en dessous du bouton réserver. Vous pourrez alors poser toutes vos questions à  ${user.firstname}!`}</Typography>
        </Grid>

      </Grid>
    );
  }

}

export default AskQuestion;
