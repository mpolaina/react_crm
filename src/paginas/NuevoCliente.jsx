import Formulario from "../components/Formulario"

const NuevoCliente = () => {
  return (
    <>
     <h1 className="font-black text-3xl text-indigo-500">Nuevo Cliente</h1> 
     <p className="mt-3">Rellena los siguientes campos para registrar un nuevo cliente</p>
     <Formulario />
    </>
  )
}

export default NuevoCliente