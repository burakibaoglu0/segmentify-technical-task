import {
  fetchAndSetProducts
, waitComponentStyles} from '../../ts/componentFunctions';
import { CONTAINER_STYLE_URL } from '../../ts/config';

const productContainerTemplate = document.createElement("template");
productContainerTemplate.innerHTML = `
<div class="product-row"></div>

<style>
  @import url('${CONTAINER_STYLE_URL}');
</style>
`;

class productContainer extends HTMLElement {
  categoryName: string = '';

  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });

    (this.shadowRoot as ShadowRoot).appendChild(productContainerTemplate.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['data-category-name'];
  }

  connectedCallback() {
    (this.shadowRoot as ShadowRoot).host.classList.add('product-container');

    this.categoryName = this.getAttribute('data-category-name') || '';

    fetchAndSetProducts(this.categoryName, (this.shadowRoot as ShadowRoot));

    waitComponentStyles(CONTAINER_STYLE_URL, (this.shadowRoot as ShadowRoot));
  }

  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'data-category-name' && oldValue && newValue) {
      this.categoryName = newValue;
      fetchAndSetProducts(this.categoryName, (this.shadowRoot as ShadowRoot));
    }
  }
}

window.customElements.define("product-container", productContainer);