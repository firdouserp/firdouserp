import * as React from "react";
import { Sidebar,Layout ,fetchUtils,Admin,Login, Resource } from 'react-admin';
import { UserList } from './app/components/users'
import { ProjectList, ProjectEdit, ProjectCreate,ProjectIcon } from './app/components/projects';
import { SupplierList,SupplierEdit,SupplierCreate,SupplierIcon } from './app/components/suppliers';
import { UnitsList, UnitsEdit, UnitsCreate,UnitsIcon } from './app/components/units';
import { StockList, StockEdit, StockCreate,StockIcon } from './app/components/stock';
import { CoaList, CoaEdit, CoaCreate,CoaIcon } from './app/components/coa';
import { Coa_typeList, Coa_typeEdit, Coa_typeCreate,Coa_typeIcon } from './app/components/coa_type';
import { NotesList, NotesEdit, NotesCreate,NotesIcon } from './app/components/notes';
import { VouchersList, VouchersEdit, VouchersCreate,VouchersIcon } from './app/components/vouchers';
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
import customRoutes from './app/components/customRoutes';
import MyDataProvider from './app/providers/MyDataProvider';



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
  sidebar: {
    
    
  },
  overrides: {
    MuiTableRow: {
      root: {
        height: 20,
      }},
      
    RaSidebar: {
      root:{paddingTop: '1em',},

      drawerPaper: {
        backgroundColor: '#fff',
        color: '#3d5afe',
        height: "100%",
        firdousmenu:{
          //paddingTop:'10px',
        }
        
      },
    },
    RaLayout:{
      root: {
     
    },
    },
      RaList: {
      root: {
          border: '1px solid #e0e0e3',
          backgroundColor:'#fcfcfc',
          color:'#fff',
          padding:'10px'
      },

  }, RaEdit: {
    root: {
        border: '1px solid #e0e0e3',
        backgroundColor:'#fcfcfc',
        color:'#fff',
        padding:'10px',
       
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
      <Link color="inherit" href="https://firdouserp.pk/">
        FirdousERP 
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
const dataProvider = MyDataProvider;

const App = () => (
  
   <Admin customRoutes={customRoutes} theme={theme} layout={MyLayout} loginPage={MyLoginPage} dashboard={Dashboard}
    authProvider={basicAuthProvider} dataProvider={dataProvider} >
       
       <Resource name="Projects" list={ProjectList} create={ProjectCreate} edit={ProjectEdit} icon={ProjectIcon}/>
       <Resource name="Suppliers"  list={SupplierList} create={SupplierCreate} edit={SupplierEdit} icon={SupplierIcon} />
       <Resource name="Units"  list={UnitsList} create={UnitsCreate} edit={UnitsEdit} icon={UnitsIcon} />
       <Resource name="Stock"  list={StockList} create={StockCreate} edit={StockEdit} icon={StockIcon} />
       <Resource name="Coa"  list={CoaList} create={CoaCreate} edit={CoaEdit} icon={CoaIcon} />
       <Resource name="Coa_type"  list={Coa_typeList} create={Coa_typeCreate} edit={Coa_typeEdit} icon={Coa_typeIcon} />
       <Resource name="Notes"  list={NotesList} create={NotesCreate} edit={NotesEdit} icon={NotesIcon} />
       <Resource name="Vouchers"  list={VouchersList} create={VouchersCreate} edit={VouchersEdit} icon={VouchersIcon} />
       <Resource name="Users" list={UserList} />
       <Resource name="Test" />
       
   </Admin>
   
   
);

export default App;