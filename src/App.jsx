import React from 'react'
import SimpleTable from './components/SimpleTable'
import SimpleTableVehicles from './components/SimpleTableVehicles'
import SimpleTableNivRepetidos from './components/SimpleTableNivRepetidos'
import Header from './components/Header'
import TableGraphs from './components/TableGraphs'



function App() {
  return (
    <div>
      <Header/>
      <TableGraphs/>
      {/* <SimpleTable/>
      <SimpleTableVehicles/>
      <SimpleTableNivRepetidos/> */}
    </div>
    
  )
}

export default App