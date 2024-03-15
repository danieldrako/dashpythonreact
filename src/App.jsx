import React from 'react'
import SimpleTable from './components/SimpleTable'
import SimpleTableVehicles from './components/SimpleTableVehicles'
import SimpleTableNivRepetidos from './components/SimpleTableNivRepetidos'



function App() {
  return (
    <div>
      <SimpleTable/>
      <SimpleTableVehicles/>
      <SimpleTableNivRepetidos/>
    </div>
    
  )
}

export default App