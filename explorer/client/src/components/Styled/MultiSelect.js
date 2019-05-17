/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import MultiSelect from '@khanacademy/react-multi-select';
import { withStyles } from '@material-ui/core/styles';

const styles = () => {
  return {
    multi: {
      '& .multi-select': {
         backgroundColor: '#454545 !important',
      },
      '& .multi-select .select-item': {
        textAlign: 'left !important'
      },
      '& .dropdown ': {
         backgroundColor: '#454545 !important',
      },
      '& .dropdown-heading': {
         backgroundColor: '#454545 !important',
        color:  "#ffffff !important"
      },
      '& .multi-select * input': {
        backgroundColor:  undefined,
        color:  "#ffffff !important"
      },
      '& .multi-select .select-item,.dropdown-content': {
         backgroundColor: '#454545 !important',
        color:  "#ffffff !important"
      },
      '& .multi-select .select-item:hover': {
        backgroundColor: undefined
      },
      '& .multi-select .select-item:visited': {
        backgroundColor: undefined
      },
      '& ::-webkit-input-placeholder ': {
        /* Chrome/Opera/Safari */
        color:  "#ffffff !important"
      },
      '& .dropdown-heading-value': {
        color:  "#ffffff !important"
      }
    }
  };
};

const MultiSelectcomponent = props => {
  const { classes, ...rest } = props;
  return (
    <div className={classes.multi}>
      <MultiSelect {...rest} />
    </div>
  );
};

export default withStyles(styles)(MultiSelectcomponent);
