
import { useState } from 'react';
import './App.css';
import BasicInfoForm from './Components/form/BasicInfoForm';
import BasicInfo from './Components/CV/BasicInfo';
import Button from './Components/UI/Button';
import Card from './Components/UI/Card';


function App() {
  const [expandedState, setExpandedState] = useState(false)
  const [basicInfo, setBasicInfo] = useState()


  const clickHandler = () =>{
    setExpandedState(true)
    expandedState && setExpandedState(!expandedState)
  }

  const basicFormDataHandler = (data) =>{
    console.log(data)
    setExpandedState(false)
    setBasicInfo(data)
  }

  return (
<div className=' bg-[#B4B6A2] h-screen flex flex-col justify-center items-center'>
  <Button bgColor='bg-darkGreen' onClick={clickHandler}>Create Resume</Button>
  <Card className={expandedState ?'w-3/4 h-4/5 flex justify-center items-center bg-darkGreen':'w-3/4 h-1 bg-darkGreen'}>
    { expandedState && <BasicInfoForm basicFormData={basicFormDataHandler} />}
  </Card>
  {basicInfo && <BasicInfo {...basicInfo}></BasicInfo>}
</div>
  );
}

export default App;
