const peerPath = `/dns4/pinner.intercreativity.io/tcp/4003/wss/p2p`;
const peerId = 'QmVD8LC6vjAHaDgsLySc86BVbnb256LuRZqsWtK5toABsc';
// const peerPath = `/dns4/localhost/tcp/4003/ws/p2p`;
// const peerId = 'QmZqoT5wRxSBEhkQrD34s4Rb7in6vRR3ceKhyKbCvVDbgb';
const env = {
  pinner: {
    url: 'https://apps.intercreativity.io:3000', // 'http://localhost:3100' 'https://apps.intercreativity.io:3000',
    Swarm: [],
    Bootstrap: [`${peerPath}/${peerId}`],
    peerMultiaddr: `${peerPath}/${peerId}`,
  },
  polkadot: {
    connectionId: 'kusama-web3', //'local-dev' 'kusama-web3'
  },
};

module.exports = {
  env,
};
