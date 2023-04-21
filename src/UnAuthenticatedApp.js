
import Homepage from "./Components/Main/HomePage";
import { useAccount } from "./Components/Context/accountContext";
import Registration from "./Components/Main/Registration";




function UnAuthenticatedApp (props) {


    const { setAcc,userPass, setUserPass, currentPage}= useAccount()


 
    

    return(
        <>
        
         {currentPage === 'registration'&& <Registration auth={props.auth} />}
         <Homepage/>
        </>
       
        
    )
}

export default UnAuthenticatedApp