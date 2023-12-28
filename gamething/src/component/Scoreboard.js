import React from 'react'

function Scoreboard({score}) {
  return (
    <div className='Score-board'>
        <h1>{score}</h1>
    </div>
  )
}

export default Scoreboard