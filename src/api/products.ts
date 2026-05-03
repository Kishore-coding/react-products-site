import type { ProductsListResponse } from '../types/product'

const BASE = 'https://dummyjson.com'

async function parseResponse(res: Response): Promise<ProductsListResponse> {
  if (!res.ok) {
    throw new Error('Failed to load products')
  }
  return res.json()
}

export function fetchProductsPage(
  skip: number,
  limit: number,
): Promise<ProductsListResponse> {
  const params = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
  })
  return fetch(`${BASE}/products?${params}`).then(parseResponse)
}

export function searchProductsPage(
  query: string,
  skip: number,
  limit: number,
): Promise<ProductsListResponse> {
  const params = new URLSearchParams({
    q: query,
    skip: String(skip),
    limit: String(limit),
  })
  return fetch(`${BASE}/products/search?${params}`).then(parseResponse)
}
