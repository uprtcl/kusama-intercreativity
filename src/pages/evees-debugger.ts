import { LitElement, html, css, internalProperty, query } from 'lit-element';

import { moduleConnect } from '@uprtcl/micro-orchestrator';
import { Logger } from '@uprtcl/micro-orchestrator';

import { EveesBlockchainCached } from '@uprtcl/evees-blockchain';
import { EveesModule, EveesRemote, Perspective, Secured } from '@uprtcl/evees';
import { Signed } from '@uprtcl/cortex';
import { EveesOrbitDBEntities } from '@uprtcl/evees-orbitdb';

export class EveesDebuggerComponent extends moduleConnect(LitElement) {
  logger = new Logger('Debug Component');

  @internalProperty()
  reading: boolean = false;

  @internalProperty()
  loading: boolean = false;

  @internalProperty()
  perspective!: Secured<Perspective>;

  @internalProperty()
  perspectivesIds: string[] = [];

  @query('#text-input')
  inputEl!: any;

  protected remotes!: EveesRemote[];
  protected remote!: EveesBlockchainCached;

  async firstUpdated() {
    this.remotes = this.requestAll(EveesModule.bindings.EveesRemote);
    this.load();
  }

  async load() {
    this.loading = true;
    const remote = this.remotes.find((r) => r.id.includes('fixed'));
    if (!remote) {
      throw new Error(`remote not found`);
    }
    this.remote = remote as EveesBlockchainCached;
    this.loading = false;
  }

  async read() {
    this.reading = true;
    this.inputEl.value;

    const object = (await this.remote.store.get(this.inputEl.value)) as Signed<
      Perspective
    >;
    this.perspective = {
      id: this.inputEl.value,
      object,
    };

    this.perspectivesIds = await this.remote.getContextPerspectives(
      this.perspective.object.payload.context
    );
    this.reading = false;
  }

  async delete(id: string) {
    const contextStore = await this.remote.orbitdbcustom.getStore(
      EveesOrbitDBEntities.Context,
      {
        context: this.perspective.object.payload.context,
      }
    );

    this.logger.info(`contextStore.delete(${id})`);
    await contextStore.delete(id);

    this.perspectivesIds = [];
    this.read();
  }

  render() {
    if (this.loading) {
      return html` <uprtcl-loading></uprtcl-loading> `;
    }

    return html`
      <div class="row">
        <uprtcl-textfield
          id="text-input"
          label="perspective id"
        ></uprtcl-textfield>
        <uprtcl-button-loading
          @click=${() => this.read()}
          ?loading=${this.reading}
        >
          read
        </uprtcl-button-loading>
      </div>
      ${this.perspective
        ? html`<div class="context-perspectives">
            <b>Context: ${this.perspective.object.payload.context}</b>
            <uprtcl-list>
              ${this.perspectivesIds.map(
                (id) => html` <uprtcl-list-item
                  >${id}<uprtcl-icon-button
                    @click=${() => this.delete(id)}
                    icon="clear"
                  ></uprtcl-icon-button
                ></uprtcl-list-item>`
              )}
            </uprtcl-list>
          </div>`
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
    .context-perspectives {
      margin-top: 32px;
    }
    uprtcl-list-item {
      font-family: 'Lucida Console', Monaco, monospace;
    }
    uprtcl-list {
      margin: 16px 0px;
      display: block;
      border: solid 1px;
    }
  `;
}
