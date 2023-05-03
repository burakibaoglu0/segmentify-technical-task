import { ICategories, IProduct, ICampaign } from './types';
import { BASE_URL } from './config';

export const fetchAndSetProducts = async (categoryName: string, shadowRoot: ShadowRoot) => {
  const productRow = shadowRoot?.querySelector('.product-row') as HTMLElement;
  productRow.innerHTML = '';

  try {
    const response = await fetch(`${BASE_URL}`);
    const data: ICampaign = await response.json();
    const productList = data.responses[0][0].params.recommendedProducts[`${categoryName}`];

    productList.forEach((product: IProduct) => {
      const productCard = document.createElement("product-card");
      productCard.setAttribute('source', product.image);
      productCard.setAttribute('name', product.name);
      productCard.setAttribute('price', product.priceText);

      if (product.params?.shippingFee === 'FREE') {
        productCard.setAttribute('fee', 'Ücretsiz Kargo');
      }
      shadowRoot.querySelector('.product-row')?.appendChild(productCard);
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAndSetCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    const data: ICampaign = await response.json();
    let categoires: Array<ICategories> = [];

    categoires = data.responses[0][0].params.userCategories.map((item: string) => {
      return {
        name: item
      }
    });

    categoires.forEach(e => {
      const menuButton = document.createElement('menu-button');
      const buttonText = e.name.includes('>') ? e.name.split('>')[1].trim() : e.name;
      menuButton.setAttribute('data-category-name', buttonText);

      (document.querySelector('.product-menu') as HTMLElement).appendChild(menuButton);

      menuButton.addEventListener("click", function () {
        (document.querySelectorAll('menu-button') as NodeList).forEach((element: Node) => {
          element instanceof HTMLElement ? element.classList.remove('active') : null;
        });

        menuButton.classList.add('active');
        const container = document.getElementById('product-container') as HTMLElement;
        container.setAttribute('data-category-name', e.name);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const waitComponentStyles = async (styleUrl: string, shadowRoot: ShadowRoot) => {
  shadowRoot.host.classList.add('d-none');

  fetch(`${styleUrl}`)
  .then(response => {
    if (response.ok) {
      shadowRoot.host.classList.remove('d-none');
    }
  })
  .catch(error => console.log(error));
  
}
