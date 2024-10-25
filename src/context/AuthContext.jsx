import { createContext, useContext, useState } from "react";
import { registerReq, loginReq } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;

};

export const AuthProvider  = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated,  setIsAuthenticated] = useState(false);
    const [errors,  setErrors] = useState([]);
    const [loading, setLoading] = useState(false);



    const signup  = async (user) =>{
        try {
            setLoading(true);
            setErrors([]);
            const res = await registerReq(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (error.response) {
                
                const errorData = error.response.data;
                setErrors(Array.isArray(errorData) ? errorData : [errorData.message || 'Server error']);
            } else if (error.request) {
                
                setErrors(['No se pudo conectar con el servidor. Verifica tu conexión.']);
            } else {
                
                setErrors(['Ocurrió un error inesperado.']);
            }
        } finally {
            setLoading(false);
        }
    };

    const signin = async (user) =>{
        try {
            const res = await loginReq(user);
            console.log(res)
            setIsAuthenticated(true);
            setUser(res.data)
        } catch (error) {
            if (Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
        }
    }


    return (
        <AuthContext.Provider value={{ user,  signup, signin, isAuthenticated, errors, loading}}>
            {children}
        </AuthContext.Provider>
    )
}
