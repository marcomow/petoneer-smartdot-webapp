export const btCommandAttribute: string = 'bt-command';
export class ButtonSendPreset extends HTMLButtonElement {
    static get tag(): string {
        return `button-send-preset`;
    }
    connectedCallback(): void {
        const presetCommand = this.getAttribute(btCommandAttribute);
        if (!presetCommand) {
            throw `Attribute '${btCommandAttribute}' was not set.`;
        }
    }
}
customElements.define(ButtonSendPreset.tag, ButtonSendPreset, { extends: `button` });