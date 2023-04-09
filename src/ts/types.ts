export interface ICategories{
  name: string
}

type NestedArray<T> = Array<T | NestedArray<T>>;

export interface ICampaign {
  campaigns: Array<any>;
  responses: NestedArray<any>;
  statusCode: string;
  timestamp: number;
}

interface params {
  sellerNick?: string,
  categoryPath?: string,
  minPrice?: string,
  gununFirsati?: string,
  maxPrice?: string,
  categoryCode?: string,
  productRatimg?: string,
  parentcategory?: string,
  yildizFirsat?: string,
  editorunSecimi?: string,
  variant?: string,
  Durum?: string,
  categoryCodes?: string,
  Marka?: string,
  vitrinTag?: string,
  shippingFee?: string,
  discountRate?: string
}

export interface IProduct {
  catCombineIds?: object,
  catalogIds?: Array<any>,
  categories?: Array<string>,
  category: Array<string>,
  currency: string,
  image: string,
  inStock: boolean,
  insertTime: number,
  language: string,
  lastUpdateTime: number,
  name: string,
  oldPrice?: number,
  oldPriceText?: string,
  params?: params,
  price: number,
  priceText: string,
  productId: string,
  publishTime: number,
  specialPriceText?: string,
  url: string
}