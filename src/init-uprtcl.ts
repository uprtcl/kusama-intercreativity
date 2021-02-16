import IPFS from 'ipfs';

import { DocumentsModule } from '@uprtcl/documents';
import { WikisModule } from '@uprtcl/wikis';

import {
  PolkadotOrbitDBIdentity,
  PolkadotConnection,
  EveesPolkadotConnection,
  EveesPolkadotCouncil,
  EveesPolkadotWrapper,
} from '@uprtcl/evees-polkadot';
import {
  ProposalsToPerspectiveStore,
  ContextStore,
  getContextAcl,
} from '@uprtcl/evees-orbitdb';
import { IpfsStore } from '@uprtcl/ipfs-provider';
import { OrbitDBCustom } from '@uprtcl/orbitdb-provider';

import { env } from './env';
import { getConnectionDetails } from './connections';
import { PinnerConfig } from '@uprtcl/evees-polkadot/dist/types/wrapper/evees.polkadot.wrapper';
import { eveesConstructorHelper, MultiContainer } from '@uprtcl/evees';

export let ipfs: any = null;

export const initUprtcl = async () => {
  const polkadotWs = '';

  const ipfsJSConfig = {
    preload: { enabled: false },
    relay: { enabled: true, hop: { enabled: true, active: true } },
    EXPERIMENTAL: { pubsub: true },
    config: {
      init: true,
      Addresses: {
        Swarm: env.pinner.Swarm,
      },
      Bootstrap: env.pinner.Bootstrap,
    },
  };

  ipfs = await IPFS.create(ipfsJSConfig);

  const pinnerConfig: PinnerConfig = {
    url: env.pinner.url,
    peerMultiaddr: env.pinner.peerMultiaddr,
  };

  const wrapper = new EveesPolkadotWrapper(ipfs, pinnerConfig);
  await wrapper.load();

  const evees = eveesConstructorHelper(wrapper.remotes, modules);

  customElements.define('app-container', MultiContainer(evees));
};
