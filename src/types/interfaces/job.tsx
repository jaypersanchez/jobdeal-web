export interface IJob {
  id: number;
  title: string;
  description: string;
  price: number;
  lat: number;
  lng: number;
  address: string;
  categoryIds: number[];
  images: string[];
}
