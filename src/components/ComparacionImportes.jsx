import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3d from 'highcharts/highcharts-3d'; 
import { CSVLink } from 'react-csv';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';

// Activar Highcharts3d
Highcharts3d(Highcharts)

const ComparacionImportes = ({ data }) => {
    // Acceder al primer elemento del array
    const dato = data[0];
    const options = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 50
            }
      },
      title: {
        text: 'Comparación de importes'
      },
      subtitle: {
        text: 'Gráfico de dona en 3D'
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 65
        }
      },
      series: [{
        name: 'Importes',
        data: [
          ['Importe', dato.importe],
          ['Importe repetidos', dato.importe_repetidos]
        ]
      }]
    };
    

  
    return (
        <div>
            <h1> Comparación de Importes</h1>
            <div>
                <HighchartsReact
                highcharts={Highcharts}
                options={options}
                />
            </div>
        </div>
    );
  };
  
  export default ComparacionImportes;