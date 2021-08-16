import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationOutlined({currentPage, pagesAmount , handleChangePagination}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={pagesAmount} page={currentPage} onChange={handleChangePagination} variant="outlined" color="primary" />
    </div>
  );
}