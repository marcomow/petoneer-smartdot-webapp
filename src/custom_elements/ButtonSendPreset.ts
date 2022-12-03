import { buttonClasses } from "../styles/buttons";

export const btCommandAttribute: string = 'bt-command';
export class ButtonSendPreset extends HTMLButtonElement {
    static get tag(){
        return `button-send-preset` as const;
    }
    connectedCallback(): void {
        this.classList.add(...buttonClasses);
        const presetCommand = this.getAttribute(btCommandAttribute);
        if (!presetCommand) {
            throw `Attribute '${btCommandAttribute}' was not set.`;
        }
    }
}
customElements.define(ButtonSendPreset.tag, ButtonSendPreset, { extends: `button` });