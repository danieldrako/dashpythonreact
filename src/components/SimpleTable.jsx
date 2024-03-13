import {
  useReactTable, getCoreRowModel,
  flexRender
} from '@tanstack/react-table'
import axios from 'axios';
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
      accessorKey: "emisor"
    },
    {
      id: "importeTotal",
      header: "Importe",
      accessorKey: "importeTotal"
    }
  ];

  const table = useReactTable({
    data,
    columns, 
    getCoreRowModel: getCoreRowModel()})
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.column.columnDef.header}
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
          <tr>
            <td>id</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default SimpleTable