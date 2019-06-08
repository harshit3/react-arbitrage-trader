import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyPairData from './components/CurrencyPairData';


function App() {

  const [pip, setPip] = useState(7);
  const [buttonValue, setButtonValue] = useState('');
  const [buttonColor, setButtonColor] = useState('gray');
  const value1 = usePriceValues(0);
  const value2 = usePriceValues(0);
  const value3 = usePriceValues(0);
  
  useEffect(() => {
    let A = value1.value;
    let B = value2.value;
    let C = value3.value;
    const resultValue = (A/B) - C;
    const N = parseInt(pip)/10000;
    if((resultValue + N)<0) {
      setButtonValue('BUY');
      setButtonColor('green')
    } else if((resultValue - N)>0){
      setButtonValue('SELL')
      setButtonColor('red')
    } else {
      setButtonValue('')
      setButtonColor('gray')
    }
  }, [value1.value, value2.value, value3.value, pip])

  return(
    <div className='app-container'>
      <div className='pip-container'>PIP DIFFERENCE <span className='controls' onClick={() => setPip((pip-1>=0)?pip-1:0)}>-</span> <input className='pip-input' type='number' onChange={(e) => setPip(e.target.value)} value={pip}/> <span className='controls' onClick={() => setPip(pip+1)}>+</span> </div>
      <CurrencyPairData currencyPair='EURUSD' {...value1} />
      <CurrencyPairData currencyPair='GBPUSD' {...value2} />
      <CurrencyPairData currencyPair='AUDUSD' {...value3} />
      <div><button className={`button ${buttonColor}`}>{buttonValue}</button></div>
    </div>
  )
}

function usePriceValues(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (val) => {
    setValue(val)
  }

  return {value, handleChange}
}

export default App;
