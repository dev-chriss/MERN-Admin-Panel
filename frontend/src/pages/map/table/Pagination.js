import React, { useState, useEffect, Fragment } from "react";
import { TablePagination, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));


const TablePaginationActions = (props) => {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} 
        disabled={page === 0} 
        aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const CollapsibleRow = (props) => {
    const { count, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = props;
    const totalPage = Math.floor(count / rowsPerPage)
    const currPage = page <= totalPage ? page : 0

    const [screenWidth, setScreenWidth] = useState(0)

    // detect screen size
    useEffect(() => {
        function updateWindowDimensions(status) {
            setScreenWidth(window.innerWidth);
            console.log(screenWidth)
        }
        window.addEventListener('resize', updateWindowDimensions);
        return function cleanup() {
            window.removeEventListener('resize', updateWindowDimensions);
        };
    });

    return (
      <Fragment>
          <TablePagination  style={{ width:"300px", overflowX:"hidden" }}
              rowsPerPageOptions={screenWidth < 768 ? [] : [5, 10, 25, { label: 'All', value: -1 }]}
              count={count}
              rowsPerPage={rowsPerPage}
              page={currPage}
              SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
          />
      </Fragment>
    );
}

export default CollapsibleRow;