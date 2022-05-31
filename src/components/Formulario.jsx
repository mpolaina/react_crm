import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({ cliente, cargando }) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
               .min(3, 'El nombre es muy corto')
               .max(30, 'El nombre es muy largo')
               .required('El nombre es obligatorio'),
    empresa: Yup.string()
                .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
              .required('Email obligatorio')
              .email('Email no válido'),
    telefono: Yup.number()
                 .integer('Número no válido')
                 .positive('Número no válido')
                 .typeError('El número no es válido')
  })

  const handleSubmit = async (valores) => { 
    try {
        let respuesta
        if( cliente.id ) {
            // editando cliente
            const url = `http://localhost:4000/clientes/${cliente.id}`
            respuesta = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(valores),
                headers: {
                  'Content-Type': 'application/json' 
                }
            })
        } else {
            // nuevo cliente 
            const url = 'http://localhost:4000/clientes'
            respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(valores),
                headers: {
                  'Content-Type': 'application/json' 
                }
            })
        }
        await respuesta.json()
        navigate('/clientes')

    } catch (error) {
      console.log(error)
    }
  }

  return (

    cargando ? <Spinner /> : (

      <div className="bg-white mt-10 px-8 py-10 rounded-md shadow-lg md:w-3/4 mx-auto">
          
          <Formik
              initialValues={{
                nombre: cliente?.nombre ?? '',
                empresa: cliente?.empresa ?? '',
                email: cliente?.email ?? '',
                telefono: cliente?.telefono ?? '',
                notas: cliente?.notas ?? '',
              }}
              enableReinitialize={true}
              onSubmit={ async (values, { resetForm }) => { 
                await handleSubmit(values)
                resetForm()
              }}
              validationSchema={nuevoClienteSchema}
          >
              { ({ errors, touched }) => {

                return (
                  <Form>
                      <div className='mb-4'>
                          <label
                            className='text-gray-800 font-bold'
                            htmlFor='nombre'
                          >
                            Nombre: 
                            </label>
                          <Field
                            id='nombre'
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder='Nombre del cliente'
                            name='nombre'
                          />
                          
                          { errors.nombre && touched.nombre ? (
                            <Alerta>{ errors.nombre }</Alerta>
                          ): null}

                      </div>
                      <div className='mb-4'>
                          <label
                            className='text-gray-800 font-bold'
                            htmlFor='empresa'
                          >
                            Empresa: 
                            </label>
                          <Field
                            id='empresa'
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder='Empresa del cliente'
                            name='empresa'
                          />

                          { errors.empresa && touched.empresa ? (
                            <Alerta>{ errors.empresa }</Alerta>
                          ): null}

                      </div>
                      <div className='flex gap-x-2'>
                            <div className='mb-4 w-1/2'>
                                <label
                                  className='text-gray-800 font-bold'
                                  htmlFor='email'
                                >
                                  Email: 
                                  </label>
                                <Field
                                  id='email'
                                  type="email"
                                  className="mt-2 block w-full p-3 bg-gray-50"
                                  placeholder='Email del cliente'
                                  name='email'
                                />
                                
                                { errors.email && touched.email ? (
                                    <Alerta>{ errors.email }</Alerta>
                                ): null}

                            </div>
                            <div className='mb-4 w-1/2'>
                                <label
                                  className='text-gray-800 font-bold'
                                  htmlFor='telefono'
                                >
                                  Teléfono: 
                                  </label>
                                <Field
                                  id='telefono'
                                  type="tel"
                                  className="mt-2 block w-full p-3 bg-gray-50"
                                  placeholder='Teléfono del cliente'
                                  name='telefono'
                                />

                                { errors.telefono && touched.telefono ? (
                                    <Alerta>{ errors.telefono }</Alerta>
                                ): null}

                            </div>
                      </div>
                      <div className='mb-4'>
                          <label
                            className='text-gray-800 font-bold'
                            htmlFor='notas'
                          >
                            Notas: 
                            </label>
                          <Field
                            as='textarea'
                            id='notas'
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-20"
                            placeholder='Notas del cliente'
                            name='notas'
                          />
                      </div>
                      <input type="submit" value={ cliente?.nombre ? 'Guardar Cambios' : 'Agregar Cliente'} 
                            className='mt-5 w-full bg-indigo-700 text-white p-3 rounded-md text-lg'
                      />
                  </Form>
                )}
              } 
          </Formik>
      </div>

    )

    
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario