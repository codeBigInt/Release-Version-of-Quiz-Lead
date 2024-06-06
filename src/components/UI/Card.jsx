import React from 'react'

const Card = (props) => {
    const classes = props.className
  return (
    <div className = {` p-2 shadow-md ${classes} `}>
      {props.children}
    </div>
  )
}

export default Card
