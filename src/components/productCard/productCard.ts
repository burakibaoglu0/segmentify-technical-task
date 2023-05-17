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
   :host(.product-card){display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;flex-flow:column nowrap;align-items:center;border:1px solid #ddd;border-radius:1rem;padding:1rem;width:25rem;height:40rem}:host(.product-card) *{box-sizing:border-box}:host(.product-card) .product-image-area{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;flex-flow:row nowrap;align-items:center;justify-content:center;width:100%;height:15rem;overflow:hidden;border-radius:1rem;flex:0 0 auto}:host(.product-card) .product-image-area .product-image{width:100%;height:100%;object-fit:contain;border-radius:1rem}:host(.product-card) .product-info{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;flex-flow:column nowrap;align-items:center;justify-content:space-around;width:100%;height:15rem;overflow:hidden;flex:1 0 1px;padding:1rem 0;color:#333}:host(.product-card) .product-info .product-name{width:100%;font-size:1.4rem;font-weight:700;overflow:hidden;text-overflow:ellipsis;flex:0 0 auto;white-space:nowrap;padding:1rem}:host(.product-card) .product-info .product-price{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;flex-flow:row nowrap;align-items:center;justify-content:flex-start;font-size:2.4rem;font-weight:700;width:100%;overflow:hidden;text-overflow:ellipsis;flex:0 0 auto;background:#f0f0f0;padding:1rem;border-radius:.5rem}:host(.product-card) .product-info .shipping-fee{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;flex-flow:row nowrap;align-items:center;justify-content:flex-start;gap:1rem;font-size:1.2rem;width:100%;flex:0 0 auto;padding:1rem}:host(.product-card) .product-info .shipping-fee .shipping-fee-text{font-size:1.2rem;font-weight:700;flex:1 0 1px}:host(.product-card) .product-info .shipping-fee .shipping-fee-img{flex:0 0 auto;color:green;width:1.2rem;height:1.2rem}:host(.product-card) .product-info .shipping-fee .shipping-fee-img svg{width:inherit;height:inherit;fill:green}:host(.product-card) .add-to-cart{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;flex-flow:row nowrap;align-items:center;justify-content:center;width:100%;height:5rem;flex:0 0 auto;background-color:var(--dark-blue);border-radius:.5rem;cursor:pointer;color:#fff;font-size:1.8rem}:host(.product-card) .add-to-cart:hover{background-color:var(--darken-blue)}:host(.d-none){display:none!important;opacity:0!important;visibility:hidden!important}
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