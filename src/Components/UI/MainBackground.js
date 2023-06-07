import letters from '../Assets/letters.svg'

export default function MainBackground(){


    return(
        <div>
            <div></div>
           <img src={letters} alt='logo' className='w-screen h-auto object-fill bg-[#ebebeb] absolute top-0 left-0 -z-50'></img> 
        </div>
        
    )
}