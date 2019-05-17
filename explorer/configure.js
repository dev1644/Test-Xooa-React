var util = require("util");
var path = require("path");
var fs = require("fs");
var { spawn } = require("child_process");

const fabric_const = require("./app/platform/fabric/utils/FabricConst").fabric
  .const;

const FabricUtils = require("./app/platform/fabric/utils/FabricUtils");

var helper = require("./app/common/helper.js");
var logger = helper.getLogger("main");

var config = require("./config.js");

var hfc = require("fabric-client");
hfc.setLogger(logger);

var network_name = "network-1";
var client_name = "client-1";

let org_name = process.env.ORG;
let channelList = [];

let CHANNELS = process.env.CHANNELS;
if (CHANNELS) {
  channelList = CHANNELS.split(",");
}

function readAllFiles(dir) {
  var files = fs.readdirSync(dir);
  var certs = [];
  files.forEach(file_name => {
    let file_path = path.join(dir, file_name);
    let data = fs.readFileSync(file_path);
    certs.push(data);
  });
  return certs;
}

var getOrgAdmin = async function(client) {
  var keyPath = `/crypto-config/peerOrganizations/org.${org_name}.com/users/Admin@org.${org_name}.com/msp/keystore`;
  var keyPEM = Buffer.from(readAllFiles(keyPath)[0]).toString();
  var certPath = `/crypto-config/peerOrganizations/org.${org_name}.com/users/Admin@org.${org_name}.com/msp/signcerts`;
  var certPEM = readAllFiles(certPath)[0].toString();
  let mspid = org_name;
  return client.createUser({
    username: `peer-${mspid}-Admin`,
    mspid: mspid,
    cryptoContent: {
      privateKeyPEM: keyPEM,
      signedCertPEM: certPEM
    }
  });
};

async function configure() {
  for (var i = 0; i < channelList.length; i++) {
    let channelSettingEnv = channelList[i];
    let counter = 0;
    let retry = true;
    while (retry && counter < 5) {
      try {
        let channelData = channelSettingEnv.split(":");
        console.log("channelData[0]", channelData[0]);
        await configureChannel(channelData[0]);
        retry = false;
      } catch (err) {
        console.log(err.message);
        if (err.message.indexOf("Cannot create ledger from") > -1) {
          retry = false;
        }
        counter++;
      }
    }
  }
}

async function configureChannel(channel_name) {
  const network_configs = (await config.getConfig())[
    fabric_const.NETWORK_CONFIGS
  ];
  network_configs[network_name].client =
    network_configs[network_name]["clients"][client_name];

  let networkConfig = JSON.parse(JSON.stringify(network_configs[network_name]));
  delete networkConfig.organizations[org_name].signedCert;
  delete networkConfig.organizations[org_name].adminPrivateKey;

  console.log("networkConfig", JSON.stringify(networkConfig));
  let client = hfc.loadFromConfig(networkConfig);

  await client.initCredentialStores();
  await getOrgAdmin(client);

  var channel = client.getChannel(channel_name);

  let request = {
    txId: client.newTransactionID(true) //get an admin based transactionID
  };
  let genesis_block = await channel.getGenesisBlock(request);
  // tell each peer to join and wait for the event hub of each peer to tell us
  // that the channel has been created on each peer
  console.log("genesis_block", genesis_block);
  let join_request = {
    //targets: peers, //using the peer names which only is allowed when a connection profile is loaded
    txId: client.newTransactionID(true), //get an admin based transactionID
    block: genesis_block
  };
  let join_promise = await channel.joinChannel(join_request);

  if (join_promise[0] instanceof Error) {
    throw join_promise[0];
  }
  console.log("join_promise", join_promise);
}
configure()
  .then(() => {
    console.log("Channel Provisioned, wait for server to start....");

    setTimeout(() => {
      spawn("npm", ["start"], {
        cwd: "/opt/explorer/client/",
        stdio: "inherit"
      });
    }, 10000);

    setTimeout(() => {
      require("./main");
    }, 10000);
  })
  .catch(err => console.error(err));
