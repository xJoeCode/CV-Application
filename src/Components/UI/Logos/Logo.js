import logoSvg from '../../Assets/logoSvg.svg'



export default function Logo(props){

    return(<img src={logoSvg} alt='logo' className={`w-1/12 h-auto ${props.styles}`} ></img>)

}