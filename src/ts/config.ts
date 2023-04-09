const isProduction = process.env.NODE_ENV === 'production' ? true : false;

//* For local tests
// export const BASE_URL = isProduction ? 'http://localhost:4173/db/product-list.json' : '/public/db/product-list.json';
// export const BUTTON_STYLE_URL = isProduction ? 'http://localhost:4173/styles/menuButton.css' : '/src/components/menuButton/menuButton.scss'; 
// export const CONTAINER_STYLE_URL = isProduction ? 'http://localhost:4173/styles/productContainer.css' : '/src/components/productContainer/productContainer.scss'; 
// export const CARD_STYLE_URL = isProduction ? 'http://localhost:4173/styles/productCard.css' : '/src/components/productCard/productCard.scss'; 
// export const PLACEHOLDER_IMAGE_URL = isProduction ? 'http://localhost:4173/images/placeholder-image.webp' : '/public/images/placeholder-image.webp';

//* For live
export const BASE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/db/product-list.json' : '/public/db/product-list.json';
export const BUTTON_STYLE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/styles/menuButton.css' : '/src/components/menuButton/menuButton.scss'; 
export const CONTAINER_STYLE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/styles/productContainer.css' : '/src/components/productContainer/productContainer.scss'; 
export const CARD_STYLE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/styles/productCard.css' : '/src/components/productCard/productCard.scss'; 
export const PLACEHOLDER_IMAGE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/images/placeholder-image.webp' : '/public/images/placeholder-image.webp';