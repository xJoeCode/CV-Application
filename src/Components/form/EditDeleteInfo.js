import ButtonSmall from "../UI/ButtonSmall"
import Input from "../Inputs/Input"
import {useForm} from 'react-hook-form'


export default function EditDeleteInfo(props){

    const {register, formState: { errors }, handleSubmit} = useForm()

    return(
    <>
        <ButtonSmall>Delete</ButtonSmall>
        <ButtonSmall>Edit</ButtonSmall>
        <Input register={{...register(props.name)}}></Input>
        
    </>
    
    )
}