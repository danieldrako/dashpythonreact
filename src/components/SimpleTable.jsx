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


function SimpleTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/datos');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(data)

  const columns = [
    {
      id: "emisor",
      header: "EMI",
      accessorKey: "emisor",
      footer: "Emisor"
    },
    {
      id: "importeTotal",
      header: "Importe",
      accessorKey: "importeTotal",
      footer: "ImporteTotal"
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
      data: data.map(item => item.importeTotal)
    }]
  };










  return (
    <div>
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
      <button onClick={()=> table.setPageIndex(0)}>
        Primer Pagina
      </button>
      <button onClick={()=> table.previousPage()}>
        Pagina Anterior
      </button>
      <button onClick={()=> table.nextPage()}>
        Pagina Siguiente
      </button>
      <button onClick={()=> table.setPageIndex(table.getPageCount()-1)}>
        Ultima Pagina
      </button>

      <CSVLink
        data={data}
        filename={"table_data.csv"}
      >
        Download CSV
      </CSVLink>

      <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  )
}

export default SimpleTable