import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';

function LoginPage(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signin, errors: signinErrors} = useAuth();

    const onSubmit = handleSubmit((data) =>{
        signin(data);
    })
    


    return(
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className='bg-primary  max-w-md w-full p-10 rounded-md'>

        <div className="flex gap-2 justify-center">
            <img src="Logo.png" alt="sabanaride" />
        </div>

        {Array.isArray(signinErrors) && signinErrors.map((error, i) => (
          <div key={i} className='bg-red-500 p-2 text-white my-2 rounded text-center'>
              {error}
          </div>
      ))}
            <h1 className='text-2xl font-bold text-center my-2'>Ponte en marcha!</h1>
        <form onSubmit={onSubmit} className="space-y-5"
        >
          <input type="email" {...register("email", {required: true})}
            className='w-full bg-white text-black px-4 py-2 rounded-md my-2 text-center'
            placeholder='Escribe tu correo'
          />
          {errors.email && (<p className='text-red-500'>Correo requerido</p>)}
  
          <input type="password" {...register("password", {required: true})}
            className='w-full bg-white text-black px-4 py-2 rounded-md my-2 text-center'
            placeholder='Escribe tu contraseña'
          />
          {errors.password  && (<p className='text-red-500'>Contraseña requerida</p>)}
  
          <button 
            type="submit" 
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
          >Iniciar Sesión
          </button>
        </form>

        <p className='flex gap-2 justify-between'>
            No tienes una cuenta? <Link to="/register"
            className='text-sky-500'>Crear cuenta</Link>
        </p>
        </div>
    </div>
        
    )
  }
  export default  LoginPage;