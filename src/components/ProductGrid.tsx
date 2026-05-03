import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { fetchProductsPage, searchProductsPage } from '../api/products'
import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'

const FIRST_PAGE_LIMIT = 12
const LOAD_MORE_LIMIT = 8

export function ProductGrid() {
  const [searchInput, setSearchInput] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadFirstPage() {
      setLoading(true)
      setError(null)
      try {
        const res =
          appliedQuery === ''
            ? await fetchProductsPage(0, FIRST_PAGE_LIMIT)
            : await searchProductsPage(appliedQuery, 0, FIRST_PAGE_LIMIT)
        if (!cancelled) {
          setProducts(res.products)
          setTotal(res.total)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Something went wrong')
          setProducts([])
          setTotal(0)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadFirstPage()
    return () => {
      cancelled = true
    }
  }, [appliedQuery])

  const handleSearchSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      setAppliedQuery(searchInput.trim())
    },
    [searchInput],
  )

  const handleLoadMore = useCallback(async () => {
    setLoading(true)
    setError(null)
    const skip = products.length
    try {
      const res =
        appliedQuery === ''
          ? await fetchProductsPage(skip, LOAD_MORE_LIMIT)
          : await searchProductsPage(appliedQuery, skip, LOAD_MORE_LIMIT)
      setProducts((prev) => [...prev, ...res.products])
      setTotal(res.total)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [appliedQuery, products.length])

  const canLoadMore = products.length < total

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <form
        onSubmit={handleSearchSubmit}
        className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label
            htmlFor="product-search"
            className="mb-1 block text-left text-sm font-medium text-slate-700"
          >
            Search by title
          </label>
          <input
            id="product-search"
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="e.g. phone, laptop…"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>

      {error && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-800">
          {error}
        </p>
      )}

      {loading && products.length === 0 && (
        <p className="text-center text-slate-600">Loading…</p>
      )}

      {!loading && products.length === 0 && !error && (
        <p className="text-center text-slate-600">No products found.</p>
      )}

      {products.length > 0 && (
        <>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-3">
            {loading && products.length > 0 && (
              <p className="text-sm text-slate-600">Loading…</p>
            )}
            {canLoadMore && (
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loading}
                className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Load more
              </button>
            )}
          </div>
        </>
      )}
    </section>
  )
}
