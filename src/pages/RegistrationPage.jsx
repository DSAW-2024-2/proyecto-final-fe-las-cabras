import {useForm} from  'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

function RegistrationPage(){
  const {register, handleSubmit, formState: {errors}} = useForm();

  const {signup, isAuthenticated, errors: registerErrors, loading} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated){
      navigate("/profile")};
  }, [isAuthenticated, navigate])


  const onSubmit = handleSubmit(async (values) => {
    const formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      idCode: values.id
  };
  
  signup(formData);
});

return (

  <div className='bg-primary max-w-md p-10 rounded-md mx-auto mt-10'>
      {Array.isArray(registerErrors) && registerErrors.map((error, i) => (
          <div key={i} className='bg-red-500 p-2 text-white my-2 rounded'>
              {error}
  </div>
      ))}


      <form onSubmit={onSubmit} className="space-y-5"
      >
        <input type="text" {...register("firstName", {required: true})}
          className='w-full bg-white text-black px-4 py-2 rounded-md my-2 text-center'
          placeholder='Nombre'
          />
        {errors.firstName  && (<p className='text-red-500'>Nombre requerido</p>)}


        <input type="text" {...register("lastName", {required: true})}
          className='w-full bg-white text-black px-4 py-2 rounded-md my-2 text-center'
          placeholder='Apellido'
        />
        {errors.lastName && (<p className='text-red-500'>Apellido requerido</p>)}

        <input type="text" {...register("phone", {required: true})}
          className='w-full bg-white text-black px-4 py-2 rounded-md my-2 text-center'
          placeholder='Numero de celular'
        />
        {errors.phone && (<p className='text-red-500'>Numero de telefono requerido</p>)}

        <input type="email" {...register("email", {required: true})}
          className='w-full bg-white text-black px-4 py-2 rounded-md my-2 text-center'
          placeholder='Correo Institucional'
        />
        {errors.email && (<p className='text-red-500'>Email requerido</p>)}

        <input type="text" {...register("idCode", {required: true})}
          className='w-full bg-white text-black px-4 py-2 rounded-md my-2 text-center'
          placeholder='Codigo Unisabana'
        />
        {errors.idCode && (<p className='text-red-500'>Id requerido</p>)}

        <input type="password" {...register("password", {required: true})}
          className='w-full bg-white text-black px-4 py-2 rounded-md my-2 text-center'
          placeholder='Contraseña'
        />
        {errors.password  && (<p className='text-red-500'>Contraseña requerida</p>)}

        <button 
          type="submit" 
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Crear Cuenta'}
        </button>
      </form>
      <p className='flex gap-2 justify-between'>
            Ya tienes una cuenta?{" "} <Link to="/login"
            className='text-sky-500'>Iniciar  Sesión</Link>

        </p>
    </div>
  )
}
export default  RegistrationPage;
