export default function TextBox({inputData,register,labelName, ...props}){





    return(
        <div className="list-none flex flex-col justify-center items-start m-2">
            <label htmlFor={inputData?.id} className="font-serif text-lg  text-ultraDarkBlue " > {labelName}</label>
            <textarea className="bg-[#ffff] w-auto lg:w-[30rem] h-72 text-lg p-3 font-serif focus:outline-none text-ultraDarkBlue placeholder:text-[#919781]" {...inputData} {...register} />
        </div>
    )
}