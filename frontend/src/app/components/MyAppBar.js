import * as React from 'react';
import { AppBar  , UserMenu, MenuItemLink } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from "@material-ui/icons/Settings";
import Logo from './Logo';

const MyUserMenu = props => (
    <UserMenu {...props}>
      <MenuItemLink
        to="/configuration"
        primaryText="Configuration"
        leftIcon={<SettingsIcon />}
      />
    </UserMenu>
  );
const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingLeft:'8px',
    },
    spacer: {
        flex: 0.13,
    },
});

const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props} userMenu={<MyUserMenu />}>
            
            <Logo />
            {/* <span className={classes.spacer} /> */}
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            
            
        </AppBar>
    );
};

export default MyAppBar;