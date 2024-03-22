import RingLoader from 'react-spinners/RingLoader';

const Loader = () => {
  return (
    <div className='loader'>
        <h1> Estamos Generando tu Reporte. Cargando ...</h1>
        <div className='ring'>
            <RingLoader color="rgba(255 201, 0, 1)" size={225} />
        </div>
    </div>
  )
}

export default Loader