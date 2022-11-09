
import { useState } from 'react';
import './App.css';
import BasicInfoForm from './Components/form/BasicInfoForm';
import Button from './Components/UI/Button';
import Card from './Components/UI/Card';

function App() {
  const [expandedState, setExpandedState] = useState(false)

  const clickHandler = () =>{
    setExpandedState(true)
    expandedState && setExpandedState(!expandedState)

  }

  return (
<div className=' bg-[#B4B6A2] h-screen flex flex-col justify-center items-center'>
  <Button bgColor='bg-darkGreen' onClick={clickHandler}>Create Resume</Button>
  <Card className={expandedState ?'w-3/4 h-4/5 flex justify-center items-center bg-darkGreen':'w-3/4 h-1 bg-darkGreen'}>
    { expandedState && <BasicInfoForm />}
  </Card>
</div>
  );
}

export default App;
