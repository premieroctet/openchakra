import React from "react"
import Grid from "@material-ui/core/Grid"

class CardAlbum extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{classes, item, onClick} = this.props;

    console.log(`Item:${JSON.stringify(item)}`)
    return (
      <Grid>
        <img src={`/${item.picture}`} width={100} onClick={onClick ? () => {onClick(item._id)} : {}}/>
        <div>{item.label}</div>
      </Grid>

    );
  }
}

export default CardAlbum
