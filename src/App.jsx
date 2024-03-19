import React from 'react'
import SimpleTable from './components/SimpleTable'
import SimpleTableVehicles from './components/SimpleTableVehicles'
import SimpleTableNivRepetidos from './components/SimpleTableNivRepetidos'
import Header from './components/Header'



function App() {
  return (
    <div>
      <Header/>
      <SimpleTable/>
      <SimpleTableVehicles/>
      <SimpleTableNivRepetidos/>
    </div>
    
  )
}

export default App