import * as React from "react";
import { fetchUtils,Admin,Login, Resource } from 'react-admin';
import { UserList } from './app/components/users'
import { ProjectList, ProjectEdit, ProjectCreate } from './app/components/projects'
import { SupplierList,SupplierEdit,SupplierCreate } from './app/components/suppliers'
import simpleRestProvider from 'ra-data-simple-rest';
//import myDataProvider from './app/auth/dataProvider';
//import authProvider from './app/auth/authProvider';
import basicAuthProvider from './app/providers/basicAuth';
import Dashboard from './app/components/Dashboard';
import  Menu from './app/components/Menu';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

//const dataProvider = myDataProvider('http://localhost:2000/api/v1');


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
   <Admin loginPage={MyLoginPage} dashboard={Dashboard} authProvider={basicAuthProvider} dataProvider={dataProvider} >
       <Resource name="users" list={UserList} />
       <Resource name="projects" list={ProjectList} create={ProjectCreate} edit={ProjectEdit}/>
       <Resource name="suppliers"  list={SupplierList} create={SupplierCreate} edit={SupplierEdit} />
       <Copyright />
   </Admin>
   
);

export default App;