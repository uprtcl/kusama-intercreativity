import { LitElement, html, query, css, internalProperty } from "lit-element";
import { icons } from "@uprtcl/common-ui";
import { initUprtcl } from "./init-uprtcl";
import { router, routes } from "./router";

import { sharedStyles } from "./styles";

export class App extends LitElement {
  @internalProperty()
  loading: boolean = true;

  @query("#outlet")
  outlet: HTMLElement;

  async firstUpdated() {
    await initUprtcl();
    this.loading = false;
    await this.updateComplete;
    router.setOutlet(this.outlet);
    router.setRoutes(routes);
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">${icons.loading}</div>`;
    }

    return html` <div id="outlet"></div> `;
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

        #outlet {
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: auto;
          width: 100%;
        }

        layout {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .loading svg {
          height: 30px;
          width: 30px;
        }
      `,
    ];
  }
}
