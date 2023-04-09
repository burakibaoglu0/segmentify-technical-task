const isProduction = process.env.NODE_ENV === 'production' ? true : false;

//export const BASE_URL = isProduction ? 'http://localhost:4173/db/product-list.json' : '/public/db/product-list.json';
export const BASE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/db/product-list.json' : '/public/db/product-list.json';
export const BUTTON_STYLE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/styles/menuButton.scss' : '/public/styles/menuButton.scss'; 
export const CONTAINER_STYLE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/styles/productContainer.scss' : '/public/styles/productContainer.scss'; 
export const CARD_STYLE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/styles/productCard.scss' : '/public/styles/productCard.scss'; 
export const PLACEHOLDER_IMAGE_URL = isProduction ? 'https://segmentify-technical-task.vercel.app/images/placeholder-image.webp' : '/public/images/placeholder-image.webp';