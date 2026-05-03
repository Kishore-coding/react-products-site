import type { Product } from '../types/product'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4 text-left">
        <h2 className="line-clamp-2 text-base font-medium text-slate-900">
          {product.title}
        </h2>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {product.category}
        </p>
        <p className="mt-auto pt-2 text-lg font-semibold text-slate-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}
