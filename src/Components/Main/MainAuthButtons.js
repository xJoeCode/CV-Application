import {Link, Outlet, useLocation} from 'react-router-dom'
import Button from '../UI/Button'
import Button2 from "../UI/Button2"
import { useAccount } from '../Context/accountContext'
import { buildFormData } from '../../Utils/test-ultils'
import {useForms} from '../Context/formContext'
import {memo} from 'react'
import Logo from '../UI/Logos/Logo'



function MainAuthButtons(){

    const basicInfoData = buildFormData().basicInfo();
    const {email, ...otherData } = basicInfoData
    const {setAcc} = useAccount()
    //const [f,dispatchForms] = useForms()


    const {pathname} = useLocation()

    const generateFakeAccHandler = () =>{
        setAcc({email, testUser:true})
        //dispatchForms({cvIncludes:'BasicInfo', formData:basicInfoData})
    }




    return(
        <>
        <div className="w-screen h-screen flex justify-center items-center" >
            <div  className={pathname !== '/CV-Application/' ? " bg-beige w-4/5 h-auto lg:h-3/5 lg:pb-0 pb-8 flex flex-col lg:flex-row justify-center items-center rounded-md shadow-xl" : " bg-beige w-3/5  lg:w-1/5 h-3/5 flex flex-col justify-center items-center rounded-md shadow-xl"}>
                <div  className={pathname !== '/CV-Application/' ?'flex bg-brightPink h-full lg:flex-col flex-row  justify-center items-center w-cover' : 'flex h-full flex-col justify-center items-center'}>
                    <Logo styles='w-5/12 bg-transparent' />
                        <h1 className='font-serif m-8 capitalize text-ultraDarkBlue text-3xl text-center'>xJoeCode Resume Builder</h1>
                        <div className='flex justify-center  flex-wrap'>
                            <Link to='register'>
                                <Button2
                                bgColor='bg-green'>Register</Button2>
                            </Link>
                            <Link to='login'>
                                <Button2 bgColor='bg-green'>Login</Button2>
                            </Link>
                            <Button2 onClick={generateFakeAccHandler} bgColor='bg-green'>Try Resume Builder</Button2>
                        </div>
                    
                </div >
                <div className=" w-screen h-max flex justify-center items-start">
                    <Outlet/>
                </div>
                </div>
                
        </div>  
    </>
    )
}

MainAuthButtons = memo(MainAuthButtons)

export default MainAuthButtons
