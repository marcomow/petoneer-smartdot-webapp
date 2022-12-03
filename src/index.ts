import { ButtonBtConnect } from "./custom_elements/ButtonBtConnect";
import { SectionInteractions } from "./custom_elements/SectionInteractions";

export const init = () => {
    const main = document.querySelector('main');
    if (!main) {
        throw new Error('No main element found');
    }
    main.appendChild(document.createElement('button', { is: ButtonBtConnect.tag }));
    main.appendChild(document.createElement('div', { is: SectionInteractions.tag }));
}