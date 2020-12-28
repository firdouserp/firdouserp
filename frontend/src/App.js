import * as React from "react";
import { Sidebar,Layout ,fetchUtils,Admin,Login, Resource } from 'react-admin';
import { UserList } from './app/components/users'
import { ProjectList, ProjectEdit, ProjectCreate,ProjectIcon } from './app/components/projects';
import { SupplierList,SupplierEdit,SupplierCreate,SupplierIcon } from './app/components/suppliers';
import { UnitsList, UnitsEdit, UnitsCreate,UnitsIcon } from './app/components/units';
import { StockList, StockEdit, StockCreate,StockIcon } from './app/components/stock';
import { CoaList, CoaEdit, CoaCreate,CoaIcon } from './app/components/coa';
import simpleRestProvider from 'ra-data-simple-rest';
import { makeStyles } from '@material-ui/core/styles';
//import myDataProvider from './app/auth/dataProvider';
//import authProvider from './app/auth/authProvider';
import basicAuthProvider from './app/providers/basicAuth';
import Dashboard from './app/components/Dashboard';
import  Menu from './app/components/CustomMenu';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import MyAppBar from './app/components/MyAppBar';

//const dataProvider = myDataProvider('http://localhost:2000/api/v1');

import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
  spacing:8,
  sidebar: {},
  overrides: {
    MuiTableRow: {
      root: {
        height: 20,
      }},
    RaSidebar: {
      spacing:6,
      paddingRight:'5px',
      drawerPaper: {
        backgroundColor: '#fff',
        color: '#3d5afe',
        height: "100%",
       
        
      },
    },
      RaList: {
      root: {
          border: '1px solid #e0e0e3',
          backgroundColor:'#fcfcfc',
          color:'#fff',
          padding:'15px'
      },

  }, RaEdit: {
    root: {
        border: '1px solid #e0e0e3',
        backgroundColor:'#fcfcfc',
        color:'#fff',
        padding:'15px',
       
    },
    RaTopToolbar:{
      backgroundColor:'green'
    }
},
    RaMenuItemLink: {
      active: {
        borderLeftStyle: "none",

        borderRightStyle: "solid",
        color: '#3d5afe',
        fontWeight: 'bold',
      },
      icon: {
        color: "inherit",
      }
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



const useSidebarStyles = makeStyles({
  
      backgroundColor: 'red',
  
});
const MySidebar = props => {
  const classes = useSidebarStyles();
  return (
      <Sidebar classes={classes} {...props} />
  );
};
//const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} color="primary" />;

const MyLayout = props => <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} menu={Menu}  />;





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
       <Resource name="Users" list={UserList} />
       <Resource name="Projects" list={ProjectList} create={ProjectCreate} edit={ProjectEdit} icon={ProjectIcon}/>
       <Resource name="Suppliers"  list={SupplierList} create={SupplierCreate} edit={SupplierEdit} icon={SupplierIcon} />
       <Resource name="Units"  list={UnitsList} create={UnitsCreate} edit={UnitsEdit} icon={UnitsIcon} />
       <Resource name="Stock"  list={StockList} create={StockCreate} edit={StockEdit} icon={StockIcon} />
       <Resource name="Coa"  list={CoaList} create={CoaCreate} edit={CoaEdit} icon={CoaIcon} />
       <Copyright />
   </Admin>
   
);

export default App;