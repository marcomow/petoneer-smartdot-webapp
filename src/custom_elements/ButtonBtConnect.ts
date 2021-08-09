import Swal from "sweetalert2";
import { SectionInteractions } from "./SectionInteractions";
import { hasIs } from './hasIs';
import { btController } from "./BtController";

export class ButtonBtConnect extends HTMLButtonElement {

    static get tag(): string {
        return `button-bt-connect`;
    }
    set connected(isConnected: boolean) {
        this.disabled = isConnected;
        const sectionInteractions: SectionInteractions = document.querySelector(`[is="${SectionInteractions.tag}"]`);
        sectionInteractions.refreshButtons(isConnected);
    }
    connectedCallback(): void {
        hasIs(this);
        this.innerHTML = `connect`;
        this.addEventListener('click', async () => {
            this.disabled = true;
            const isConnected: boolean = await btController.connect();
            this.connected = isConnected;
        });
    }
}
customElements.define(ButtonBtConnect.tag, ButtonBtConnect, { extends: 'button' });