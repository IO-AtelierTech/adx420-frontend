import BrandShowcase from './components/BrandVisualizer'
import { currentBrand } from './config'


function App() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <BrandShowcase brand={currentBrand} />
    </div>
  )
}

export default App
