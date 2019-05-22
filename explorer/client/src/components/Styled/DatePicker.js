/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const styles = () => {
  return {
    date: {
      [`
        & .react-datepicker__input-container,
        & .react-datepicker-wrapper *,
        & .react-datepicker-wrapper
      `]: {
        width: '100% !important',
        textAlign: 'center',
        color: "#ffffff"
      },
      '& .react-datepicker-popper': {
        minWidth: 320,
        color: "#ffffff"
      },
      '& .react-datepicker__time-list': {
        paddingLeft: '0px',
        color: "#ffffff"
      },
      '& .react-datepicker__input-container *': {
        borderColor: 'rgb(211, 210, 210)',
        borderRadius: 5,
        height: 36,
        color: "#ffffff"
      },
      '& .react-datepicker': {
        backgroundColor: "#454545",
        color: "#ffffff"
      },
      '& .react-datepicker__time': {
        backgroundColor: "#454545",
        color: "#ffffff"
      },
      '& .react-datepicker__header': {
        backgroundColor:  "#454545",
        color: "#ffffff"
      },
      '& .react-datepicker__input-container > input': {
        background:  "#454545",
        color: "#ffffff"
      },
      '& .react-datepicker__day': {
        color: "#ffffff"
      },
      '& .react-datepicker__day:hover': {
        color: "#000000"
      },
      '& .react-datepicker__day:hover': {
        color: "#000000"
      },
      '& .react-datepicker__day-name': {
        color: "#ffffff"
      },
      '& .react-datepicker__current-month': {
        color: "#ffffff"
      },
      '& .react-datepicker-time__header': {
        color: "#ffffff"
      }
    }
  };
};

const DatePicker = props => {
  const { classes, ...rest } = props;
  return (
    <div className={classes.date}>
      <ReactDatePicker {...rest} />
    </div>
  );
};

export default withStyles(styles)(DatePicker);
