import {
    fetchAndSetCategories
} from '../../ts/componentFunctions';

const menuButtonTemplate = document.createElement('template');

menuButtonTemplate.innerHTML = `
    <span class="category-name"></span>

    <style>@import url('http://${location.host}/src/components/menuButton/menuButton.scss');</style>
    `;

class MenuButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });

        (this.shadowRoot as ShadowRoot).appendChild(menuButtonTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        (this.shadowRoot as ShadowRoot).host.classList.add('menu-button')
        const span = this.shadowRoot?.querySelector('.category-name') as HTMLElement;
        span.innerText = this.getAttribute('data-category-name') || '';
    }
}

window.customElements.define("menu-button", MenuButton);

fetchAndSetCategories();