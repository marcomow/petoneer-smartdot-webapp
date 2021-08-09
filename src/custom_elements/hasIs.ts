export const hasIs = (element: HTMLElement) => {
    element.setAttribute("is", element.constructor["tag"]);
}
