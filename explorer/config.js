const hostToIp = require('host-to-ip');

let CHANNELS = process.env.CHANNELS;
let PEER_NAME = process.env.PEER_NAME;
let ORDERER = process.env.ORDERER;
let PEER_IP = PEER_NAME;

async function getConfig() {
  PEER_IP = await hostToIp(PEER_NAME);

  let ORG = process.env.ORG;
  let channelList = [];
  let channelConfig = {};
  let channel = '';
  if (CHANNELS) {
    channelList = CHANNELS.split(',');
    let peers = {};

    peers[PEER_NAME] = {
      endorsingPeer: true,
      chaincodeQuery: true,
      ledgerQuery: true,
      eventSource: true
    };

    channelList.forEach(key => {
      let channelData = key.split(':');
      channel = channelData[0];
      channelConfig[channelData[0]] = {
        orderers: [ORDERER],
        peers: peers
      };
    });
  }

  let orgData = {};
  orgData[ORG] = {
    mspid: ORG,
    peers: [PEER_NAME],
    grpcOptions: {
      'ssl-target-name-override': `peer0.org.${ORG}.com`
    },
    tlsCACerts: {
      path: `/crypto-config/peerOrganizations/org.${ORG}.com/peers/peer0.org.${ORG}.com/tls/ca.crt`
    },

    adminPrivateKey: {
      path: `/crypto-config/peerOrganizations/org.${ORG}.com/users/Admin@org.${ORG}.com/msp/keystore`
    },
    signedCert: {
      path: `/crypto-config/peerOrganizations/org.${ORG}.com/users/Admin@org.${ORG}.com/msp/signcerts`
    }
  };

  let peerConnectConfig = {};
  let orderesConnectConfig = {};
  peerConnectConfig[PEER_NAME] = {
    url: 'grpc://' + PEER_IP + ':7051',
    eventUrl: 'grpc://' + PEER_IP + ':7053',
    grpcOptions: {
      'ssl-target-name-override': `peer0.org.${ORG}.com`
    },
    tlsCACerts: {
      path: `/crypto-config/peerOrganizations/org.${ORG}.com/peers/peer0.org.${ORG}.com/tls/ca.crt`
    }
  };

  orderesConnectConfig[ORDERER] = {
    url: 'grpc://' + ORDERER + ':7050'
  };

  return {
    'network-configs': {
      'network-1': {
        version: '1.0',
        clients: {
          'client-1': {
            tlsEnable: false,
            organization: ORG,
            channel: channel,
            credentialStore: {
              path: '/tmp/credentialStore_Org1/credential',
              cryptoStore: {
                path: '/tmp/credentialStore_Org1/crypto'
              }
            }
          }
        },
        channels: channelConfig,
        organizations: orgData,
        peers: peerConnectConfig,
        orderers: orderesConnectConfig
      }
    }
  };
}

module.exports.getConfig = getConfig;
