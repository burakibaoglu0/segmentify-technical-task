import { fetchAndSetCategories } from '../../ts/componentFunctions';
import urlConfig from '../../ts/config';

const menuButtonTemplate = document.createElement('template');

menuButtonTemplate.innerHTML = `
    <span class="pseudo-element"></span>
    <div class="category-name">
        <span></span>
    </div>
    <style>
        @import url('${urlConfig.BUTTON_STYLE_URL}');
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
        const span = this.shadowRoot?.querySelector('.category-name span') as HTMLElement;
        span.innerText = this.getAttribute('data-category-name') || '';

        (this.shadowRoot as ShadowRoot)

        if(document.querySelector('product-container')?.getAttribute('data-category-name') === (this.shadowRoot as ShadowRoot).host.getAttribute('data-category-name')){
            (this.shadowRoot as ShadowRoot).host.classList.add('active');
        }
    }
}

window.customElements.define("menu-button", MenuButton);

fetchAndSetCategories();