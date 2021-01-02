import OrderIcon from '@material-ui/icons/AttachMoney';
import ReviewIcon from '@material-ui/icons/Comment';
import InvoiceIcon from '@material-ui/icons/LibraryBooks';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    DashboardMenuItem,
    MenuItemLink,
    Responsive, translate
} from 'react-admin';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import SubMenu from './SubMenu';

class Menu extends Component {
    state = {
        menuCatalog: false,
        menuSales: false,
        menuCustomers: false,
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    render() {
        const { onMenuClick, open, logout, translate } = this.props;
        return (
            <div>
                {' '}
                <DashboardMenuItem onClick={onMenuClick} />
                <SubMenu
                    handleToggle={() => this.handleToggle('menuSales')}
                    isOpen={this.state.menuSales}
                    sidebarIsOpen={open}
                    name="pos.menu.sales"
                    icon={OrderIcon}
                >
                    <MenuItemLink
                        to={`/commands`}
                        primaryText={translate(`resources.commands.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={OrderIcon}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/invoices`}
                        primaryText={translate(`resources.invoices.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={InvoiceIcon}
                        onClick={onMenuClick}
                    />
                </SubMenu>

                <MenuItemLink
                    to={`/reviews`}
                    primaryText={translate(`resources.reviews.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={ReviewIcon}
                    onClick={onMenuClick}
                />
                <Responsive
                    xsmall={
                        <MenuItemLink
                            to="/configuration"
                            primaryText={translate('pos.configuration')}
                            leftIcon={<SettingsIcon />}
                            onClick={onMenuClick}
                        />
                    }
                    medium={null}
                />
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(Menu);