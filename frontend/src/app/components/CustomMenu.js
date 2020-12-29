import * as React from 'react';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { MenuItemLink,DashboardMenuItem, getResources } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import LabelIcon from '@material-ui/icons/Label';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Divider from '@material-ui/core/Divider';

const Menu = ({ onMenuClick, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <div className="firdousmenu">
  
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <Divider light />
            <MenuItemLink
                to="/accounts"
                primaryText="Accounts"
                leftIcon={<AccountBalanceWalletIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {resources.map(resource => (
                <div>
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options && resource.options.label) ||
                        resource.name
                    }
                    leftIcon={
                        resource.icon ? <resource.icon /> : <DefaultIcon />
                    }
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    
                />
                <Divider light />
               </div>
                
            ))}
            
            <Divider light />
            <MenuItemLink
                to="/custom-route"
                primaryText="Miscellaneous"
                leftIcon={<LabelIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            <MenuItemLink
        to="/help-center"
        primaryText="Settings"
        leftIcon={<SettingsIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        />
            {isXSmall && logout}
        </div>
    );
};

export default Menu;