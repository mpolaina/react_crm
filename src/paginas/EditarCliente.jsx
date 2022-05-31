import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario';

const EditarCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams()
  useEffect( () => {
    setCargando(!cargando)
    const obtenerClientesAPI = async () => {
      try {
          const url = `http://localhost:4000/clientes/${id}`
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setCliente(resultado)
      } catch (error) {
           console.log(error)
      }
      setCargando(false)
    }
    obtenerClientesAPI()
  }, []);

  return (
    <>
     <h1 className="font-black text-3xl text-indigo-500">Editar Cliente</h1> 
     <p className="mt-3">Utiliza este formulario para editar datos del cliente</p>

    { cliente?.nombre ? (
        <Formulario 
          cliente={cliente}
          cargando={cargando}
        />
      ) : <p className='mt-4 text-center text-2xl'>Cliente ID no válido.</p>
    }

    </>
  )
}

export default EditarCliente