import { LitElement, html, css, property, internalProperty } from 'lit-element';

import { Logger, RemoteEvees, servicesConnect } from '@uprtcl/evees';

import { Router } from '@vaadin/router';

export class CouncilSpace extends servicesConnect(LitElement) {
  logger = new Logger('Council space');

  @internalProperty()
  perspectiveId!: string;

  @internalProperty()
  loading: boolean = true;

  remote!: RemoteEvees;

  async firstUpdated() {
    this.remote = this.evees.findRemote('council');
    await this.remote.ready();

    this.load();
  }

  async load() {
    this.loading = true;

    const homePerspective = await this.evees.getHome(this.remote.id);
    this.perspectiveId = homePerspective.id;

    this.logger.log(`Home perspective ${this.perspectiveId} found`);

    this.loading = false;
  }

  render() {
    if (this.loading) {
      return html` <uprtcl-loading></uprtcl-loading> `;
    }

    return html`
      <wiki-drawer
        uref=${this.perspectiveId}
        show-back
        show-proposals
        check-owner
        @back=${() => Router.go(`/`)}
      ></wiki-drawer>
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
