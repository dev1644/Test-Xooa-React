/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import classnames from 'classnames';

const styles = theme => {
  return {
    '.rt-noData': {
      color: '#ffffff !important',
      background: '#7165ae !important'
    },
    table: {
      '& .rt-tbody': {
        overflow: 'scroll !important'
      },
      '& .rt-tr-group': {
        flex: '0 auto',
        '-ms-flex': '0 auto'
      },
      '& .rt-tr-group .rt-tr': {
        paddingTop: 0
      },
      '& .rt-td': {
        textAlign: 'center',
        padding: '10px 2px'
      },
      '& .rt-th input': {
        background: undefined,
        color: undefined
      }
    },
    list: {
      '& ::-webkit-scrollbar': {
        width: '1em'
      },
      '& ::-webkit-scrollbar-track': {
        background: 'rgb(238, 237, 237)'
      },
      '& ::-webkit-scrollbar-thumb': {
        background: 'rgb(192, 190, 190)'
      },
      '& ::-webkit-scrollbar-corner': {
        background: 'rgb(238, 237, 237)'
      }
    },
    pagination: {
      '& button': {
        color:  undefined,
        backgroundColor:  undefined
      },
      '& button:hover': {
        color: undefined,
        backgroundColor: undefined
      }
    }
  };
};

const Table = props => {
  const { className = '', list = false, classes, ...rest } = props;
  const clazz = classnames(
    classes.table,
    '-striped -highlight',
    className,
    list && classes.list
  );
  return (
    <ReactTable
      className={clazz}
      {...rest}
      getPaginationProps={() => ({ className: classes.pagination })}
    />
  );
};

export default withStyles(styles)(Table);
