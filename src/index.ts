import { EveesOrbitDBDebugger } from '@uprtcl/evees-blockchain';
import { App } from './app';
import { Home } from './pages/home';
import { CouncilSpace } from './pages/council-space';
import { AccountSpace } from './pages/account-space';
import { EveesReaderComponent } from './pages/evees-reader';

(async function () {
  // customElements.define('layout', RootLayout);
  customElements.define('kusama-intercreativity', App);
  customElements.define('evees-orbitdb-set-debugger', EveesOrbitDBDebugger);
  customElements.define('evees-reader', EveesReaderComponent);
  customElements.define('kusama-home', Home);
  customElements.define('council-space', CouncilSpace);
  customElements.define('account-space', AccountSpace);
})();
