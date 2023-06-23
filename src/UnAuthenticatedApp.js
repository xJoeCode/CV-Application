import MainBackground from "./Components/UI/MainBackground"
import { Routes, Route, Navigate} from 'react-router-dom'
import MainAuthButtons from "./Components/Main/MainAuthButtons"
import RegistrationForm from "./Components/form/RegistrationForm"
import SignInForm from "./Components/form/SignInForm"




export default function UnAuthenticatedApp(props){





    return(
        <>
        <div className="flex justify-center items-center">
            <Routes>
                <Route path='/' element={<Navigate to='/CV-Application'/>} />
                <Route path='*' element={<h2>404 Page Not Found</h2>} />
                <Route path="/CV-Application" element={<MainAuthButtons />}  > 
                    <Route path="register" element={<RegistrationForm auth={props.auth} />} />
                    <Route path="login" element={<SignInForm auth={props.auth} />} />
                </Route>
            </Routes>
            <MainBackground/>

        </div>
        </>
    )
}