import React from 'react'

function Button({text, onClick, type, disabled}) {

  return (
        <button type={type || "button"} className='boton' onClick={onClick} disabled={disabled || false}>{text} </button>
  )
}

export default Button