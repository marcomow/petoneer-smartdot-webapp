import { ButtonBtConnect } from "./custom_elements/ButtonBtConnect";
import { SectionInteractions } from "./custom_elements/SectionInteractions";

class SmartdotCard extends HTMLElement {
    config: any;
    setConfig(config) {
        this.config = config;
    }
    connectedCallback() {
        this.innerHTML = `
            <button is="${ButtonBtConnect.tag}"></button>
            <div is="${SectionInteractions.tag}"></div>
        `;
    }
}
customElements.define('smartdot-card', SmartdotCard);