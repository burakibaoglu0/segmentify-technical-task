import urlConfig from './config';
import { ICampaign } from './types';

let productListData: ICampaign | null = null;

export const fetchProductList = async (): Promise<ICampaign> => {
  if (productListData) {
    return productListData;
  }

  try {
    const response = await fetch(`${urlConfig.BASE_URL}`);
    const data = await response.json();
    productListData = data;
    return data;
  } catch (error) {
    //console.log(error);
    throw new Error('Failed to fetch product list');
  }
};
