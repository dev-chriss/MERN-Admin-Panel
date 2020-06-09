import React, { useEffect, useState } from "react";
import { Paper, withStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, 
            IconButton, TextField, MenuItem } from '@material-ui/core';
import { connect } from "react-redux";
import * as actions from "../../../actions/map";
import CollapsibleRow from './CollapsibleRow'
import Pagination from './Pagination'
import { toast } from 'react-toastify';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from "react-router-dom";

const styles = theme => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(0)
    }
})

const DataTable = ({ classes, ...props }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let [ category, setCategory ] = useState("all")
	let [ name, setName ] = useState("")

    useEffect(() => {
        props.fetchPagination(1, rowsPerPage)
    }, [])

    const onDelete = async id => {
        const onSuccess = () => {
            props.fetchPagination(1, rowsPerPage)
            toast.success('Data succesfully deleted');
        }

        if (window.confirm('Are you sure to delete this record?')) {
            props.delete(id, onSuccess)
        }
    }

    const handleChangePage = async (event, newPage) => {
        await setPage(newPage);
        props.fetchPagination(newPage + 1, rowsPerPage)
    };

    const handleChangeRowsPerPage = async (event) => {
        if (event.target.value){
            const val = parseInt(event.target.value, 10)
            await setRowsPerPage(val);
            await setPage(0);
            props.fetchPagination(1, val)
        }
    };

	const nameChange = async (event) => {
		const { value } = event.target
		name = value
		await setName(value)
		props.fetchPagination(1, rowsPerPage,  value, category)
	}

	const categoryChange = async (event) => {
		const { value } = event.target
		category = value
		await setCategory(value)
		props.fetchPagination(1, rowsPerPage,  name, value)
    }

    return (
        <TableContainer component={Paper} className={classes.paper} >
            <div className="table-header" >
                <div className="table-filter" >
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Search Name"
                        value={name}
                        onChange={nameChange}
                        autoComplete="off"
                    />
                    <TextField 
                        select
                        name="category"
                        label="Category" 
                        value={category}
                        variant="outlined"
                        onChange={categoryChange}
                        >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"apartment"}>Apartment</MenuItem>
                        <MenuItem value={"office"}>Office</MenuItem>
                    </TextField>
                </div>
            </div>

            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell style={{fontWeight:'600'}}>Name</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Category</TableCell>
                        <TableCell align="right" width="250"> 
                            <div className="cell-add">
                                <Link to="/admin/map/add">
                                    <IconButton color="primary">
                                        <AddCircleIcon />
                                    </IconButton>
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  style={{ height: "150px", overflow: "auto" }} >
                    {props.maps.map((row, index) => (
                        <CollapsibleRow 
                            key={index} 
                            row={row} 
                            onDelete={onDelete} 
                        />
                    ))}    
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <Pagination 
                            handleChangePage={handleChangePage} 
                            handleChangeRowsPerPage={handleChangeRowsPerPage} 
                            count={props.meta.totalDocs || 0}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>

        </TableContainer>
    );
}

const mapStateToProps = state => ({
    maps: state.map.maps,
    meta: state.map.mapMeta
})

const mapActionToProps = {
    fetchPagination: actions.Pagination,
    delete: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DataTable));
