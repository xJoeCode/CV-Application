import MainBackground from "./Components/UI/MainBackground"
import { useAccount } from "./Components/Context/accountContext"
import {Link, Routes, Route, useLocation} from 'react-router-dom'
import MainAuthButtons from "./Components/Main/MainAuthButtons"
import RegistrationForm from "./Components/Main/RegistrationForm"
import SignInForm from "./Components/Main/SignInForm"
import {AnimatePresence} from "framer-motion"




export default function UnAuthenticatedApp(props){

    const location = useLocation()




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