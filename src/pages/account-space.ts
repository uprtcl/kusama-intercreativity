import { LitElement, html, css, property, internalProperty } from "lit-element";

import { moduleConnect } from "@uprtcl/micro-orchestrator";

import { Logger } from "@uprtcl/micro-orchestrator";
import { ApolloClientModule } from "@uprtcl/graphql";
import { EveesModule, EveesRemote, EveesInfoConfig } from "@uprtcl/evees";

import { Router } from "@vaadin/router";
import { router } from "../router";

export class AccountSpace extends moduleConnect(LitElement) {
  logger = new Logger("Account space");

  @property({ type: Object })
  location = router.location;

  @internalProperty()
  perspectiveId!: string;

  @internalProperty()
  loading: boolean = true;

  @internalProperty()
  isLogged: boolean = true;

  client!: any;
  defaultRemote!: EveesRemote;

  async firstUpdated() {
    this.client = this.request(ApolloClientModule.bindings.Client);

    this.defaultRemote = (this.request(
      EveesModule.bindings.Config
    ) as any).defaultRemote;

    // this.load();
  }

  updated(changedProperties) {
    if (changedProperties.has("location")) {
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

    const homePerspective = await this.defaultRemote.getHome(
      this.defaultRemote.userId
    );
    await this.defaultRemote.store.create(homePerspective.object);
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

    const eveesInfoConfig: EveesInfoConfig = {
      showProposals: true,
      showDraftControl: true,
      showInfo: true,
      showIcon: true,
    };

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
              @back=${() => Router.go(`/`)}
              .eveesInfoConfig=${eveesInfoConfig}
              show-back
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
