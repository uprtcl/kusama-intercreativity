import { LitElement, html, css, property } from 'lit-element';
import { servicesConnect } from '@uprtcl/evees';

import { Router } from '@vaadin/router';

export class Doc extends servicesConnect(LitElement) {
  @property({ attribute: false })
  docId!: string;

  @property({ attribute: false })
  defaultRemote!: string;

  @property({ attribute: false })
  loading: boolean = true;

  async firstUpdated() {
    this.loading = true;
    this.docId = window.location.pathname.split('/')[2];

    const defaultRemote = this.evees.getRemote();

    await defaultRemote.connect();
    this.defaultRemote = defaultRemote.id;
    this.loading = false;
  }

  goHome() {
    Router.go(`/home`);
  }

  render() {
    if (this.docId === undefined) return '';
    if (this.loading) return html` <uprtcl-loading></uprtcl-loading> `;

    return html`
      <wiki-drawer
        @back=${() => this.goHome()}
        uref=${this.docId}
        default-remote=${this.defaultRemote}
        .editableRemotes=${[this.defaultRemote]}
      ></wiki-drawer>
    `;
  }

  static styles = css`
    :host {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    wiki-drawer {
      flex-grow: 1;
    }
  `;
}
