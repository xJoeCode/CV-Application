import { useContext, createContext, useState } from "react"


const AccountContext = createContext()

function AccountProvider (props) {

    const [userPass, setUserPass] = useState(null)
    const [acc, setAcc] = useState(null)
    const value = {userPass, setUserPass, acc,setAcc}

    return(<AccountContext.Provider value={props.value? props.value : value}>{props.children}</AccountContext.Provider>)
  }

  function useAccount(){
    const context = useContext(AccountContext)
    if (context === undefined){
        throw new Error('useAccount must be used within a use Account Provider')
    }
    return context
  }

  export {AccountProvider, useAccount}