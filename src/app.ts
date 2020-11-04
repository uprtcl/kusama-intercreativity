import { LitElement, html, query, css, internalProperty } from "lit-element";
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
      return html`loading...`;
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
        }

        #outlet {
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: auto;
        }

        layout {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
      `,
    ];
  }
}
