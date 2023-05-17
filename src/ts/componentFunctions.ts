import { ICategories, ICampaign, IProduct } from './types';
import { fetchProductList } from './api';
import Toastify from 'toastify-js';

const initSlider = (_productRow:HTMLElement) => {
  try{
    if(_productRow.classList.contains('slick-initialized') && _productRow.classList.contains('slick-slider')){
      _productRow.classList.remove('slick-initialized');
      _productRow.classList.remove('slick-slider');
    }
  
    jQuery(_productRow)?.slick({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 485,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        }
      ]
    });
  }catch(err){
    //console.log(err);
  }
}

export const fetchAndSetProducts = async (categoryName: string, shadowRoot: ShadowRoot) => {
  const productRow = shadowRoot?.querySelector('.product-row') as HTMLElement;
  productRow.innerHTML = '';
  try {
    const data: ICampaign = await fetchProductList()
    const productList = data.responses[0][0].params.recommendedProducts[`${categoryName}`];

    const productCards = productList.map((product: IProduct) => {
      const productCard = document.createElement('product-card');
      productCard.setAttribute('source', product.image);
      productCard.setAttribute('name', product.name);
      productCard.setAttribute('price', product.priceText);
      if (product.params?.shippingFee === 'FREE') {
        productCard.setAttribute('fee', 'Ücretsiz Kargo');
      }
      return productCard;
    });

    productRow.append(...productCards);

    initSlider(productRow);
  } catch (error) {
    //console.log(error);
  }
};

export const fetchAndSetCategories = async () => {
  try {
    const data: ICampaign = await fetchProductList();
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
    //console.log(error);
  }
};

export const createToastify = (node: Node) => {
  Toastify({
    node,
    duration: 1e3,
    close: true,
    gravity: 'bottom',
    position: window.innerWidth < 992 ? 'center' : 'right',
    stopOnFocus: true,
    className: "seg-info-popup"
  }).showToast();
}

const imageCache: Record<string, Promise<void> | undefined> = {};

export const loadImage = (imgSource: string, imgElement: HTMLImageElement): Promise<void> => {
  if (imageCache[imgSource] !== undefined) {
    return imageCache[imgSource]!;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(imgSource, { signal })
      .then((response) => {
        if (response.ok) {
          imgElement.src = imgSource;
          resolve();
        } else {
          reject(/*new Error('Image loading failed')*/);
        }
      })
      .catch((_error) => {
        reject(/*error*/);
      });

    setTimeout(() => {
      controller.abort();
      reject(/*new Error('Image loading timed out')*/);
    }, 3000);
  });

  imageCache[imgSource] = promise;
  return promise;
}