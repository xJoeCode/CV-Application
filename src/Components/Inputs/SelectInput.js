


export default function SelectInput(props){
    
    const options = props.inputData.options.degreeOptions.map(option =>
        <option key={option} className="w-auto h-12 bg-white text-darkGreen text-lg" value={option}>{option}</option>
    )
    


    return(
        <li className="list-none flex flex-col justify-center items-start m-2">
            <label className="font-serif text-lg  text-ultraDarkBlue" htmlFor={props.inputData.id}>{props.children}</label>
            <select className="bg-white h-12 text-lg text-darkBlue p-3 font-serif focus: outline-none placeholder:text-[#5C6052] " {...props.register} {...props.inputData}>  
            {options}
            </select>
        
        </li>   
        
    )
}