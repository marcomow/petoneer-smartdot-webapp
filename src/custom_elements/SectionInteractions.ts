import { btController } from "./BtController";
import { btCommandAttribute, ButtonSendPreset } from "./ButtonSendPreset";
import { hasIs } from "./hasIs";

type CommandSetting = { command: string, title: string }

export class SectionInteractions extends HTMLDivElement {
    static get tag() {
        return `section-interactions` as const;
    }
    connectedCallback(): void {
        hasIs(this);
        this.refreshButtons(false);
    }
    refreshButtons(show: boolean): void {
        this.innerHTML = ``;
        if (!show) {
            return;
        }
        const commands: CommandSetting[] = [
            { command: '0f0405000107', title: 'small' },
            { command: '0f0405000208', title: 'medium' },
            { command: '0f0405000309', title: 'large' }
        ];
        const containerPreset = document.createElement('div');
        containerPreset.innerHTML = `<p>Preset Game</p>`;
        const buttonsPreset: HTMLButtonElement[] = commands.map((command: CommandSetting): HTMLButtonElement => {
            const button: HTMLButtonElement = document.createElement('button', { is: ButtonSendPreset.tag });
            button.setAttribute(btCommandAttribute, command.command);
            button.innerHTML = command.title;
            button.addEventListener('click', () => {
                btController.setPresetCommand(command.command);
            });
            containerPreset.append(button);
            return button;
        });
        this.append(containerPreset);
    }
}
customElements.define(SectionInteractions.tag, SectionInteractions, { extends: 'div' });