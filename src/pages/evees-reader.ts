import { LitElement, html, css, internalProperty, query } from 'lit-element';

import { moduleConnect } from '@uprtcl/micro-orchestrator';

import { Logger } from '@uprtcl/micro-orchestrator';
import { EveesPolkadotWrapper } from '@uprtcl/evees-polkadot';
import { EveesReader } from '@uprtcl/evees-reader';
import { ipfs } from '../init-uprtcl';
import { env } from '../env';

export class EveesReaderComponent extends moduleConnect(LitElement) {
  logger = new Logger('Account space');

  @internalProperty()
  reading: boolean = false;

  @internalProperty()
  loading: boolean = true;

  @internalProperty()
  dataRead!: any;

  @query('#text-input')
  newTitleEl!: any;

  wrapper!: EveesPolkadotWrapper;
  reader!: EveesReader;

  async firstUpdated() {
    this.wrapper = new EveesPolkadotWrapper(ipfs, env.pinner);
    this.load();
  }

  async load() {
    this.loading = true;
    await this.wrapper.load();
    this.reader = new EveesReader(this.wrapper.remotes, this.wrapper.ipfsStore);
    this.loading = false;
  }

  async read() {
    this.reading = true;
    this.dataRead = await this.reader.resolve(this.newTitleEl.value);
    this.reading = false;
  }

  render() {
    if (this.loading) {
      return html` <uprtcl-loading></uprtcl-loading> `;
    }

    return html`
      <div class="row">
        <uprtcl-textfield id="text-input" label="uref"></uprtcl-textfield>
        <uprtcl-button-loading
          @click=${() => this.read()}
          ?loading=${this.reading}
        >
          read
        </uprtcl-button-loading>
      </div>
      ${this.dataRead
        ? html`<pre>${JSON.stringify(this.dataRead, null, 2)}</pre>`
        : ''}
    `;
  }

  static styles = css`
    :host {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }
    .row {
      display: flex;
      width: 100%;
      align-items: center;
    }
    uprtcl-button-loading {
      margin-left: 12px;
    }
    pre {
      font-family: Lucida Console, Monaco, monospace;
      font-size: 12px;
      text-align: left;
      background-color: #a0a3cb;
      color: #1c1d27;
      padding: 16px 16px;
      border-radius: 6px;
      width: calc(100% - 32px);
      overflow: auto;
      overflow-x: auto;
    }
  `;
}
