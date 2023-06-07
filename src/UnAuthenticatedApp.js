import MainBackground from "./Components/UI/MainBackground"
import { useAccount } from "./Components/Context/accountContext"
import Button from "./Components/UI/Button"
import {Link, Routes, Route} from 'react-router-dom'
import MainAuthButtons from "./Components/Main/MainAuthButtons"
import RegistrationForm from "./Components/Main/RegistrationForm"



export default function UnAuthenticatedApp(){




    return(
        <>
        <div className="flex justify-center items-center">

        <Routes>
            <Route path="/" element={<MainAuthButtons />}  > 
                <Route path="register" element={<RegistrationForm />} />
            </Route>
        </Routes>
        <MainBackground/>
        </div>
        </>
    )
}