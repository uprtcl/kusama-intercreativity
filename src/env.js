const peerPath = `/dns4/pinner.intercreativity.io/tcp/4003/wss/p2p`;
// const peerPath = `/dns4/localhost/tcp/4003/ws/p2p`;
const peerId = 'QmVD8LC6vjAHaDgsLySc86BVbnb256LuRZqsWtK5toABsc';
const env = {
  pinner: {
    url: 'https://apps.intercreativity.io:3000', // 'http://localhost:3100' 'https://apps.intercreativity.io:3000',
    // url: 'http://localhost:3200',
    Swarm: [],
    Bootstrap: [`${peerPath}/${peerId}`],
    peerMultiaddr: `${peerPath}/${peerId}`,
  },
  polkadot: {
    connectionId: 'kusama-parity', //'local-dev' 'kusama-web3'
  },
};

// const peerPath = `/dns4/localhost/tcp/4003/ws/p2p`;
// const peerId = 'QmWy2HpZrAacU5j8gFArwnkhyo4acxGseq3gEiFzK9cTba';
// const env = {
//   pinner: {
//     url: 'http://localhost:3100', // 'http://localhost:3100' 'https://apps.intercreativity.io:3000',
//     Swarm: [],
//     Bootstrap: [`${peerPath}/${peerId}`],
//     peerMultiaddr: `${peerPath}/${peerId}`,
//   },
//   polkadot: {
//     connectionId: 'local-dev', //'local-dev' 'kusama-web3'
//   },
// };

module.exports = {
  env,
};
