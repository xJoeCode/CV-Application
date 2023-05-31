
import AuthenticatedApp from "./AuthenticatedApp"
import UnAuthenticatedApp from "./UnauthenticatedApp"
import { initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { useAccount } from "./Components/Context/accountContext";


const queryClient = new QueryClient()

const firebaseConfig = {
  apiKey: "AIzaSyC3fKVvQFGpFDX7VTHG426tfjcI5XifH8k",
  authDomain: "cv-application-ca7d6.firebaseapp.com",
  projectId: "cv-application-ca7d6",
  storageBucket: "cv-application-ca7d6.appspot.com",
  messagingSenderId: "109002730366",
  appId: "1:109002730366:web:a0299d165d802357a7a12f"
};

const app = initializeApp(firebaseConfig)


function App() {

  const { acc } =useAccount()


  const auth = getAuth()



  

  return (
    <>
    <QueryClientProvider client={queryClient}>
      {acc ? <AuthenticatedApp/> : <UnAuthenticatedApp auth={auth} />}
    </QueryClientProvider>
  </>
  );
}

export default App;
