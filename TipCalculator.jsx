import React, { useState, useEffect } from 'react';
import './App.css'

function  TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [people, setPeople] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);
  const [conversionRate, setConversionRate] = useState(5); 

  const apiKey = '8e54d70809bd084570fd9415b429de97badd6549f1d87da3e53df11b2552f757'; 
  const fetchConversionRate = async () => {
    try {
      const response = await fetch("https://swop.cx/rest/rates", {
        method: 'GET',
        headers: {
           Authorization: `ApiKey ${apiKey}`,
        },
      });
      const data = await response.json();

      const brlRate = data.BRL;
      setConversionRate(brlRate);
    } catch (brlRate) {
      
    }
  };

  useEffect(() => {
    fetchConversionRate();
  }, []); 

  const calculateTip = () => {
    const calculatedTip = (bill * tipPercentage) / 100;
    setTipAmount(calculatedTip);
    const total = parseFloat(bill) + calculatedTip;
    setTotalAmount(total);
    setAmountPerPerson(total / people);
  };
   
  return (
  <div className='Card'>

    <div className='Tip'>
      <h2>Calculadora de Gorjeta</h2>
      <label className='text'>
        Valor da Conta:  
        <input type="text" className='input' value={bill} onChange={(e) => setBill(e.target.value)} />
      </label  >
      <input type="number" max='20' min='10' className='number'   onChange={(e) => setTipPercentage(e.target.value)} /> %
      <label className='divide'>
        Dividir entre:  
        <input type="number" value={people} className='input'   onChange={(e) => setPeople(e.target.value)} />
       
      </label>
      <div>
      <button onClick={calculateTip} className='btn'>Calcular</button>
      </div>
      <p className='TipValue'>Gorjeta: <p className='Cash'>{tipAmount}</p> </p>
      <p className='TipValue'>Valor Total (USD):<p className='Cash'>${totalAmount.toFixed(2)}</p></p>
      <p className='TipValue'>Valor por Pessoa (USD): <p className='Cash'>${amountPerPerson.toFixed(2)}</p></p>
      <p className='TipValue'>Valor Total (BRL): <p className='Cash'>${(amountPerPerson * conversionRate).toFixed(2)}</p></p>
      <p className='TipValue'>Valor por Pessoa (BRL): <p className='Cash'>${(amountPerPerson * conversionRate).toFixed(2)}</p></p>
    </div>
    </div>
  );
}

export default TipCalculator;