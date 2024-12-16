import{Routes,Route,BrowserRouter} from 'react-router-dom'
import Index  from './Views/index'
import Details from './Views/details'
import React from 'react';


function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path='/pokemon/:id' element={<Details />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
