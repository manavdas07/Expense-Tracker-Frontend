import React from 'react'
import styled from 'styled-components'

function Orb() {

    const OrbStyled = styled.div `
      width :80vh;
      height:80vh;
      position:absolute;
      border-radius:50%;
      margin-left:-45vh;
      margin-top:-45vh;
      background: linear-gradient(180deg, #F56692 0%, #F2994A 100%)
      filter: blur(800px)
    `
  return (
    <OrbStyled></OrbStyled>
  )
}

export default Orb