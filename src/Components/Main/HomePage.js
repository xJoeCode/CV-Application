import NavigationButton from "../UI/NavigationButton"
import documentsBg from '../Assets/documentsBg.svg'
import { useAccount } from "../Context/accountContext"
import Logo from "../UI/Logos/Logo"





export default function Homepage(){

    const{setCurrentPage} = useAccount()


return(
    <div className=" mx-auto bg-beige w-screen h-screen">
        
        <div className=" mx-auto flex justify-center bg-pastelGreen shadow-2xl w-4/6 h-screen bg-documentsBg bg-no-repeat bg-cover">
            <div className="bg-white  mt-40 w-2/4  rounded-xl h-2/4">
            <Logo size='w-8/12'/>
            </div>
            
        </div>
        

    </div>
    
)

}


