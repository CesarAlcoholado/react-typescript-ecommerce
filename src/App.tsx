import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';
import { ProductDetail } from './components/ProductDetail';


function App() {

  return <Router>
    <div className="flex h-screen">
     <SideBar/>
     <div className="rounded w-full flex justify-between flex-wrap">
      <Routes>
        <Route path="/" element={<MainContent/>}/>
        <Route path='/product/:id' element={<ProductDetail/>} />
      </Routes>
     </div>
    </div>
  </Router>;
}

export default App
