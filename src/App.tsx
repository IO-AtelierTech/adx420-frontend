import BrandShowcase from './components/BrandVisualizer'
import { NavButton } from './components/NavButton'
import brand from './config/brand'

function App() {
  return (
    <>
      <div className='p-8 bg-gray-100 min-h-screen'>
        <BrandShowcase brand={brand} />
        <NavButton to='/content' variant='secondary'>
          View Content
        </NavButton>
      </div>
    </>
  )
}

export default App
