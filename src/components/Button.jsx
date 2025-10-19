import React from 'react'

function Button({text, onClick, type}) {

  return (
        <button type={type || "button"} className='btn' onClick={onClick} >{text} </button>
  )
}

export default Button