import {
  useReactTable, getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import axios from 'axios';
import { CSVLink } from 'react-csv';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';


function SimpleTableVehicles() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/app/v1/vehiculos');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(data)

  const columns = [
    {
      id: "uuid",
      header: "uuid",
      accessorKey: "uuid",
      footer: "uuid"
    },
    {
      id: "IdConcepto",
      header: "IdConcepto",
      accessorKey: "idConcepto",
      footer: "idConcepto"
    },
    {
      id: "version",
      header: "version",
      accessorKey: "version",
      footer: "version"
    },
    {
      id: "claveVehicular",
      header: "claveVehicular",
      accessorKey: "claveVehicular",
      footer: "claveVehicular"
    },
    {
      id: "niv",
      header: "niv",
      accessorKey: "niv",
      footer: "niv"
    },
    {
      id: "fechaFactura",
      header: "fechaFactura",
      accessorKey: "fechaFactura",
      footer: "fechaFactura"
    },
    {
      id: "descripcion",
      header: "descripcion",
      accessorKey: "descripcion",
      footer: "descripcion"
    },
    {
      id: "importe",
      header: "importe",
      accessorKey: "importe",
      footer: "importe"
    },
    {
      id: "valorUnitario",
      header: "valorUnitario",
      accessorKey: "valorUnitario",
      footer: "valorUnitario"
    },
    {
      id: "descuento",
      header: "descuento",
      accessorKey: "descuento",
      footer: "descuento"
    },
    {
      id: "claveProdServ",
      header: "claveProdServ",
      accessorKey: "claveProdServ",
      footer: "claveProdServ"
    },
    {
      id: "cantidad",
      header: "cantidad",
      accessorKey: "cantidad",
      footer: "cantidad"
    },
    {
      id: "unidad",
      header: "unidad",
      accessorKey: "unidad",
      footer: "unidad"
    },
    {
      id: "noIdentificacion",
      header: "noIdentificacion",
      accessorKey: "noIdentificacion",
      footer: "noIdentificacion"
    },
    {
      id: "emisor",
      header: "emisor",
      accessorKey: "emisor",
      footer: "emisor"
    },
    {
      id: "receptor",
      header: "receptor",
      accessorKey: "receptor",
      footer: "receptor"
    },
  ];

  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState("")

  const table = useReactTable({
    data,
    columns, 
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state:{
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  })







  // const options = {
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: 'Importe Total por Emisor'
  //   },
  //   xAxis: {
  //     categories: data.map(item => item.emisor),
  //     title: {
  //       text: 'Emisor'
  //     }
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: 'Importe Total'
  //     }
  //   },
  //   series: [{
  //     name: 'Importe Total',
  //     data: data.map(item => item.importeTotal)
  //   }]
  // };










  return (
    <div>
      <h2> Conceptos relacionados a vehiculos </h2>
      <input 
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)} 
      />
      
      <div className="tabla">
      <table >
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    {'asc': "⬆️", "desc": "⬇️"}[header.column.getIsSorted()?? null]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup)=> (
            <tr key = {footerGroup.id}>
              {footerGroup.headers.map((footer)=> (
                <th key = {footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))
          }
        </tfoot>
      </table>
      </div>
      
      <div className='buttons'>
          <button className='css-button-fully-rounded--grey' onClick={()=> table.setPageIndex(0)}>
            Primer Pagina
          </button>
          <button className='css-button-fully-rounded--grey' onClick={()=> table.previousPage()}>
            Pagina Anterior
          </button>
          <button className='css-button-fully-rounded--grey' onClick={()=> table.nextPage()}>
            Pagina Siguiente
          </button>
          <button className='css-button-fully-rounded--grey' onClick={()=> table.setPageIndex(table.getPageCount()-1)}>
            Ultima Pagina
          </button>
        </div>

      <CSVLink className='css-button-fully-rounded--grey'
        data={data}
        filename={"table_data.csv"}
      >
        Download CSV
      </CSVLink>

      {/* <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      </div> */}
    </div>
  )
}

export default SimpleTableVehicles