/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clientJson from '../../../package.json';
import Version from '../../FabricVerison';

const styles = theme => {
  return {
    root: {
      margin: '2%'
    },
    footer: {
      backgroundColor: '#00000',
      color:  "#ffffff",
      textAlign: 'center',
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0
    }
  };
};

const FooterView = ({ classes }) => (
  <div className={classes.root}>
    <div>
      <div className={classes.footer}>
        {'Hyperledger Explorer Client Version: '}
        {clientJson.version}
        &emsp;
        {'Fabric Compatibility: '} {Version.map(version => version)}
      </div>
    </div>
  </div>
);

export default withStyles(styles)(FooterView);
