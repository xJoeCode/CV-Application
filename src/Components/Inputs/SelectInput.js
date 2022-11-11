


export default function SelectInput(props){
    
    const options = props.inputData.options.degreeOptions.map(option =>
        <option key={option} className="w-auto h-12 bg-beige text-darkGreen text-lg" value={option}>{option}</option>
    )
    


    return(
        <li className="list-none flex flex-col justify-center items-start m-2">
            <label className="font-serif text-lg  text-[beige]" htmlFor={props.inputData.id}>{props.children}</label>
            <select className="bg-beige w-30 h-12 text-lg text-darkGreen p-3 font-serif focus: outline-none placeholder:text-[#5C6052] focus:bg-[#8D9539]" {...props.register} {...props.inputData}>  
            {options}
            </select>
        
        </li>   
        
    )
}