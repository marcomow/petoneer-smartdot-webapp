import { btController } from "./BtController";
import { btCommandAttribute, ButtonSendPreset } from "./ButtonSendPreset";
import { hasIs } from "./hasIs";
import { ManualInput } from "./ManualInput";

type CommandSetting = { command: string, title: string }

export class SectionInteractions extends HTMLDivElement {
    static get tag(): string {
        return `section-interactions`;
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
            { command: '0f0407000008', title: 'reset' },
            { command: '0f0405000107', title: 'small' },
            { command: '0f0405000208', title: 'medium' },
            { command: '0f0405000309', title: 'large' },
            { command: '0f0407010009', title: 'manual' }
        ];
        const containerPreset = document.createElement('div');
        containerPreset.classList.add('grid', 'grid-cols-3');
        containerPreset.innerHTML = `<p class="col-span-3">Preset Game</p>`;
        const buttonsPreset: HTMLButtonElement[] = commands.map((command: CommandSetting, index: number): HTMLButtonElement => {
            const button: HTMLButtonElement = document.createElement('button', { is: ButtonSendPreset.tag });
            if (index < 1) {
                button.classList.add('col-span-3');
            }
            button.classList.add('m-auto');
            button.setAttribute(btCommandAttribute, command.command);
            button.innerHTML = command.title;
            button.addEventListener('click', () => {
                btController.setPresetCommand(command.command);
            });
            containerPreset.append(button);
            return button;
        });
        this.append(containerPreset);
        const manualInput: ManualInput = document.createElement('div', { is: ManualInput.tag }) as ManualInput;
        this.append(manualInput);
    }
}
customElements.define(SectionInteractions.tag, SectionInteractions, { extends: 'div' });