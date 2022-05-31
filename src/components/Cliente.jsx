import { useNavigate } from 'react-router-dom'
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

const Cliente = ({ cliente, handleEliminar }) => {

  const { nombre, empresa, email, telefono, notas, id } = cliente
  const navigate = useNavigate()

  return (
    <tr className="border-b hover:bg-indigo-50">
      <td className="py-3 pl-8">{nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold">Tlf: </span>
          {telefono}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button 
            type="button"
            className="bg-indigo-50 hover:bg-indigo-700 hover:text-white p-2 text-sm"
            onClick={ () => navigate(`/clientes/${id}`)}
        >
          <FiEye size='20px' />
        </button>
        <button 
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 text-white p-2 text-sm"
            onClick={ () => navigate(`/clientes/editar/${id}`)}
        >
          <FiEdit size='20px' />
        </button>
        <button 
            type="button"
            className="bg-rose-500 hover:bg-rose-700 text-white p-2 text-sm"
            onClick={ () => handleEliminar(id) }
        >
          <FiTrash2 size='20px' />
        </button>
      </td>
    </tr>
  )
}

export default Cliente