import React from 'react';
import { AppBar, UserMenu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';




/*const styles = {
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
};*/

const CustomUserMenu = ({  ...props }) => (
    <UserMenu {...props}>
        <MenuItemLink
            to="/configuration"
            primaryText={"Configuration"}
            leftIcon={<SettingsIcon />}
        />
    </UserMenu>
);

const CustomAppBar = ({ ...props }) => (
    <AppBar {...props} userMenu={<CustomUserMenu />}>

    </AppBar>
);

export default CustomAppBar;
