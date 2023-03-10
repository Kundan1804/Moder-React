import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = () => {
    const [term, setTerm] = useState('programming')
    const [result, setResult] = useState([])

    useEffect(()=>{
        const search = async () =>{
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action:'query',
                    list:'search',
                    origin:'*',
                    format:'json',
                    srsearch:term,
                }
            })
            setResult(data.query.search)
        };

        // if (term){
            search()
        // }
    },[term])

    const renderedResults = result.map((result)=>{
        return (
            <div key={result.pageid} className='item'>
                <div className='content'>
                    <div className='header'>
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                </div>
            </div>
        )
    })

  return (
    <div>
        <div className='ui form'>
            <div className='field'>
                <label>Enter Search</label>
                <input 
                    value={term}
                    onChange={(e)=>setTerm(e.target.value)
                    }
                    className='input' 
                />
            </div>
        </div>
        <div className='ui celled list'>
            {renderedResults}
        </div>
    </div>
  )
}

export default Search