export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-600">
        Demo store · Data from{' '}
        <a
          href="https://dummyjson.com/products"
          className="text-violet-600 underline decoration-violet-300 underline-offset-2 hover:text-violet-800"
          target="_blank"
          rel="noreferrer"
        >
          DummyJSON
        </a>
      </div>
    </footer>
  )
}
