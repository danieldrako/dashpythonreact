import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CSVLink } from 'react-csv';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';

const VehiculoTotalEmisorJsonComponent = ({ data }) => {

  const columns = [
    {
      id: "n",
      header: "Ind",
      accessorKey: "n",
      footer: "Ind"
    },
    {
      id: "emisor",
      header: "Emisor",
      accessorKey: "emisor",
      footer: "Emisor"
    },
    {
      id: "importe_total",
      header: "Importe",
      accessorKey: "importe_total",
      footer: "Importe"
    }
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



  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Importe Total por Emisor'
    },
    xAxis: {
      categories: data.map(item => item.emisor),
      title: {
        text: 'Emisor'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Importe Total'
      }
    },
    series: [{
      name: 'Importe Total',
      data: data.map(item => item.importe_total)
    }]
  };



  return (
    <div>
      <h2> Importe de Vehiculos por emisor</h2>
      <input 
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)} 
      />
      
      <table>
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
        filename={"importe_por_emisor.csv"}
      >
        Download CSV
      </CSVLink>
      <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    </div>
  );
};

export default VehiculoTotalEmisorJsonComponent;