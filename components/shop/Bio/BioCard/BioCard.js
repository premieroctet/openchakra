import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      alignSelf: 'center',
    },
  },
  avatar: {
    height: 150,
    width: 150,
  },
  biography: {
    padding: '2rem',
    borderRadius: 10,
  },
  text: {
    margin: '1rem 0 .5rem 0',
  },
  allContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  biographyContainer: {
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center',
    },
  },
});

const bioCard = (props) => {
  const { classes } = props;

  return (
    <Grid container className={classes.allContainer}>
      <Grid item xs={4} className={classes.avatarContainer}>
        <Avatar alt="John Doe" src="../../../../static/John-Doe.jpg" className={classes.avatar} />
        <Typography className={classes.text}>John Doe</Typography>
        <Typography>Rouen, France</Typography>
      </Grid>
      <Grid item xs={8} className={classes.biographyContainer}>
        <Card className={classes.biography}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nam ut sapien at odio faucibus porta. Nullam eget nibh
            pellentesque, lobortis nibh vitae, congue libero. Pellentesque
            congue rutrum vestibulum. Suspendisse et facilisis ipsum.
            Vestibulum semper ultricies massa, ut elementum elit ultricies
            sit amet. In fringilla lacus vel tellus ullamcorper ornare. In
            consequat nisl a auctor condimentum. Nunc in turpis ac odio
            auctor euismod gravida a felis. Maecenas sollicitudin ex eget
            nisi scelerisque semper. In ipsum enim, maximus ac fermentum vel,
            convallis et purus. Pellentesque habitant morbi tristique senectus
            et netus et malesuada fames ac turpis egestas. Sed luctus magna in
            lectus faucibus molestie. Nam lacinia porttitor ipsum, ut imperdiet orci rhoncus non.
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(bioCard);
