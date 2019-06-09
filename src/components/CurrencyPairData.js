import React, { useState, useEffect } from 'react';
import './style.css';
import LineChartContainer from './LineChartContainer';

function CurrencyPairData(props) {

    const [allCurrencyPairs, setAllCurrencyPairs] = useState([]);
    const [currencyPair, setCurrencyPair] = useState(props.currencyPair);
    const [currentData, setCurrentData] = useState(0);
    const [showDropdown, setShowDropDown] = useState(false);

    const [chartValues, setChartValues] = useState([0,0,0,0,0,0,0,0,0,0,0]);

    //get all the currency pairs from rest api
    useEffect(() => {
      (async () => {
        const currencyPairsResponse = await fetch('https://restsimulator.intuhire.com/currency_pairs');
        const currencyPairs = await currencyPairsResponse.json();
        setAllCurrencyPairs(currencyPairs);
      })();
    }, [])
  
    //establish socket connection and receive the data
    useEffect(() => {
      const socket = new WebSocket('wss://stocksimulator.intuhire.com');
      setChartValues([0,0,0,0,0,0,0,0,0,0,0])
      setCurrentData(0);
      socket.onopen = () => {
        socket.send(JSON.stringify({currencyPair}))
      }
  
      socket.onmessage = (e) => {
        const data = parseFloat(parseFloat(e.data).toFixed(4));
        setCurrentData(data);
      }
  
      //closing current socket when new currency pair is selected
      return () => {
        socket.close();
      }
    }, [currencyPair])
  
    useEffect(() => {
      props.handleChange(currentData)
      let chartValuesTemp = chartValues;
      chartValuesTemp.pop();
      chartValuesTemp.unshift(currentData);
      setChartValues(chartValuesTemp);
    }, [currentData])

    return (
      <div key={currencyPair} className="currency-pair-container">
        <div className='currency-container'>
          <span className='currency-pair' onClick={() => setShowDropDown(!showDropdown)}>{currencyPair.substring(0,3)+'/'+currencyPair.substring(3)}<span className={showDropdown?'arrow-up':'arrow-down'}/></span>
          <ul className={`currency-list ${showDropdown?'':'hide'}`}>
            {allCurrencyPairs.map(({currency_name}) => {
              return <li
                key={currency_name} 
                className='currency-name'
                onClick={() => {
                  setShowDropDown(false)
                  setCurrencyPair(currency_name)}
                }
              >
                {currency_name.substring(0,3)+'/'+currency_name.substring(3)}
              </li>
            })}
          </ul>
        </div>
        <div key={currentData} className='current-data'>{currentData}</div>
        <LineChartContainer data={chartValues}/> 
      </div>
    );
  }
  
  export default CurrencyPairData;
  