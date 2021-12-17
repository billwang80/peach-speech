import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"

import logo from "../images/peach_logo.png"

import "../style.css"

function Feedback() {
  const [result, setResult] = useState(null)
  const data = useLocation().state
  
  useEffect(() => {
    getTone()

    async function getTone() {
      const response = await fetch('http://localhost:8000/tone', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      setResult(JSON.parse(res)) 
    }
  },[]) // do not call again on re-render

  return (
    <div className='main'>
      <div className="container">
        <Link to="/">
          <img src={logo} width="15%" alt="logo" />
        </Link>
        {result != null ? (
          <div>
            <h1>You showed these traits:</h1>
            {result.document_tone.tones.map((tone) => (
            <div key={tone.tone_id}>
              <div className='result-container'>
                <div className='result-text'>{tone.tone_name}:</div>
                <div className='result-text'>{Math.round(tone.score*100)}%</div>
              </div>
            </div>
          ))}
          </div>
        ): <p>Loading...</p>}
      </div>
    </div>
  )
}
export default Feedback
