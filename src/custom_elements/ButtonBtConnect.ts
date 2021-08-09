import Swal from "sweetalert2";
import { SectionInteractions } from "./SectionInteractions";
import { hasIs } from './hasIs';
import { btController } from "./BtController";
import { activeButtonClasses, buttonClasses, inactiveButtonClasses } from "../styles/buttons";

export class ButtonBtConnect extends HTMLButtonElement {

    static get tag(): string {
        return `button-bt-connect`;
    }
    set connected(isConnected: boolean) {
        this.disabled = isConnected;
        const classesAdd = !isConnected ? activeButtonClasses : inactiveButtonClasses;
        const classesRemove = isConnected ? activeButtonClasses : inactiveButtonClasses;
        this.classList.add(...classesAdd);
        this.classList.remove(...classesRemove)

        const sectionInteractions: SectionInteractions = document.querySelector(`[is="${SectionInteractions.tag}"]`);
        sectionInteractions.refreshButtons(isConnected);
    }
    connectedCallback(): void {
        hasIs(this);
        this.classList.add(...buttonClasses, ...activeButtonClasses);
        this.innerHTML = `connect`;
        this.addEventListener('click', async () => {
            this.disabled = true;
            const isConnected: boolean = await btController.connect();
            this.connected = isConnected;
        });
    }
}
customElements.define(ButtonBtConnect.tag, ButtonBtConnect, { extends: 'button' });