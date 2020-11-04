const peerPath = `/dns4/pinner.intercreativity.io/tcp/4003/wss/p2p`;
const peerId = "QmetdpjRspEHdfQKR8sFGTf54NHFHbpAMWz3wBhzjSDaF5";
const env = {
  pinner: {
    url: "https://apps.intercreativity.io:3000",
    Swarm: [],
    Bootstrap: [`${peerPath}/${peerId}`],
    peerMultiaddr: `${peerPath}/${peerId}`,
  },
};

module.exports = {
  env,
};
