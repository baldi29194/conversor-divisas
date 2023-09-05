import React, { useEffect, useState } from 'react'

const Calcular = () => {

  const [cantidadIngresada, setCantidadIngresada] = useState(1);
  const [divisas, setDivisas] = useState();
  const [siglasDivisa, setSiglasDivisa] = useState([]);
  const [valorInput, setValorInput] = useState('AUD');
  const [valorInputConvertir, setValorInputConvertir] = useState('AUD');
  const [valorFinal, setValorFinal] = useState();
  const [renderValor, setRenderValor] = useState();

  useEffect(() => {
    const getDivisas = async () => {
      const resultado = await fetch(`https://api.frankfurter.app/currencies`);
      const resultadoJSON = await resultado.json();
      setDivisas(resultadoJSON);
      setSiglasDivisa(Object.keys(resultadoJSON))
    }
    getDivisas();
  }, []);
  const urlConvertir = `${`https://api.frankfurter.app/latest?amount=${cantidadIngresada}&from=${valorInput}&to=${valorInputConvertir}`}`;

  
  useEffect(() => {
    const calcularDivisa = async (url) => {
      const resultado = await fetch(url);
      const resultadoJSON = await resultado.json();
      resultadoJSON.rates ? setValorFinal(resultadoJSON.rates[valorInputConvertir]) : setValorFinal(0) 
      
    }
    calcularDivisa(urlConvertir)
  }, [urlConvertir, valorInputConvertir])

  const convertir = (e) => {
    e.preventDefault();
    setRenderValor(valorFinal)
  }

  return (
    <form onSubmit={convertir}>
      <div className="ingresar">
        <input type="number" defaultValue={1} onChange={(e) => {parseInt(setCantidadIngresada(e.target.value === 0 || e.target.value === '' ? 1 : e.target.value))}}/>
        <select name="select-a-convertir">
          {
            siglasDivisa.map((sigla, index) => {
              return <option key={index} value={sigla} onClick={(e) => {setValorInput(e.target.value)}} >{`"${sigla}" - ${divisas[sigla]}`}</option>
            })
          }
        </select>
      </div>
      <div className="convertido">
        <input type="text" defaultValue={renderValor} disabled />
        <select name="select-convertir">
          {
            siglasDivisa.map((sigla, index) => {
              return <option key={index} value={sigla} onClick={(e) => {setValorInputConvertir(e.target.value)}} >{`"${sigla}" - ${divisas[sigla]}`}</option>
            })
          }
        </select>
      </div>
      <button>Convertir</button>
    </form>
  )
}

export default Calcular