import { activeButtonClasses, buttonClasses, inactiveButtonClasses } from "../styles/buttons";
import { btController } from "./BtController";
import { hasIs } from './hasIs';
import { SectionInteractions } from "./SectionInteractions";

export class ButtonBtConnect extends HTMLButtonElement {
    static get tag() {
        return `button-bt-connect` as const;
    }
    set connected(isConnected: boolean) {
        this.disabled = isConnected;
        const classesAdd = !isConnected ? activeButtonClasses : inactiveButtonClasses;
        const classesRemove = isConnected ? activeButtonClasses : inactiveButtonClasses;
        this.classList.add(...classesAdd);
        this.classList.remove(...classesRemove)

        const sectionInteractions = document.querySelector(`[is="${SectionInteractions.tag}"]`) as SectionInteractions;
        sectionInteractions.refreshButtons(isConnected);
    }
    connectedCallback(): void {
        this.innerHTML = `connect`;
        hasIs(this);
        this.classList.add(...buttonClasses, ...activeButtonClasses);
        this.addEventListener('click', async () => {
            this.disabled = true;
            const isConnected: boolean = await btController.connect();
            this.connected = isConnected;
        });
    }
}
customElements.define(ButtonBtConnect.tag, ButtonBtConnect, { extends: 'button' });