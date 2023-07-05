import letters from '../Assets/letters.svg'

export default function MainBackground(){


    return(
        <div className='w-screen h-screen'>
           <img src={letters} alt='logo' className='object-cover h-screen w-screen  absolute top-0 left-0 -z-50'></img> 
        </div>
        
    )
}