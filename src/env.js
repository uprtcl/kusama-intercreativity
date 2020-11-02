const peerPath = `/dns4/localhost/tcp/4003/ws/p2p`;
const peerId = "Qmd8kmJpzmgtC99DhCweTmGA7EL2wPqUVuDc3D2fCDD7Z4";
const env = {
  pinner: {
    url: "http://localhost:3100",
    Swarm: [],
    Bootstrap: [`${peerPath}/${peerId}`],
    peerMultiaddr: `${peerPath}/${peerId}`,
  },
  ethers: {
    apiKeys: {
      etherscan: "6H4I43M46DJ4IJ9KKR8SFF1MF2TMUQTS2F",
      infura: "73e0929fc849451dae4662585aea9a7b",
    },
  },
};

module.exports = {
  env,
};
