export interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
}

export interface ProductsListResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
