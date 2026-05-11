import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'

const sampleProduct: Product = {
  id: 1,
  title: 'Test Widget',
  price: 19.99,
  thumbnail: 'https://example.com/image.jpg',
  category: 'electronics',
}

describe('ProductCard', () => {
  it('shows title, category, price, and image', () => {
    render(<ProductCard product={sampleProduct} />)

    expect(
      screen.getByRole('heading', { name: 'Test Widget' }),
    ).toBeInTheDocument()
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText('$19.99')).toBeInTheDocument()

    const img = screen.getByRole('img', { name: 'Test Widget' })
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg')
  })
})
