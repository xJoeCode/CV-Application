import MainBackground from "./Components/UI/MainBackground"
import { Routes, Route} from 'react-router-dom'
import MainAuthButtons from "./Components/Main/MainAuthButtons"
import RegistrationForm from "./Components/Main/RegistrationForm"
import SignInForm from "./Components/Main/SignInForm"




export default function UnAuthenticatedApp(props){



    return(
        <>
        <div className="flex justify-center items-center">
            <Routes>
                <Route path="/" element={<MainAuthButtons />}  > 
                    <Route path="register" element={<RegistrationForm auth={props.auth} />} />
                    <Route path="login" element={<SignInForm auth={props.auth} />} />
                </Route>
            </Routes>
            <MainBackground/>

        </div>
        </>
    )
}