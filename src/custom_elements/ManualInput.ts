import { btController } from "./BtController";
import { hasIs } from "./hasIs";

const attributeInput: string = `bt-manual-input`;

export class ManualInput extends HTMLDivElement {
    static get tag(): string {
        return `manual-input`;
    }
    get inputValues(): ManualArgument {
        const manualArgument = {};
        [...this.querySelectorAll(`[${attributeInput}]`)].forEach((input: Element): void => {
            manualArgument[input.getAttribute(attributeInput)] = Number((input as HTMLInputElement).value);
        });
        return manualArgument as ManualArgument;
    }
    async connectedCallback(): Promise<void> {
        hasIs(this);
        this.classList.add('flex');
        const parts: string[] = ['x', 'y', 'z', 'a', 'b'];
        const inputs: HTMLDivElement[] = parts.map((part: string): HTMLDivElement => {
            const container: HTMLDivElement = document.createElement('div');
            container.classList.add('m-auto');
            container.innerHTML = `<span>${part}</span>`;
            const input: HTMLInputElement = document.createElement('input');
            input.setAttribute(attributeInput, part);
            input.type = 'number';
            input.value = '0';
            input.classList.add('bg-black', 'text-white');
            input.addEventListener('change', () => {
                btController.setManualCommand(this.inputValues);
            });
            container.append(input);
            return container;
        });
        inputs.forEach((input: HTMLDivElement): void => {
            this.append(input);
        });
    }
}
customElements.define(ManualInput.tag, ManualInput, { extends: 'div' });

export type ManualArgument = {
    x: number, y: number, z: number,
    a: 0 | 1 | 2, b: 0 | 1 | 2
};
export const generateInput = (argument: ManualArgument) => {
    return [15, 7, 2, 0, argument.x, argument.a, argument.y, argument.b, argument.z]
}