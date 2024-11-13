import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import {AuthProvider} from  './context/AuthContext';
import HomePage from  './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';



function App(){
    return (
        <AuthProvider>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegistrationPage/>} />
            <Route element={<ProtectedRoute/>}>
                <Route path="/profile" element={<ProfilePage/>} />
            </Route>    
            </Routes>
            </BrowserRouter>
        </AuthProvider>
        
    )
}
export default App