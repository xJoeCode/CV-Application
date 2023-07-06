import logoSvg from '../../Assets/logoSvg.svg'



export default function Logo(props){

    return(<img src={logoSvg} alt='logo' className={` h-auto ${props.styles}`} ></img>)

}