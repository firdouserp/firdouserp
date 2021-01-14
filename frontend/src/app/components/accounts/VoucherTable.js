import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import React from "react";



const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 400
  },
  selectTableCell: {
    //width: 60
  },
  tableCell: {
    //width: 130,
    //height: 40
  },
  input: {
    //width: 130,
    //height: 40
  }
}));

const newRow = (srno, account, refno, chqno, description, debit, credit) => ({
  id: srno,
  srno,
  account,
  refno,
  chqno,
  description,
  debit,
  credit,
  isEditMode: false,
  isNew: true,
  isDeleted: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
          row[name]
        )}
    </TableCell>
  );
};

const VoucherTable = () => {
  const [rows, setRows] = React.useState([
    newRow(1, "", "", "", "", 0.0, 0.0),
  ]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = id => {
    setRows(state => {
      const tm = rows.find((row) => row.id == id);
      if (tm && tm.isNew && !tm.isDeleted) {
        tm.isNew = false;
        rows.push(newRow(tm.srno + 1, "", "", "", "", 0.0, 0.0));
      }

      return rows.map(row => {
        if (row.id === id) {
          if (row.isNew && !tm.isDeleted) {
            row.isNew = false;
          }
          return { ...row, isEditMode: !row.isEditMode };
        }

        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        row.isDeleted = true;
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    const newRowitems = newRows.filter(row => row.isDeleted && !row.isNew)
    setRows(newRowitems);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <caption>A barbone structure table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">SR NO.</TableCell>
            <TableCell align="left">Ref. No.</TableCell>
            <TableCell align="left">CHQ. No.</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Debit</TableCell>
            <TableCell align="left">Credit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
              </TableCell>
              <span> {row.srno} </span>
              <CustomTableCell {...{ row, name: "refno", onChange }} />
              <CustomTableCell {...{ row, name: "chqno", onChange }} />
              <CustomTableCell {...{ row, name: "description", onChange }} />
              <CustomTableCell {...{ row, name: "debit", onChange }} />
              <CustomTableCell {...{ row, name: "credit", onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default VoucherTable;
