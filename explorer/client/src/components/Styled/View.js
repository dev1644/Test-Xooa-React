/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = () => {
  return {
    fullwidth: {
      width: '100%',
      marginTop: 105,
      backgroundColor: '#454545'
    },
    display: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '98%',
      backgroundColor:  undefined
    },
    card: {
      color: undefined,
      backgroundColor: undefined
    }
  };
};

export const View = ({ children, classes }) => (
  <div className={classes.fullwidth}>
    <div className={classes.display}>
      <Card className={classes.card}>{children}</Card>
    </div>
  </div>
);

export default withStyles(styles)(View);
