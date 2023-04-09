import {
  fetchAndSetProducts
} from '../../ts/componentFunctions';

const productContainerTemplate = document.createElement("template");
productContainerTemplate.innerHTML = `
<div class="product-row"></div>

<style>
@import url('http://${location.host}/src/components/productContainer/productContainer.scss');
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
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'data-category-name') {
      this.categoryName = newValue;
      fetchAndSetProducts(this.categoryName, (this.shadowRoot as ShadowRoot));
    }
  }
}

window.customElements.define("product-container", productContainer);