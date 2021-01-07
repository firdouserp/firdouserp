import Link from "@material-ui/core/Link";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import simpleRestProvider from "ra-data-simple-rest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import * as React from "react";
import {
  Admin,
  fetchUtils,
  Layout,
  Login,
  Resource,
  Sidebar
} from "react-admin";
import "./App.css";
import {
  BookingCreate,
  BookingEdit,
  BookingIcon,
  BookingList
} from "./app/components/booking";
import { CoaCreate, CoaEdit, CoaIcon, CoaList } from "./app/components/coa";
import {
  Coa_typeCreate,
  Coa_typeEdit,
  Coa_typeIcon,
  Coa_typeList
} from "./app/components/coa_type";
import Menu from "./app/components/CustomMenu";
import customRoutes from "./app/components/customRoutes";
import Dashboard from "./app/components/Dashboard";
import {
  EmployeesCreate,
  EmployeesEdit,
  EmployeesIcon,
  EmployeesList
} from "./app/components/employees";
import MyAppBar from "./app/components/MyAppBar";
import {
  NotesCreate,
  NotesEdit,
  NotesIcon,
  NotesList
} from "./app/components/notes";
import {
  ProjectCreate,
  ProjectEdit,
  ProjectIcon,
  ProjectList
} from "./app/components/projects";
import {
  ScheduleCreate,
  ScheduleEdit,
  ScheduleIcon,
  ScheduleList
} from "./app/components/schedule";
import {
  StockCreate,
  StockEdit,
  StockIcon,
  StockList
} from "./app/components/stock";
import {
  SupplierCreate,
  SupplierEdit,
  SupplierIcon,
  SupplierList
} from "./app/components/suppliers";
import {
  UnitsCreate,
  UnitsEdit,
  UnitsIcon,
  UnitsList
} from "./app/components/units";
import { UserList } from "./app/components/users";
import {
  VouchersCreate,
  VouchersEdit,
  VouchersIcon,
  VouchersList
} from "./app/components/vouchers";
//import myDataProvider from './app/auth/dataProvider';
//import authProvider from './app/auth/authProvider';
import basicAuthProvider from "./app/providers/basicAuth";




const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#3f51b5",
    },
  },
  spacing: 8,
  sidebar: {
    //root:{backgroundColor: '#fff',}
  },

  overrides: {
    MuiTableRow: {
      root: {
        height: 20,
      },
    },

    RaSidebar: {
      // boxShadow:
      //     "2px 0px 1px -1px rgba(0,0,0,0.2), 1px 0px 3px 0px rgba(0,0,0,0.1)",
      drawerPaper: {
        backgroundColor: "#022f5a",
        color: "#ffffff",
        height: "100%",
        paddingTop: "1em",
        "@media (min-width: 0px)": {
          backgroundColor: "#022f5a",
        },
      },
    },
    RaCreate: {
      noActions: {
        "@media (min-width: 600px)": {
          marginTop: 0,
        },
      },
    },

    RaSimpleFormIterator: {
      form: {
        display: "flex",
      },
      RaFormInput: {
        input: {
          width: "100%",
        },
      },
    },
    RaLayout: {
      content: {
        //paddingTop: '2em',
        paddingTop: "1em",
      },
    },
    RaList: {
      root: {
        border: "1px solid #e0e0e3",
        backgroundColor: "#fcfcfc",
        color: "#fff",
        padding: "10px",
      },
    },
    RaEdit: {
      root: {
        border: "1px solid #e0e0e3",
        backgroundColor: "#fcfcfc",
        color: "#fff",
        padding: "10px",
      },
      RaTopToolbar: {
        root: { padding: "0px" },
      },
    },
    MuiDivider: {
      light: { backgroundColor: "#6868681f" },
    },
    RaMenuItemLink: {
      root: {
        color: "#fff",
        "&:hover": {
          background: "#007eff",
        },
      },

      active: {
        borderLeftStyle: "solid",
        backgroundColor: "#007eff",
        borderRightStyle: "solid",
        color: "#fff",
        fontWeight: "bold",
      },
      icon: {
        color: "inherit",
      },
    },
  },

  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const useSidebarStyles = makeStyles({});
const MySidebar = (props) => {
  const classes = useSidebarStyles();
  return <Sidebar {...props} />;
};
//const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} color="primary" />;

const MyLayout = (props) => (
  <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} menu={Menu} />
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://firdouserp.pk/">
        FirdousERP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
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
    options.headers = new Headers({ Accept: "application/json" });
  }
  const { token } = JSON.parse(localStorage.getItem("jwtToken"));

  options.headers.set("Authorization", `Bearer ${token}`);

  return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider(
  "http://localhost:2000/api/v1",
  httpClient
);

const messages = {
  en: englishMessages,
};

const i18nProvider = polyglotI18nProvider((locale) => messages[locale], "en", {
  allowMissing: true,
});

const App = () => (
  <Admin
    //i18nProvider={i18nProvider}
    customRoutes={customRoutes}
    theme={theme}
    layout={MyLayout}
    loginPage={MyLoginPage}
    dashboard={Dashboard}
    authProvider={basicAuthProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="Projects"
      list={ProjectList}
      create={ProjectCreate}
      edit={ProjectEdit}
      icon={ProjectIcon}
    />
    <Resource
      name="Suppliers"
      list={SupplierList}
      create={SupplierCreate}
      edit={SupplierEdit}
      icon={SupplierIcon}
    />
    <Resource
      name="Units"
      list={UnitsList}
      create={UnitsCreate}
      edit={UnitsEdit}
      icon={UnitsIcon}
    />
    <Resource
      name="Stock"
      list={StockList}
      create={StockCreate}
      edit={StockEdit}
      icon={StockIcon}
    />
    <Resource
      name="Coa"
      list={CoaList}
      create={CoaCreate}
      edit={CoaEdit}
      icon={CoaIcon}
    />
    <Resource
      name="Coa_type"
      list={Coa_typeList}
      create={Coa_typeCreate}
      edit={Coa_typeEdit}
      icon={Coa_typeIcon}
    />
    <Resource
      name="Notes"
      list={NotesList}
      create={NotesCreate}
      edit={NotesEdit}
      icon={NotesIcon}
    />
    <Resource
      name="Vouchers"
      list={VouchersList}
      create={VouchersCreate}
      edit={VouchersEdit}
      icon={VouchersIcon}
    />
    <Resource
      name="Booking"
      list={BookingList}
      create={BookingCreate}
      edit={BookingEdit}
      icon={BookingIcon}
    />
     <Resource
      name="Employees"
      list={EmployeesList}
      create={EmployeesCreate}
      edit={EmployeesEdit}
      icon={EmployeesIcon}
    />
     <Resource
      name="Schedule"
      list={ScheduleList}
      create={ScheduleCreate}
      edit={ScheduleEdit}
      icon={ScheduleIcon}
    />

    <Resource name="Users" list={UserList} />
    <Resource name="Userform" />
  </Admin>
);

export default App;
