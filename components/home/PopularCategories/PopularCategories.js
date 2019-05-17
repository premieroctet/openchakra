/**/
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PopularCategoriesCard from './PoplarCategoriesCard/PopularCategoriesCard';

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: 1366,
    },
  },
  media: {
    height: 0,
    borderRadius: '20px',
    paddingTop: '118.25%', // 16:9
  },
  textBox: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 30,
    marginTop: 35,
  },
});

const popularCategories = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Grid container className={classes.container}>
        <Typography variant="h5" className={classes.textBox}>
          Nos catégories les plus populaires
        </Typography>
      </Grid>
      <Grid container className={classes.container} spacing={24} wrap="wrap">
        <Grid item xs={12} md={6} lg={3}>
          <PopularCategoriesCard img="../../static/monika-grabkowska-759473-unsplash.jpg" categorie="cuisine" desc="Parce que quand on a faim, faut manger" avatar="../../../static/unknown.png"/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <PopularCategoriesCard img="../../static/monika-grabkowska-759473-unsplash.jpg" categorie="cuisine" desc="Parce que quand on a faim, faut manger" avatar="../../../static/unknown.png"/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <PopularCategoriesCard img="../../static/monika-grabkowska-759473-unsplash.jpg" categorie="cuisine" desc="Parce que quand on a faim, faut manger" avatar="../../../static/unknown.png"/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <PopularCategoriesCard img="../../static/monika-grabkowska-759473-unsplash.jpg" categorie="cuisine" desc="Parce que quand on a faim, faut manger" avatar="../../../static/unknown.png"/>
        </Grid>
      </Grid>
    </Fragment>
  );
};

popularCategories.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
/**/
/*import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  
  menuItem: {
    padding: '0 40px',
    margin: '5px 10px',
    userSelect: 'none',
    cursor: 'pointer',
    border: '1px transparent solid',
  },
  menuItemWrapper: {
    border: '1px transparent solid',
  },
  menuItemWrapper: {
    border: '1px blue solid',
  },
  menuItem: {
    border: '1px green solid',
  },
  
  scrollMenuArrow: {
    padding: '20px',
    cursor: 'pointer',
  },
});

const list = [
  { name: "item1" },
  { name: "item2" },
  { name: "item3" },
  { name: "item4" },
  { name: "item5" },
  { name: "item6" },
  { name: "item7" },
  { name: "item8" },
  { name: "item9" },
  { name: "item10" },
  { name: "item11" },
  { name: "item12" },
  { name: "item13" },
  { name: "item14" },
  { name: "item15" },
  { name: "item16" },
  { name: "item17" },
  { name: "item18" },
  { name: "item19" },
  { name: "item20" },
  { name: "item21" },
  { name: "item22" },
  { name: "item23" },
  { name: "item24" },
  { name: "item25" }
];

const MenuItem = ({ text, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};

export const Menu = (list, selected) =>
  list.map(el => {
    const { name } = el;

    return <MenuItem text={name} key={name} selected={selected} />;
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};
Arrow.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class popularCategories extends Component {
  state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    itemsCount: list.length,
    selected: "item1",
    translate: 0,
    transition: 0.4,
    wheel: true
  };

  constructor(props) {
    super(props);
    this.menu = null;
    this.menuItems = Menu(list.slice(0, list.length), this.state.selected);
  }

  onUpdate = ({ translate }) => {
    console.log(`onUpdate: translate: ${translate}`);
    this.setState({ translate });
  };

  onSelect = key => {
    console.log(`onSelect: ${key}`);
    this.setState({ selected: key });
  };

  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState;
    const { alignCenter: alignCenterNew } = this.state;
    if (alignCenter !== alignCenterNew) {
      this.menu.setInitial();
    }
  }

  setItemsCount = ev => {
    const { itemsCount = list.length, selected } = this.state;
    const val = +ev.target.value;
    const itemsCountNew =
      !isNaN(val) && val <= list.length && val >= 0
        ? +ev.target.value
        : list.length;
    const itemsCountChanged = itemsCount !== itemsCountNew;

    if (itemsCountChanged) {
      this.menuItems = Menu(list.slice(0, itemsCountNew), selected);
      this.setState({
        itemsCount: itemsCountNew
      });
    }
  };

  setSelected = ev => {
    const { value } = ev.target;
    this.setState({ selected: String(value) });
  };

  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      itemsCount,
      selected,
      translate,
      transition,
      wheel
    } = this.state;

    const menu = this.menuItems;

    const checkboxStyle = {
      margin: "5px 10px"
    };
    const valueStyle = {
      margin: "5px 10px",
      display: "inline-block"
    };

    return (
      <div className="App">

        <ScrollMenu
          ref={el => (this.menu = el)}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          hideArrows={hideArrows}
          hideSingleArrow={hideSingleArrow}
          transition={+transition}
          onUpdate={this.onUpdate}
          onSelect={this.onSelect}
          selected={selected}
          translate={translate}
          alignCenter={alignCenter}
          scrollToSelected={true}
          dragging={dragging}
          clickWhenDrag={clickWhenDrag}
          wheel={wheel}
        />

      </div>
    );
  }
}*/

export default withStyles(styles)(popularCategories);
