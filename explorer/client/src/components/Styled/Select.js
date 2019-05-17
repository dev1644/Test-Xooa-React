/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import classnames from 'classnames';

const styles = () => {
   return {
    select: {
      '& .Select-control': {
        backgroundColor: '#454545 !important',
        color:  "#ffffff !important"
      },
      '& .Select-control .Select-clear-zone': {
        display: 'none',
        width: '95% !important',
        margin: 'auto'
      },
      '& .Select-menu-outer': {
        background: '#454545 !important',
        color: "#ffffff !important"
      },
      '& .Select-option': {
        background: '#454545 !important',
        color: "#ffffff !important"
      },
      '& .Select-option.is-selected': {
        background:  '#454545 !important',
        color: "#ffffff !important"
      },
      '& .Select-option.is-focused': {
        background:  '#454545 !important',
        color: "#ffffff !important"
      },
      '& .Select-value-label': {
        color:  "#ffffff !important"
      }
    },
    filter: {
      [`
        & .Select-control,
        & .Select-menu-outer,
        & .Select-option,
        & .Select-option.is-selected,
        & .Select-option.is-focused
      `]: {
        background:'#454545 !important',
        color: "#ffffff !important"
      }
    }
  };
};

const Select = props => {
  const { className = '', classes, filter, ...rest } = props;
  const clazz = classnames(classes.select, filter && classes.filter, className);
  return <ReactSelect className={clazz} {...rest} />;
};

export default withStyles(styles)(Select);
