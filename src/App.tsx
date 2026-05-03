import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ProductGrid } from './components/ProductGrid'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      <Header />
      <main className="flex-1">
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}

export default App
