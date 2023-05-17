// For local tests, switch the url prefix to "http://localhost:4173"
// For live environment, switch the url prefix to "https://segmentify-technical-task.vercel.app"

const isProd = process.env.NODE_ENV === 'production';

const urlConfig = {
  BASE_URL: isProd ? 'https://segmentify-technical-task.vercel.app/db/product-list.json' : '/public/db/product-list.json',
  BUTTON_STYLE_URL: isProd ? 'https://segmentify-technical-task.vercel.app/styles/menuButton.css' : '/src/components/menuButton/menuButton.scss',
  CONTAINER_STYLE_URL: isProd ? 'https://segmentify-technical-task.vercel.app/styles/productContainer.css' : '/src/components/productContainer/productContainer.scss',
  CARD_STYLE_URL: isProd ? 'https://segmentify-technical-task.vercel.app/styles/productCard.css' : '/src/components/productCard/productCard.scss',
  PLACEHOLDER_IMAGE_URL: isProd ? 'https://segmentify-technical-task.vercel.app/images/placeholder-image.webp' : '/public/images/placeholder-image.webp',
  CHECKMARK_ICON_URL: isProd ? 'https://segmentify-technical-task.vercel.app/images/checkmark.svg' : '/public/images/checkmark.svg'
};

export default urlConfig;