
import NavigationButton from "../UI/NavigationButton"
import { useAccount } from "../Context/accountContext"

export default function MainNavigation(){

    const {setCurrentPage} = useAccount()


    return(
        <div className=" bg-brightPink flex justify-start ">
                <NavigationButton onClick={()=>{setCurrentPage('registration')}}>Register</NavigationButton>
                <NavigationButton onClick={()=>{setCurrentPage('login')}}>Login</NavigationButton>
                <NavigationButton onClick={()=>{setCurrentPage('guest')}}>Use Guest</NavigationButton>
            </div>
    )
}