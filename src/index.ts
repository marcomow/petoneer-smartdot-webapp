import { ButtonBtConnect } from "./custom_elements/ButtonBtConnect";
import { SectionInteractions } from "./custom_elements/SectionInteractions";

const init = () => {
    const main: HTMLElement = document.querySelector('main');
    main.appendChild(document.createElement('div', { is: SectionInteractions.tag }));
    main.appendChild(document.createElement('button', { is: ButtonBtConnect.tag }));
}
init();