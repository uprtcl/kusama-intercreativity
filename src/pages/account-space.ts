import { LitElement, html, css, property, internalProperty } from 'lit-element';

import { Router } from '@vaadin/router';
import { router } from '../router';
import { Logger, RemoteEvees, servicesConnect } from '@uprtcl/evees';

export class AccountSpace extends servicesConnect(LitElement) {
  logger = new Logger('Account space');

  @property({ type: Object })
  location = router.location;

  @internalProperty()
  perspectiveId!: string;

  @internalProperty()
  loading: boolean = true;

  @internalProperty()
  isLogged: boolean = true;

  client!: any;
  defaultRemote!: RemoteEvees;

  async firstUpdated() {
    this.defaultRemote = this.evees.getRemote();
    // this.load();
  }

  updated(changedProperties) {
    if (changedProperties.has('location')) {
      this.checkUrl();
    }
  }

  checkUrl() {
    if (!this.location.params.homeId) {
      this.goToLoggedUserHome();
    } else {
      this.perspectiveId = this.location.params.homeId as string;
      this.loading = false;
    }
  }

  async goToLoggedUserHome() {
    await this.defaultRemote.ready();

    this.isLogged = await this.defaultRemote.isLogged();

    if (!this.isLogged) {
      this.loading = false;
      return;
    }

    const homePerspective = await this.evees.getHome(this.defaultRemote.id);
    /** make sure the home perspective is stored */
    await this.evees.client.store.flush();
    const perspectiveId = homePerspective.id;

    Router.go(`/account/${perspectiveId}`);
  }

  async login() {
    await this.defaultRemote.login();
    this.checkUrl();
  }

  render() {
    if (this.loading) {
      return html` <uprtcl-loading></uprtcl-loading> `;
    }

    return html`
      ${!this.isLogged
        ? html`
            <uprtcl-button class="login-button" @click=${() => this.login()}
              >login</uprtcl-button
            >
          `
        : html`
            <wiki-drawer
              uref=${this.perspectiveId}
              show-back
              show-proposals
              @back=${() => Router.go(`/`)}
            ></wiki-drawer>
          `}
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

    .login-button {
      margin: 36px auto;
      width: 180px;
    }
  `;
}
