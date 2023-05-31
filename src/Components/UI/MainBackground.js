import letters from '../Assets/letters.svg'

export default function MainBackground(){


    return(
        <div>
            <div></div>
           <img src={letters} alt='logo' className='w-full h-auto bg-[#ebebeb]'></img> 
        </div>
        
    )
}