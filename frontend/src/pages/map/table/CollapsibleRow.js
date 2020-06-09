import React, { useState, Fragment } from "react";
import { Table, TableBody, TableCell, TableRow, Collapse, IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import '../style.css';

const useStyles = makeStyles({
    row: {
        '& > *': {
          borderBottom: 'unset',
          height: 'unset'
        },
    }
});

const CollapsibleRow = (props) => {
    const { row } = props;
    const [ open, setOpen ] = useState(false);
    const classes = useStyles();

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
      <Fragment>
        <TableRow className={classes.row}>
          <TableCell width="30">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell width="100">{capitalize(row.category)}</TableCell>
          <TableCell align="right" width="250">
            <div className="cell-button">
              <Link to={`/admin/map/edit/${row.id}`}>
                  <IconButton color="primary">
                      <EditIcon />
                  </IconButton>
              </Link>
              <IconButton style={{ color: 'red' }} onClick={() => props.onDelete(row.id)}>
                  <DeleteIcon />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Table size="medium" aria-label="detail" style={{marginBottom:"30px"}}>
                  <TableBody>
                    
                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Description </TableCell>
                          <TableCell className="collapse-cell-content"> {row.description} </TableCell>
                      </TableRow>

                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Address </TableCell>
                          <TableCell className="collapse-cell-content"> {row.address} </TableCell>
                      </TableRow>

                      <TableRow> 
                          <TableCell className="collapse-cell-title"> City </TableCell>
                          <TableCell className="collapse-cell-content"> {row.city} </TableCell>
                      </TableRow>

                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Latitude </TableCell>
                          <TableCell className="collapse-cell-content"> {row.coordinate.lat} </TableCell>
                      </TableRow>

                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Longitude </TableCell>
                          <TableCell className="collapse-cell-content"> {row.coordinate.lng} </TableCell>
                      </TableRow>

                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Facilities </TableCell>
                          <TableCell className="collapse-cell-content"> {row.facilities} </TableCell>
                      </TableRow>

                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Images </TableCell>
                          <TableCell className="collapse-cell-content"> {row.images} </TableCell>
                      </TableRow>

                  </TableBody>
                </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
}

export default CollapsibleRow;