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
import { format,addDays } from 'date-fns';
import { useEffect, useState, CSSProperties } from 'react';
import GeneralJsonComponent from './GeneralJsonComponent'
import NivRepetidosComponent from './NivRepetidosComponent'
import VehiculoTotalEmisorJsonComponent from './VehiculoTotalEmisorJsonComponent'
import FrecuenciaJsonComponent from './FrecuenciaJsonComponent'
import RingLoader from 'react-spinners/RingLoader';
import Loader from './Loader';
import ComparacionImportes from './ComparacionImportes';

const TableGraphs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Nuevo estado para el indicador de carga
    const [dates, setDates] = useState({});
  
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
        const url = 'http://localhost:8000/app/v1/vehiculos'
        const params = {
            initial_date: '2024-01-01',
            final_date: '2024-01-07'
          };
        setDates(params);
        try {
            
            const response = await axios.get(url, { params });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log(data)

    if (loading) { // Si loading es verdadero, muestra el indicador de carga
        // return <h1>Cargando . . . </h1>;
          return <Loader/>
    }

    return (
        <div>
          {data && (
            <>
              <h1>Fecha inicial: {format(addDays(new Date(dates.initial_date), 1), 'dd-MM-yyyy')} 
              - Fecha final: {format(addDays(new Date(dates.final_date), 1), 'dd-MM-yyyy')}</h1>
              <VehiculoTotalEmisorJsonComponent data={data.vehiculoTotalEmisor_json} />
              <FrecuenciaJsonComponent data={data.frecuencia_json} />
              <NivRepetidosComponent data={data.niv_repetidos} repetidosData={data.duplicados_importeEmisor_json} />
              <ComparacionImportes data={data.comparacion_importes}/>
              <GeneralJsonComponent data={data.general_json} />
            </>
          )}
        </div>
      );
    };

export default TableGraphs