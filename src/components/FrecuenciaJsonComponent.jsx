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

const FrecuenciaJsonComponent = ({ data }) => {

  const columns = [
    {
      id: "n",
      header: "Ind",
      accessorKey: "n",
      footer: "Ind"
    },
    {
      id: "niv",
      header: "NIV",
      accessorKey: "niv",
      footer: "NIV"
    },
    {
      id: "frecuencia",
      header: "Frecuencia",
      accessorKey: "frecuencia",
      footer: "Frecuencia"
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
      text: 'Frecuencia de aparicion NIVv Top 10'
    },
    xAxis: {
      categories: data.slice(0, 10).map(item => item.niv),
      title: {
        text: 'Niv'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Frecuencia'
      }
    },
    series: [{
      name: 'Frecuencia',
      data: data.slice(0, 10).map(item => item.frecuencia)
    }]
  };



  return (
    <div>
      <h2> Frecuencia de Aparicion de NIV Repetidos </h2>
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
        filename={"niv_repetidos.csv"}
      >
        Download CSV
      </CSVLink>
      <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    </div>
  );
};

export default FrecuenciaJsonComponent