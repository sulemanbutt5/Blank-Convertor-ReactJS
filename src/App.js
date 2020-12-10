import React, { useState,useEffect } from "react"
import axios from "axios";
import cur from './data'
import './style.css'

function CurrencyConverter(){
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
          <div className="divhead">
            <header>Blank Convertor</header>
          </div>
          <br />
          <div className="all">
              <div className="numbers">
                  {amount || '0'} {first} = { (amount * rate[`${first}_${second}`]) || '0'} {second}
              </div>
          <br/>
              <div>
                <form className="formm">
                    <br/>
                    <p className='inputt'>Input Amount:</p>
                    <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
                    <br/>
    
                    <p className='fromm'>From:</p>
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
    
                    <p className='too'>To:</p>
                    <select onChange={e=> setSecond(e.target.value)}>
                        <option>Select any Currency</option>
                        {
                            (cur).map(([s,n]) =>
                            (
                                <option key={s} value={s} >{`${n}  (${s})`}</option>
                            ))
                        }
                    </select>
                    <br/>
                    <br/>
                    <br/>
                  </form>
              </div>
        </div>
      </>
    );
  }

  export default CurrencyConverter