/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import { withStyles } from '@material-ui/core/styles';

const styles = () => {
 
  return {
    title: {
      textAlign: 'center',
      backgroundColor:'#000000',
      color: '#ffffff',
      font: 'bold 30px',
      fontWeight: 400,
      letterSpacing: 3,
      paddingTop: '1%',
      margin: 0
    },
    dialog: {
      borderStyle: 'solid',
      borderColor: '#000000',
      borderWidth: 2,
      filter: 'drop-shadow(0 0 0.75rem #000000)',
      backgroundColor: "#454545",
      color:'#ffffff'
    },
    card: {
      backgroundColor: "#454545",
      color:'#ffffff'
    },
    body: {
      backgroundColor: "#454545",
      color:'#ffffff',
      '& > h1': {
        fontSize: '25pt'
      }
    },
    copy: {
      display: 'none',
      color:'#ffffff'
    },
    copied: {
      display: 'none',
      color:'#ffffff'
    },
    copyBtn: {
      float: 'right',
      borderColor: 'transparent',
      color: '#4c69c7',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      textShadow: '1px 1px 2px rgba(129, 129, 129, 0.753)',
      '&:hover': {
        color: '#2153f8'
      },
      '&:focus': {
        outline: 'none'
      },
      '&:hover $copy': {
        display: 'block',
        position: 'absolute',
        padding: 0,
        backgroundColor: 'transparent',
        fontSize: 10,
        marginTop: -10
      },
      '&:active $copy': {
        display: 'none'
      },
      '&:active $copied': {
        display: 'block',
        position: 'absolute',
        padding: 0,
        backgroundColor: 'transparent',
        marginTop: -30
      }
    },
    closeBtn: {
      float: 'right',
      borderColor: 'transparent',
      color: '#8b0000',
      backgroundColor: 'transparent',
      margin: '-12px 10px 3px 0px',
      fontSize: 25,
      height: 30,
      cursor: 'pointer',
      filter: 'drop-shadow(0 0 0.75rem #000000)',
      '&:focus': {
        outline: 'none',
        color: '#c00404'
      }
    }
  };
};

export const Modal = ({ children, classes }) => children && children(classes);

export default withStyles(styles)(Modal);
