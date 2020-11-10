import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ScrollMenu from '../../../components/ScrollMenu/SrollMenu';
import layoutStyle from '../../../static/css/pages/layout/layoutStyle'
import {NAVBAR_MENU} from "../../../utils/i18n";
import Apropos from "../../../pages/footer/apropos";
import Link from 'next/link';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    label: 'A propos',
                    url: '/apropos'
                },
                {
                    label: 'Notre communauté',
                    url: '/communaute'
                },
                {
                    label: 'Notre équipe',
                    url: 'equipe'
                }
            ]
        }
    }

    render() {
        const {items} = this.state
        const {children, index} = this.props;
        return (

            <Grid>
                <Grid style={{
                    backgroundImage: "url('../../../static/assets/img/homePage/illuHeader.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%'
                }}><Link href={'/'}>
                    <Grid style={{
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'start',
                        margin: '0 50px',
                        paddingTop: '10px'
                    }}
                          className={layoutStyle.navbarLogoContainer}>
                        <img style={{width: '2%', marginRight: '10px'}}
                             src='../../../static/assets/icon/left-arrow.svg'></img>
                        <p>Retour sur My Alfred</p>
                    </Grid>
                </Link>
                    <Grid style={{color: 'white', textAlign: 'center', lineHeight: '0.6em'}}>
                        <h3 style={{
                            paddingTop: '30px'
                        }}>Nos valeurs</h3>
                        <p style={{
                            paddingBottom: '100px'
                        }}>d'entreprise mais surtout d'humain</p>
                    </Grid>
                </Grid>

                <Tabs style={{padding: '-150px 0 0 0'}} aria-label="simple tabs example">
                    <div style={{margin: '0 auto'}}>
                        <Link href={'/footer/apropos'}>
                            <Tab classes={{root: layoutStyle.navbarTabRootSelected}}
                                 label={NAVBAR_MENU.aboutUs}/>
                        </Link>
                        <Link href={'/footer/ourcommunauty'}>
                            <Tab classes={{root: layoutStyle.navBarTabAbout}}
                                 label={NAVBAR_MENU.ourCom}/>
                        </Link>
                        <Link href={'/footer/ourteam'}>
                            <Tab classes={{root: layoutStyle.navBarTabAbout}}
                                 label={NAVBAR_MENU.ourTeam}/>
                        </Link>
                    </div>
                </Tabs>
                {/*<Grid>*/
                }
                {/*    <ScrollMenu style={{margin: '0 auto'}} categories={items} mode={Apropos} indexCat={index}/>*/
                }
                {/*</Grid>*/
                }
            </Grid>
        )
    }

}

export default Header;
