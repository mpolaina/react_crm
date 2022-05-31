import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';

const VerCliente = () => {

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
    <div>
      
      { cargando ? <Spinner/> : 
            Object.keys(cliente).length === 0 ? 
              <p>No hay resultados </p> : 
            (
              <>
                <h1 className="font-black text-3xl text-indigo-500">Ver Cliente: {cliente.nombre}</h1> 
                <p className="mt-3">Información del cliente</p>

                <div className='bg-white p-4 mt-8 rounded-md shadow-md'>
                    <p className='text-xl text-gray-600'>
                        <span className='uppercase font-bold mr-2'> 
                          Nombre:
                        </span>
                        {cliente.nombre}
                    </p>
                    <p className='text-xl text-gray-600 mt-2'>
                        <span className='uppercase font-bold mr-2'> 
                          Email:
                        </span>
                        {cliente.email}
                    </p>
                    { cliente.telefono && (
                        <p className='text-xl text-gray-600 mt-2'>
                          <span className='uppercase font-bold mr-2'> 
                            Teléfono:
                          </span>
                          {cliente.telefono}
                        </p>
                    )}
                    { cliente.empresa && (
                        <p className='text-xl text-gray-600 mt-2'>
                            <span className='uppercase font-bold mr-2'> 
                              Empresa:
                            </span>
                            {cliente.empresa}
                        </p>
                    )}
                    { cliente.notas && (
                        <p className='text-xl text-gray-600 mt-2'>
                            <span className='uppercase font-bold mr-2'> 
                              Notas:
                            </span>
                            {cliente.notas}
                        </p>
                    )}
                </div>
              </>
            )
      }

    </div>
  )
}

export default VerCliente