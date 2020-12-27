import * as React from "react";
import { Sidebar,Layout , AppBar, UserMenu, MenuItemLink,fetchUtils,Admin,Login, Resource } from 'react-admin';
import { UserList } from './app/components/users'
import { ProjectList, ProjectEdit, ProjectCreate,ProjectIcon } from './app/components/projects';
import { SupplierList,SupplierEdit,SupplierCreate,SupplierIcon } from './app/components/suppliers';
import simpleRestProvider from 'ra-data-simple-rest';
import { makeStyles } from '@material-ui/core/styles';
//import myDataProvider from './app/auth/dataProvider';
//import authProvider from './app/auth/authProvider';
import basicAuthProvider from './app/providers/basicAuth';
import Dashboard from './app/components/Dashboard';
import  Menu from './app/components/Menu';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import SettingsIcon from "@material-ui/icons/Settings";

//const dataProvider = myDataProvider('http://localhost:2000/api/v1');

import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3d5afe',
    },
    secondary: {
      main: '#3f51b5',
    },
  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});


const MyUserMenu = props => (
  <UserMenu {...props}>
    <MenuItemLink
      to="/configuration"
      primaryText="Configuration"
      leftIcon={<SettingsIcon />}
    />
  </UserMenu>
);
const useSidebarStyles = makeStyles({
  
      backgroundColor: 'red',
  
});
const MySidebar = props => {
  const classes = useSidebarStyles();
  return (
      <Sidebar classes={classes} {...props} />
  );
};
const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} color="primary" />;

const MyLayout = props => <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} />;





function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const MyLoginPage = () => (
  <Login
      // A random image that changes everyday
      backgroundImage="https://source.unsplash.com/random/1600x900/daily"
  />
);


const httpClient = (url, options = {}) => {
   
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const { token } = JSON.parse(localStorage.getItem('jwtToken'));
  
  options.headers.set('Authorization', `Bearer ${token}`);
   
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider('http://localhost:2000/api/v1',httpClient);

const App = () => (
   <Admin theme={theme} layout={MyLayout} loginPage={MyLoginPage} dashboard={Dashboard} authProvider={basicAuthProvider} dataProvider={dataProvider} >
       <Resource name="users" list={UserList} />
       <Resource name="projects" list={ProjectList} create={ProjectCreate} edit={ProjectEdit} icon={ProjectIcon}/>
       <Resource name="suppliers"  list={SupplierList} create={SupplierCreate} edit={SupplierEdit} icon={SupplierIcon} />
       <Copyright />
   </Admin>
   
);

export default App;