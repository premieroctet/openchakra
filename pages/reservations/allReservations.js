import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Footer from "../../hoc/Layout/Footer/Footer";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import UserAvatar from '../../components/Avatar/UserAvatar';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';

const { config } = require("../../config/config");
const url = config.apiUrl;
moment.locale("fr");

const styles = theme => ({
    bigContainer: {
        marginTop: 100,
        flexGrow: 1,
        [theme.breakpoints.down("xs")]: {
            marginBottom: 100,
        }
    },
    mobilevoir: {
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    webvoir: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    mobilerow1: {
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    webrow: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    marginbot: {
        marginBottom: "3.5%"
    },
    hiddenone: {
        [theme.breakpoints.down("sm")]: {
            display: "none!important"
        }
    },
    revealedone: {
        [theme.breakpoints.up("md")]: {
            display: "none!important"
        }
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        borderTop: "15px solid gray",
        margin: "0 auto",
        marginTop: -28
    },
    shopbar: {
        [theme.breakpoints.down("md")]: {
            display: "none"
        }
    },
    bottombar: {
        visibility: "hidden",
        [theme.breakpoints.up("md")]: {
            display: "none"
        },
        [theme.breakpoints.down("sm")]: {
            visibility: "visible",
            boxShadow: "2px -5px 14px -15px rgba(0,0,0,0.75)"
        }
    },
    topbar: {
        visibility: "visible",
        position: "sticky",
        top: 75,
        zIndex: 999,
        [theme.breakpoints.down("sm")]: {
            display: "none",
            visibility: "hidden"
        }
    },
    hidesm: {
        minWidth: "271px",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },

    hidelg: {
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    trait: {
        width: "100%",
        height: 4,
        backgroundColor: "rgb(47, 188, 211)",
        borderColor: "transparent",
        [theme.breakpoints.down("sm")]: {}
    },
    trait1: {
        width: "100%",

        height: 4,
        backgroundColor: "lightgray",
        borderColor: "transparent"
    },
    trait2: {
        width: "100%",
        height: 4,
        backgroundColor: "lightgray",
        borderColor: "transparent",
        [theme.breakpoints.down("sm")]: {}
    },
    trait3: {
        width: "100%",

        height: 4,
        backgroundColor: "rgb(47, 188, 211)",
        borderColor: "transparent"
    },
    tabweb: {
        visibility: "visible",
        width: "100%",
        position: "sticky",
        top: "115px",
        fontSize: 15,
        backgroundColor: "white",
        zIndex: "20",
        [theme.breakpoints.down("sm")]: {
            display: "none",
            visibility: "hidden"
        }
    },

    tabmobile: {
        visibility: "hidden",
        [theme.breakpoints.up("md")]: {
            display: "none"
        },
        [theme.breakpoints.down("sm")]: {
            visibility: "visible",
            fontSize: "10px",
            fontWeight: "300",
            backgroundColor: "white",
            position: "sticky",
            top: 55,
            zIndex: 20
        }
    },

    mobilerow: {
        marginTop: "1%",
        [theme.breakpoints.down("sm")]: {
            marginTop: "15%"
        }
    },
    Rightcontent: {
        marginLeft: "4%"
    },
    toggle: {
        [theme.breakpoints.down("sm")]: {
            marginLeft: "-75px",
            transition: "margin-left 0.7s",

            "&:hover": {
                marginLeft: "0px",
                transition: "margin-left 0.7s",
                boxShadow: "11px 6px 23px -24px rgba(0,0,0,0.75)"
            }
        }
    },
    paddresp: {
        [theme.breakpoints.up("md")]: {
            paddingLeft: 55
        },
        [theme.breakpoints.down("sm")]: {
            paddingLeft: 15
        }
    },
    trigger: {
        [theme.breakpoints.down("sm")]: {
            marginTop: -10,
            width: "100%",
            marginLeft: "0px",
            height: "30px",
            backgroundColor: "#2FBCD3",

            display: "block",
            transition: "display 0.7s",
            borderRadius: "5px",
            "&:focus": {
                display: "none",
                transition: "display 0.7s"
            }
        }
    }
});

class AllReservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: false,
            user: null,
            alfredReservations: [],
            userReservations: [],
            isAlfred: false
        };
    }

    componentDidMount() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "token"
        );
        axios.get(url + "myAlfred/api/users/current").then(res => {
            let result = res.data
            this.setState({ user: result._id });
            if (res.data.is_alfred === true) {
                this.setState({ isAlfred: true });
            }

            axios.get(url + "myAlfred/api/booking/alfredBooking").then(res => {
                this.setState({ alfredReservations: res.data });
            });

            axios.get(url + "myAlfred/api/booking/userBooking").then(res => {
                this.setState({ userReservations: res.data });
            });
        });
    }

    handleClicktabs2 = () => {
        this.setState({ tabs: true });
    };

    handleClicktabs = () => {
        this.setState({ tabs: false });
    };

    render() {
        const { classes } = this.props;
        const tabs = this.state.tabs;

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        {this.state.isAlfred ? (
                            <Grid style={{width: '100%'}}>
                                <NavBarShop userId={this.state.user}/>
                            </Grid>
                        ) : null}

                        {/*/////////////////////////////////////////////////////////////////////////////////////////*/}

                        <Grid container>
                            <Grid
                                className={classes.toggle}
                                item
                                xs={3}
                            >
                                <div className={classes.trigger}/>
                                <Grid container style={{ justifyContent: "center" }}>
                                    <Grid
                                        item
                                        style={{ marginTop: 30, width: 281, height: 70 }}
                                        className={classes.hidesm}
                                    >
                                        <Link href={"allReservations"}>
                                            <div
                                                style={{
                                                    border: "0.2px solid lightgrey",
                                                    lineHeight: "4",
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    display: "flex",
                                                    height: 70
                                                }}
                                            >
                                                <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                                                    Toutes mes réservations
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>
                                    <Grid
                                        item
                                        style={{ marginTop: 30, width: 281 }}
                                        className={classes.hidelg}
                                    >
                                        <Link href={"allReservations"}>
                                            <div
                                                style={{
                                                    lineHeight: "4",
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                                                    <img
                                                        src={"../static/calendar-4.svg"}
                                                        alt={"user"}
                                                        width={27}
                                                        height={70}
                                                        style={{ marginRight: 4 }}
                                                    />
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>

                                    <Grid
                                        item
                                        style={{ marginTop: 10, width: 281, height: 70 }}
                                        className={classes.hidesm}
                                    >
                                        <Link href={"comingReservations"}>
                                            <div
                                                style={{
                                                    border: "0.2px solid lightgrey",
                                                    lineHeight: "4",
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    display: "flex",
                                                    height: 70
                                                }}
                                            >
                                                <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                                                    Mes réservations à venir
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>
                                    <Grid
                                        item
                                        style={{ marginTop: 30, width: 281 }}
                                        className={classes.hidelg}
                                    >
                                        <Link href={"comingReservations"}>
                                            <div
                                                style={{
                                                    lineHeight: "4",
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                                                    <img
                                                        src={"../static/calendar-5.svg"}
                                                        alt={"user"}
                                                        width={27}
                                                        height={70}
                                                        style={{ marginRight: 4 }}
                                                    />
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>

                                    <Grid
                                        item
                                        style={{ marginTop: 10, width: 281, height: 70 }}
                                        className={classes.hidesm}
                                    >
                                        <Link href={"finishedReservations"}>
                                            <div
                                                style={{
                                                    border: "0.2px solid lightgrey",
                                                    lineHeight: "4",
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    display: "flex",
                                                    height: 70
                                                }}
                                            >
                                                <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                                                    Mes réservations terminées
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>
                                    <Grid
                                        item
                                        style={{ marginTop: 30, width: 281 }}
                                        className={classes.hidelg}
                                    >
                                        <Link href={"finishedReservations"}>
                                            <div
                                                style={{
                                                    lineHeight: "4",
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                                                    <img
                                                        src={"../static/calendar.svg"}
                                                        alt={"user"}
                                                        width={27}
                                                        height={70}
                                                        style={{ marginRight: 4 }}
                                                    />
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className={classes.paddresp} item xs={9} sm={9} md={7}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography style={{ fontSize: "2rem", marginTop: "4%" }}>
                                            Toutes mes réservations
                                        </Typography>
                                    </Grid>
                                    <Typography
                                        style={{ fontSize: "0.8rem", marginBottom: "4%" }}
                                    >
                                        Vous avez{" "}
                                        {this.state.userReservations.length +
                                        this.state.alfredReservations.length}{" "}
                                        réservations
                                    </Typography>
                                </Grid>
                                <Grid container className={classes.tabweb}>
                                    <Grid item xs={6} style={{ textAlign: "center" }}>
                                        <div>
                                            <h2
                                                onClick={this.handleClicktabs}
                                                style={{
                                                    color: "#828181",
                                                    fontWeight: "100",
                                                    cursor: "pointer",
                                                    marginLeft: "0%",
                                                    position: "sticky"
                                                }}
                                            >
                                                En tant qu'Alfred
                                            </h2>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h2
                                            onClick={this.handleClicktabs2}
                                            style={{
                                                color: "#828181",
                                                fontWeight: "100",
                                                textAlign: "center",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {" "}
                                            En tant qu'utilisateur
                                        </h2>
                                        <br />
                                    </Grid>

                                    <Grid item xs={6}>
                                        {tabs ? (
                                            <React.Fragment>
                                                <hr
                                                    className={classes.trait1}
                                                    style={{ marginTop: "-25px" }}
                                                />
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <hr
                                                    className={classes.trait3}
                                                    style={{ marginTop: "-25px" }}
                                                />
                                            </React.Fragment>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {tabs ? (
                                            <React.Fragment>
                                                <hr
                                                    className={classes.trait}
                                                    style={{ marginTop: "-25px" }}
                                                />
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <hr
                                                    className={classes.trait2}
                                                    style={{ marginTop: "-25px" }}
                                                />
                                            </React.Fragment>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.tabmobile}>
                                    <Grid item xs={6} style={{ textAlign: "center" }}>
                                        <h2
                                            onClick={this.handleClicktabs}
                                            style={{
                                                color: "#828181",
                                                fontWeight: "100",
                                                cursor: "pointer"
                                            }}
                                        >
                                            En tant qu'Alfred
                                        </h2>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h2
                                            onClick={this.handleClicktabs2}
                                            style={{
                                                color: "#828181",
                                                fontWeight: "100",
                                                textAlign: "center",
                                                cursor: "pointer"
                                            }}
                                        >
                                            En tant qu'utilisateur
                                        </h2>
                                        <br />
                                    </Grid>

                                    <Grid item xs={6} style={{ textAlign: "center" }}>
                                        {tabs ? (
                                            <React.Fragment>
                                                <hr className={classes.trait1} />
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <hr className={classes.trait3} />
                                            </React.Fragment>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {tabs ? (
                                            <React.Fragment>
                                                <hr className={classes.trait} />
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <hr className={classes.trait2} />
                                            </React.Fragment>
                                        )}
                                    </Grid>
                                </Grid>
                                {tabs ? (
                                    <React.Fragment>
                                        {this.state.userReservations.length ? (
                                            this.state.userReservations.map(booking => {
                                                return (
                                                    <React.Fragment>
                                                        {/* Web */}
                                                        <Grid
                                                            container
                                                            className={classes.webrow}
                                                            style={{ borderBottom: "1px #8281813b solid" }}
                                                        >
                                                            <Grid item md={1} style={{ marginRight: "5%" }}>
                                                                <UserAvatar user={booking.alfred} />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                md={6}
                                                                style={{
                                                                    paddingRight: "5%",
                                                                    paddingLeft: "5%"
                                                                }}
                                                            >
                                                                <Typography
                                                                    style={{
                                                                        marginTop: "2%",
                                                                        fontSize: "0.8rem",
                                                                        color:
                                                                            booking.status === "Confirmée"
                                                                                ? "#419F41"
                                                                                : booking.status ===
                                                                                "Demande d'infos" ||
                                                                                booking.status ===
                                                                                "En attente de confirmation"
                                                                                ? "#F87280"
                                                                                : booking.status === "Pré-approuvée"
                                                                                    ? "#F89B72"
                                                                                    : "#5D5D5D"
                                                                    }}
                                                                >
                                                                    {booking.status} - {booking.alfred.firstname}
                                                                </Typography>
                                                                <Typography
                                                                    style={{
                                                                        color: "#9B9B9B",
                                                                        fontSize: "0.8rem"
                                                                    }}
                                                                >
                                                                    {booking.date_prestation} -{" "}
                                                                    {moment(booking.time_prestation).format(
                                                                        "HH:mm"
                                                                    )}
                                                                </Typography>
                                                                <Typography
                                                                    style={{
                                                                        color: "#9B9B9B",
                                                                        fontSize: "0.8rem"
                                                                    }}
                                                                >
                                                                    {booking.service}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={2} style={{}}>
                                                                <Typography
                                                                    style={{
                                                                        color: "#4FBDD7",
                                                                        fontWeight: "600",
                                                                        paddingTop: "15%"
                                                                    }}
                                                                >
                                                                    {
                                                                        booking.amount.match(
                                                                            /^-?\d+(?:\.\d{0,2})?/
                                                                        )[0]
                                                                    }
                                                                    €
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={2} style={{}}>
                                                                <Link
                                                                    href={{
                                                                        pathname:
                                                                            "/reservations/detailsReservation",
                                                                        query: { id: booking._id, user: true }
                                                                    }}
                                                                >
                                                                <Typography
                                                                    className={classes.webvoir}
                                                                    style={{
                                                                        height: "45px",
                                                                        backgroundColor: "#2FBCD3",
                                                                        color: "white",
                                                                        textAlign: "center",
                                                                        cursor: "pointer",
                                                                        lineHeight: "3",
                                                                        marginTop: "15%"
                                                                    }}
                                                                >

                                                                        <a
                                                                            style={{
                                                                                textDecoration: "none",
                                                                                color: "white"
                                                                            }}
                                                                        >
                                                                            Voir la réservation
                                                                        </a>
                                                                </Typography>
                                                                    </Link>
                                                            </Grid>
                                                        </Grid>

                                                        {/* Mobile */}
                                                        <Grid
                                                            container
                                                            className={classes.mobilerow1}
                                                            style={{
                                                                boxShadow: "0px 0px 6px lightgray",
                                                                borderRadius: "5px",
                                                                width: "90%",
                                                                margin: "15px auto"
                                                            }}
                                                        >
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginTop: "15px"
                                                                }}
                                                            >
                                                                <UserAvatar user={booking.alfred} />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                style={{
                                                                    textAlign: "center",
                                                                    fontSize: "0.8rem"
                                                                }}
                                                            >
                                                                <Typography
                                                                    style={{
                                                                        marginTop: "2%",
                                                                        fontSize: "0.8rem",
                                                                        color:
                                                                            booking.status === "Confirmée"
                                                                                ? "#419F41"
                                                                                : booking.status ===
                                                                                "Demande d'infos" ||
                                                                                booking.status ===
                                                                                "En attente de confirmation"
                                                                                ? "#F87280"
                                                                                : booking.status === "Pré-approuvée"
                                                                                    ? "#F89B72"
                                                                                    : "#5D5D5D"
                                                                    }}
                                                                >
                                                                    {booking.status} - {booking.alfred.firstname}
                                                                </Typography>
                                                                <Typography
                                                                    style={{
                                                                        color: "#9B9B9B",
                                                                        fontSize: "0.8rem"
                                                                    }}
                                                                >
                                                                    {booking.date_prestation} -{" "}
                                                                    {moment(booking.time_prestation).format(
                                                                        "HH:mm"
                                                                    )}
                                                                </Typography>
                                                                <Typography
                                                                    style={{
                                                                        color: "#9B9B9B",
                                                                        fontSize: "0.8rem"
                                                                    }}
                                                                >
                                                                    {booking.service}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} style={{}}>
                                                                <Typography
                                                                    style={{
                                                                        color: "#4FBDD7",
                                                                        fontWeight: "600",
                                                                        paddingTop: "5%",
                                                                        textAlign: "center"
                                                                    }}
                                                                >
                                                                    {
                                                                        booking.amount.match(
                                                                            /^-?\d+(?:\.\d{0,2})?/
                                                                        )[0]
                                                                    }
                                                                    €
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} style={{}}>
                                                                <Link
                                                                    href={{
                                                                        pathname:
                                                                            "/reservations/detailsReservation",
                                                                        query: { id: booking._id, user: true }
                                                                    }}
                                                                >
                                                                <Typography
                                                                    className={classes.mobilevoir}
                                                                    style={{
                                                                        height: "45px",
                                                                        backgroundColor: "#2FBCD3",
                                                                        color: "white",
                                                                        textAlign: "center",
                                                                        cursor: "pointer",
                                                                        lineHeight: "3",
                                                                        marginTop: "5%"
                                                                    }}
                                                                >

                                                                        <a
                                                                            style={{
                                                                                textDecoration: "none",
                                                                                color: "white"
                                                                            }}
                                                                        >
                                                                            Voir
                                                                        </a>
                                                                </Typography>
                                                                    </Link>
                                                            </Grid>
                                                        </Grid>
                                                    </React.Fragment>
                                                );
                                            })
                                        ) : (
                                            <p>
                                                Vous n'avez aucune réservation en tant qu'utilisateur
                                            </p>
                                        )}
                                    </React.Fragment>
                                ) : this.state.alfredReservations.length ? (
                                    this.state.alfredReservations.map(booking => {
                                        return (
                                            <React.Fragment>
                                                {/* Web */}
                                                <Grid
                                                    container
                                                    className={classes.webrow}
                                                    style={{ borderBottom: "1px #8281813b solid" }}
                                                >
                                                    <Grid
                                                        item
                                                        xs={2}
                                                        md={1}
                                                        style={{ marginRight: "5%" }}
                                                    >
                                                        <UserAvatar user={booking.user} />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={5}
                                                        md={6}
                                                        style={{
                                                            paddingRight: "5%",
                                                            paddingLeft: "5%",
                                                            fontSize: "0.8rem"
                                                        }}
                                                    >
                                                        <Typography
                                                            style={{
                                                                marginTop: "2%",
                                                                fontSize: "0.8rem",
                                                                color:
                                                                    booking.status === "Confirmée"
                                                                        ? "#419F41"
                                                                        : booking.status ===
                                                                        "En attente de confirmation" ||
                                                                        booking.status === "Demande d'infos"
                                                                        ? "#F87280"
                                                                        : booking.status === "Pré-approuvée"
                                                                            ? "#F89B72"
                                                                            : "#5D5D5D"
                                                            }}
                                                        >
                                                            {booking.status} - {booking.user.firstname}
                                                        </Typography>
                                                        <Typography
                                                            style={{ color: "#9B9B9B", fontSize: "0.8rem" }}
                                                        >
                                                            {booking.date_prestation} -{" "}
                                                            {moment(booking.time_prestation).format("HH:mm")}
                                                        </Typography>
                                                        <Typography
                                                            style={{ color: "#9B9B9B", fontSize: "0.8rem" }}
                                                        >
                                                            {booking.service}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2} style={{}}>
                                                        <Typography
                                                            style={{
                                                                color: "#4FBDD7",
                                                                fontWeight: "600",
                                                                paddingTop: "15%"
                                                            }}
                                                        >
                                                            {(booking.amount - booking.fees * 2).toFixed(2)}€
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2} style={{}}>
                                                        <Link
                                                            href={{
                                                                pathname: "/reservations/detailsReservation",
                                                                query: { id: booking._id, user: true }
                                                            }}
                                                        >
                                                        <Typography
                                                            className={classes.webvoir}
                                                            style={{
                                                                height: "45px",
                                                                backgroundColor: "#2FBCD3",
                                                                color: "white",
                                                                textAlign: "center",
                                                                cursor: "pointer",
                                                                lineHeight: "3",
                                                                marginTop: "15%"
                                                            }}
                                                        >

                                                                <a
                                                                    style={{
                                                                        textDecoration: "none",
                                                                        color: "white"
                                                                    }}
                                                                >
                                                                    Voir la réservation
                                                                </a>
                                                        </Typography>
                                                            </Link>
                                                    </Grid>
                                                </Grid>

                                                {/* Mobile */}
                                                <Grid
                                                    container
                                                    className={classes.mobilerow1}
                                                    style={{
                                                        boxShadow: "0px 0px 6px lightgray",
                                                        borderRadius: "5px",
                                                        width: "90%",
                                                        margin: "15px auto"
                                                    }}
                                                >
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        style={{ textAlign: "center", marginTop: "15px" }}
                                                    >
                                                        <UserAvatar user={booking.user} />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        style={{ textAlign: "center", fontSize: "0.8rem" }}
                                                    >
                                                        <Typography
                                                            style={{
                                                                marginTop: "2%",
                                                                fontSize: "0.8rem",
                                                                color:
                                                                    booking.status === "Confirmée"
                                                                        ? "#419F41"
                                                                        : booking.status ===
                                                                        "En attente de confirmation" ||
                                                                        booking.status === "Demande d'infos"
                                                                        ? "#F87280"
                                                                        : booking.status === "Pré-approuvée"
                                                                            ? "#F89B72"
                                                                            : "#5D5D5D"
                                                            }}
                                                        >
                                                            {booking.status} - {booking.user.firstname}
                                                        </Typography>
                                                        <Typography
                                                            style={{ color: "#9B9B9B", fontSize: "0.8rem" }}
                                                        >
                                                            {booking.date_prestation} -{" "}
                                                            {moment(booking.time_prestation).format("HH:mm")}
                                                        </Typography>
                                                        <Typography
                                                            style={{ color: "#9B9B9B", fontSize: "0.8rem" }}
                                                        >
                                                            {booking.service}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{}}>
                                                        <Typography
                                                            style={{
                                                                color: "#4FBDD7",
                                                                fontWeight: "600",
                                                                paddingTop: "5%",
                                                                textAlign: "center"
                                                            }}
                                                        >
                                                            {(booking.amount - booking.fees * 2).toFixed(2)}€
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{}}>
                                                        <Link
                                                            href={{
                                                                pathname: "/reservations/detailsReservation",
                                                                query: { id: booking._id, user: true }
                                                            }}
                                                        >
                                                        <Typography
                                                            className={classes.mobilevoir}
                                                            style={{
                                                                height: "45px",
                                                                backgroundColor: "#2FBCD3",
                                                                color: "white",
                                                                textAlign: "center",
                                                                cursor: "pointer",
                                                                lineHeight: "3",
                                                                marginTop: "5%"
                                                            }}
                                                        >

                                                                <a
                                                                    style={{
                                                                        textDecoration: "none",
                                                                        color: "white"
                                                                    }}
                                                                >
                                                                    Voir
                                                                </a>
                                                        </Typography>
                                                            </Link>
                                                    </Grid>
                                                </Grid>
                                            </React.Fragment>
                                        );
                                    })
                                ) : (
                                    <p>Vous n'avez aucune réservation en tant qu'Alfred</p>
                                )}
                            </Grid>
                        </Grid>

                        {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
                    </Grid>
                </Layout>
                {this.state.isAlfred ? (
                  <NavbarMobile userId={this.state.user}/>
                ) : null}
            </Fragment>
        );
    }
}

export default withStyles(styles)(AllReservations);
