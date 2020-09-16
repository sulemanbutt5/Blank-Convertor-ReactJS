import React, { useState,useEffect } from "react"
import ReactDom from "react-dom";
import axios from "axios";
import './index.css'
import cur from './data'

const CurrencyConverter = () => {
  var [first, setFirst] = useState()
  var [second, setSecond] = useState()
  const [rate, setRate] = useState([])
  const [amount,setAmount] =useState()


  useEffect(()=>{
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=5a49beefa5e7696bc287`,
    })
      .then((response) => {
        console.log(response.data);
        setRate(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    },[first,second])

  return (
    <>
        <header>Blank Convertor</header>
        <br />
        <div className="all">
            <div className="cal">
                {amount || '0'} {first} = { (amount * rate[`${first}_${second}`]) || '0'} {second}
            </div>
        <br/>
            <div className="iss">
                
                <p className='pa'>Input Amount:</p>
                <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />
                <br/>

                <p className='pa'>From:</p>
                <select onChange={e => setFirst(e.target.value)}>
                    <option>Select any Currency</option>
                    {
                        cur.map( ([s,n]) =>
                        (
                            <option key={s} value={s} >{`${n}  (${s})`}</option>
                        ))
                    }
                </select>
                <br/>

                <p className='pa'>To:</p>
                <select onChange={e=> setSecond(e.target.value)}>
                    <option>Select any Currency</option>
                    {
                        (cur).map(([s,n]) =>
                        (
                            <option key={s} value={s} >{`${n}  (${s})`}</option>
                        ))
                    }
                </select>

            </div>
      </div>
    </>
  );
};

ReactDom.render(<CurrencyConverter/>,document.getElementById('root'))