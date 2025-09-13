import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PublicPage from './components/layouts/PublicPage'
import GenerateImg from './pages/GenerateImg'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import ProtectedRoute from './routes/ProtectedRoute'
import Image from './pages/Image'
import BuyCredits from './pages/BuyCredits'
import Verify from './pages/auth/Verify'
import './App.css'
import {ToastContainer} from 'react-toastify'
import ResetPassword from './pages/auth/ResetPassword'
const App = () => {
  return (
    <div>
      
      <Routes>
       
        <Route path='/generate-img'  element={<ProtectedRoute> <GenerateImg /> </ProtectedRoute>} />
      
        <Route path='/' element={<PublicPage />}/>

        <Route path='/register' element={<SignUp />}/>
        <Route path='/login' element={<SignIn />}/>
        <Route path='/image' element={<ProtectedRoute> <Image /> </ProtectedRoute>}/>
        <Route path='/buy' element={<BuyCredits/>}/>
        <Route path='/verify' element={<Verify />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App