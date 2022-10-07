import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MyNavBar from './components/MyNavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Purchases from './pages/Purchases'
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getProductThunk } from './store/slices/products.slice'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/PortectedRoutes'




function App() {


  const isLoading = useSelector(state => state.isLoading)
  const isVisible = useSelector(state => state.car)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductThunk())
  }, []);

  return (
    <HashRouter>
      <MyNavBar />
      {isLoading && <LoadingScreen />}
      <Container className='mt-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={<Purchases />} />
            <Route path='/productdetails/:id' element={<ProductDetails />} />
          </Route>

        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
