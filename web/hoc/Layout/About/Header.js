import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {NAVBAR_MENU} from "../../../utils/i18n";
import Link from '../../../components/Link/Link'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withStyles} from "@material-ui/core/styles";
import styles from '../../../static/css/pages/homePage/index';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            searchBar: false,
            aboutMenu: false,
            becomeAlfredMenu: false,
            active: false,
            classNameMenu: ''
        }

    }

    render() {

        const {classes} = this.props;
        let {title, content, searchBar, aboutMenu, becomeAlfredMenu, active, classNameMenu} = this.state;
        if (process.browser) {
            if (window.location.pathname === '/footer/apropos') {
                title = 'Nos valeurs';
                content = 'd\'entreprise mais surtout d\'humain';
                aboutMenu = true;
                classNameMenu = classes.menuHeaderActive;

            } else if (window.location.pathname === '/footer/ourCommunity') {
                title = 'Notre Communauté';
                content = 'Qui nous fait vivre';
                aboutMenu = true;
                classNameMenu = classes.menuHeaderActive;

            } else if (window.location.pathname === '/footer/ourTeam') {
                title = 'Notre Équipe';
                content = 'Qui nous fait vivre';
                aboutMenu = true;
                classNameMenu = classes.menuHeaderActive;

            } else if (window.location.pathname === '/faq/home') {
                title = 'FAQ';
                content = 'Pour trouver vos réponses';
            } else if (window.location.pathname === '/footer/becomeAlfred') {
                title = 'Devenir un Alfred';
                content = 'les bases'
            }
        }
        return (

            <Grid>
                <Grid style={{
                    backgroundImage: "url('../../../static/assets/img/footer/footerBanner.svg')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%'
                }}><Link href={'/'}>
                    <Grid style={{
                        display: 'flex',
                        color: 'white',
                        padding: '15px'
                    }}>
                        <ArrowBackIcon style={{
                            marginTop: '12px'
                        }}/>
                        <p>Retour sur My Alfred</p>
                    </Grid>
                </Link>
                    <Grid style={{color: 'white', textAlign: 'center', lineHeight: '0.6em'}}>
                        <h3 style={{
                            paddingTop: '30px',
                            fontSize: '1.5vw'
                        }}>{title}</h3>
                        <p style={{
                            paddingBottom: '100px'
                        }}>{content}</p>
                    </Grid>
                </Grid>
                {
                    aboutMenu ?

                        <Tabs style={{padding: '-150px 0 0 0'}} aria-label="simple tabs example">
                            <div style={{margin: '0 auto'}}>
                                <Link href={'/footer/apropos'}>
                                    <Tab className={classNameMenu}
                                         label={NAVBAR_MENU.aboutUs}/>
                                </Link>
                                <Link href={'/footer/ourCommunity'}>
                                    <Tab className={classNameMenu}
                                         label={NAVBAR_MENU.ourCom}/>
                                </Link>
                                <Link href={'/footer/ourTeam'}>
                                    <Tab className={classNameMenu}
                                         label={NAVBAR_MENU.ourTeam}/>
                                </Link>
                            </div>
                        </Tabs>
                        : null}
            </Grid>
        )

    }

}


export default withStyles(styles)(Header);
