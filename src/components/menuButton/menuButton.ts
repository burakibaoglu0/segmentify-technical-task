import {
    fetchAndSetCategories
} from '../../ts/componentFunctions';
import { BUTTON_STYLE_URL } from '../../ts/config';

const menuButtonTemplate = document.createElement('template');

menuButtonTemplate.innerHTML = `
    <span class="pseudo-element"></span>
    <span class="category-name"></span>

    <style>
        @import url('${BUTTON_STYLE_URL}');
    </style>
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

        (this.shadowRoot as ShadowRoot)

        if(document.querySelector('product-container')?.getAttribute('data-category-name') === (this.shadowRoot as ShadowRoot).host.getAttribute('data-category-name')){
            (this.shadowRoot as ShadowRoot).host.classList.add('active');
        }
    }
}

window.customElements.define("menu-button", MenuButton);

fetchAndSetCategories();