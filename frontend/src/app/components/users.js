// in src/users.js
import * as React from "react";
import { Datagrid, EmailField, List, TextField } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="last_name" />
            <TextField source="first_name" />
            <EmailField source="email" />
            <TextField source="username" />
            <TextField source="role" />
            <TextField source="age" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);