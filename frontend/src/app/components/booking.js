import { makeStyles, useMediaQuery } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { makeStyles, Chip,useMediaQuery, Button } from '@material-ui/core';
import { Notes, Schedule } from "@material-ui/icons";

export const BookingIcon = ListAltIcon;
const useStyles = makeStyles({
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});

export const BookingActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        {/* <ShowButton basePath={basePath} record={data} /> */}
    </TopToolbar>
);

const BookingSearchFilter = (props) => (

    <Filter {...props}>
        <SearchInput variant="standard" placeholder="Title" source="title" alwaysOn />
        <SearchInput variant="standard" placeholder="SCode" source="scode" alwaysOn />
        <SearchInput variant="standard" placeholder="Code" source="code" alwaysOn />
    </Filter>

);

export const BookingList = props => (
    <List filters={<BookingSearchFilter />} {...props}>
        {useMediaQuery(theme => theme.breakpoints.down("sm")) ? (
            <SimpleList
                primaryText={record => record.title}
                secondaryText={record => `${record.code}`}
                tertiaryText={record => record.id}

            />
        ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="code" />
                    <TextField source="scode" />
                    <TextField source="title" />
                    <TextField source="remarks" />
                    <TextField source="active" />
                    <EditButton variant="contained" color="secondary" />
                    <DeleteButton />
                </Datagrid>)}
    </List>
);

const BookingTitle = ({ record }) => {
    return <span>Booking {record ? `"${record.title}"` : ''}</span>;
};

export const BookingEdit = (props) => {
    const classes = useStyles();
    return (
    
    <Edit undoable={false} actions={<BookingActions />} title={<BookingTitle />} {...props}>
        <SimpleForm variant="standard" margin="none"    >
            <TextInput disabled source="id" formClassName={classes.inlineBlock} />
            <TextInput source="code" formClassName={classes.inlineBlock} />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ 
            formClassName={classes.inlineBlock}/>
            <TextInput multiline source="title"  />
            <TextInput source="unit" formClassName={classes.inlineBlock}/> 
            <TextInput source="client"  formClassName={classes.inlineBlock}/>
            <TextInput source="book_date"  formClassName={classes.inlineBlock}/>
            <TextInput source="sale_price" formClassName={classes.inlineBlock}/>
            <TextInput source="discount" formClassName={classes.inlineBlock}/>
            <TextInput source="remarks" formClassName={classes.inlineBlock}/>
            <TextInput source="name" formClassName={classes.inlineBlock}/>
            <TextInput source="father_name" formClassName={classes.inlineBlock}/>
            <TextInput source="residential_address" formClassName={classes.inlineBlock}/>
            <TextInput source="phone_no" formClassName={classes.inlineBlock}/>
            <TextInput source="occupation" formClassName={classes.inlineBlock}/>
            <TextInput source="nationality" formClassName={classes.inlineBlock}/>
            <TextInput source="reference_off" formClassName={classes.inlineBlock}/>
            <TextInput source="nominee_name" formClassName={classes.inlineBlock}/>
            <TextInput source="relation" formClassName={classes.inlineBlock}/>
            <TextInput source="cnic" formClassName={classes.inlineBlock}/>
            <TextInput source="project" formClassName={classes.inlineBlock}/>
            <TextInput source="email" formClassName={classes.inlineBlock}/>
            <BooleanInput  source="active" formClassName={classes.inlineBlock}/>
            
            </SimpleForm>
    </Edit>
)};

export const BookingCreate = (props) => (
    <Create undoable={false} actions={<BookingActions />} title="New Booking" {...props}>
        <SimpleForm variant="standard">
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <TextInput source="scode" /*options={{ multiLine: true }}*/ />
            <TextInput multiline source="title" />
            <TextInput source="unit" />
            <TextInput source="client" />
            <TextInput source="book_date" />
            <TextInput source="sale_price" />
            <TextInput source="discount" />
            <TextInput source="remarks" />
            <TextInput source="name" />
            <TextInput source="father_name" />
            <TextInput source="residential_address" />
            <TextInput source="phone_no" />
            <TextInput source="occupation" />
            <TextInput source="nationality" />
            <TextInput source="reference_off" />
            <TextInput source="nominee_name" />
            <TextInput source="relation" />
            <TextInput source="cnic" />
            <TextInput source="project" />
            <TextInput source="email" />
            <BooleanInput  source="active" />
            <Button source = "Schedule" />
        </SimpleForm>
    </Create>
);