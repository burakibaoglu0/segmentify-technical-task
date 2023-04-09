const productCardTemplate = document.createElement("template");
productCardTemplate.innerHTML = `
  <div class="product-image-area">
    <img class="product-image" loading="lazy" />
  </div>
  <div class="product-info">
    <div class="product-name"> </div>
  <div class="product-price"> </div>
  <div class="shipping-fee">
      <div class="shipping-fee-img">
          <i class="fa-solid fa-truck"></i>
      </div>
      <div class="shipping-fee-text"></div>
  </div>
  </div>
  <div class="add-to-cart">
    Sepete Ekle
  <div>

  <style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');
    @import url('http://${location.host}/src/components/productCard/productCard.scss');
  </style>
`;

class ProductCard extends HTMLElement {
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
    imgElement.src = this.getAttribute('source') || '';

    const nameElement = this.shadowRoot?.querySelector('.product-name') as HTMLDivElement;
    nameElement.innerText = this.getAttribute('name') || '';

    const priceElement = this.shadowRoot?.querySelector('.product-price') as HTMLDivElement;
    priceElement.innerText = this.getAttribute('price') || '';

    const shippingFeeElement = this.shadowRoot?.querySelector('.shipping-fee-text') as HTMLDivElement;
    shippingFeeElement.innerText = this.getAttribute('fee') || '';

    if (this.getAttribute("fee") !== 'Ücretsiz Kargo') {
      ((this.shadowRoot as ShadowRoot).querySelector('.shipping-fee-img') as HTMLElement).style.display = 'none';
    }

  }
}

window.customElements.define("product-card", ProductCard);