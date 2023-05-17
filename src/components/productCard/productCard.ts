import urlConfig from '../../ts/config';
import { createToastify, loadImage } from '../../ts/componentFunctions';

const productCardTemplate = document.createElement("template");
productCardTemplate.innerHTML = `
  <div class="product-image-area">
    <img width="150px" height="150px" class="product-image" loading="lazy" src="${urlConfig.PLACEHOLDER_IMAGE_URL}" alt="product-image">
  </div>
  <div class="product-info">
    <div class="product-name"> </div>
  <div class="product-price"> </div>
  <div class="shipping-fee">
      <div class="shipping-fee-img">
      <svg width="12px" height="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
      </div>
      <div class="shipping-fee-text"></div>
  </div>
  </div>
  <div class="add-to-cart">
    Sepete Ekle
  <div>

  <style>
   @import url('${urlConfig.CARD_STYLE_URL}');
  </style>
`;

class ProductCard extends HTMLElement {
  fetchCounter:number = 0;
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });

    (this.shadowRoot as ShadowRoot).appendChild(productCardTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    (this.shadowRoot as ShadowRoot).host.classList.add('product-card')

    const imgElement = this.shadowRoot?.querySelector('img') as HTMLImageElement;
    const imgSource = this.getAttribute('source') || '';

    loadImage(imgSource,imgElement);

    const nameElement = this.shadowRoot?.querySelector('.product-name') as HTMLDivElement;
    nameElement.innerText = this.getAttribute('name') || '';

    const priceElement = this.shadowRoot?.querySelector('.product-price') as HTMLDivElement;
    priceElement.innerText = this.getAttribute('price') || '';

    const shippingFeeElement = this.shadowRoot?.querySelector('.shipping-fee-text') as HTMLDivElement;
    shippingFeeElement.innerText = this.getAttribute('fee') || '';

    if (this.getAttribute("fee") !== 'Ücretsiz Kargo') {
      ((this.shadowRoot as ShadowRoot).querySelector('.shipping-fee-img') as HTMLElement).style.display = 'none';
    }

    const atcButton = this.shadowRoot?.querySelector('.add-to-cart') as HTMLDivElement;
    atcButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      const toastifyContent = document.createElement('div');
      toastifyContent.classList.add('seg-info-popup-content');

      toastifyContent.innerHTML = `
        <img class="seg-info-popup-icon" src="${urlConfig.CHECKMARK_ICON_URL}" />
        <div class="seg-info-popup-texts">
          <span>Ürün sepete eklendi.</span>
          <span>Sepete Git</span>
        </div>
      `

      createToastify(toastifyContent);
    });
  }
}

window.customElements.define("product-card", ProductCard);