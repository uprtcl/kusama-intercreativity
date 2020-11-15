import { LitElement, html, query, css, internalProperty } from 'lit-element';
import { icons } from '@uprtcl/common-ui';
import { initUprtcl } from './init-uprtcl';
import { router, routes } from './router';

import { sharedStyles } from './styles';
import { logo } from './logo.kusama';

export class App extends LitElement {
  @internalProperty()
  loading: boolean = true;

  @internalProperty()
  errorLoading: boolean = false;

  @internalProperty()
  error!: any;

  @query('#outlet')
  outlet: HTMLElement;

  async firstUpdated() {
    try {
      await initUprtcl();
    } catch (e) {
      this.errorLoading = true;
      this.error = e;
    }

    this.loading = false;

    await this.updateComplete;
    router.setOutlet(this.outlet);
    router.setRoutes(routes);
  }

  render() {
    let content = html``;

    if (this.loading) {
      content = html`<div class="loading">${icons.loading}</div>`;
    } else if (this.errorLoading) {
      content = html`<div class="error-loading">
        Error loading app :( <br /><br />
        ${this.error}
      </div>`;
    } else {
      content = html`<div id="outlet"></div> `;
    }

    return html`<div class="container">
      ${content}
      <div class="logo">${logo}</div>
    </div>`;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          height: 100vh;
          flex-direction: column;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          position: relative;
          top: 0;
          flex: 1 1 auto;
          width: 100%;
          background-color: #fbfbfb;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .logo {
          position: absolute;
          height: 100%;
          width: 100%;
          text-align: center;
        }
        .logo svg {
          fill: #fbfbfb;
          width: 100vh;
        }

        #outlet {
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: auto;
          width: 100%;
          z-index: 1;
          position: absolute;
        }

        layout {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .loading {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          z-index: 1;
        }
        .error-loading {
          z-index: 1;
        }
        .loading svg {
          height: 60px;
          width: 60px;
        }
      `,
    ];
  }
}
