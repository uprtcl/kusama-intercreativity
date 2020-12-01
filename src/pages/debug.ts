import { LitElement, html, css, internalProperty } from 'lit-element';

import { Logger } from '@uprtcl/micro-orchestrator';
import { ApolloClientModule } from '@uprtcl/graphql';
import { EveesModule, EveesRemote } from '@uprtcl/evees';

import { moduleConnect } from '@uprtcl/micro-orchestrator';
import { Router } from '@vaadin/router';

export class DebugSpace extends moduleConnect(LitElement) {
  logger = new Logger('Account space');

  render() {
    return html`
      <evees-orbitdb-set-debugger show-contexts></evees-orbitdb-set-debugger>
    `;
  }

  static styles = css`
    :host {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: center;
    }
  `;
}
