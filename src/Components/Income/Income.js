import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import { useGlobalContext } from '../../Context/globalContext'
import Form from '../Form/Form'
import Incomeitems from '../Items/Incomeitems'

function Income() {
   const {addIncome, incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

   useEffect(()=>{
      getIncomes()
   },[])
  return (
    <IncomeStyled>
        <InnerLayout>
            <h1>Incomes</h1>
            <h2 className='total-income'>Total Income:<span>${totalIncome()}</span></h2>
            <div className='income-content'>
               <div className='form-container'>
                  <Form />
               </div>
               <div className='incomes'>
                  {incomes.map((expense)=>{
                     const {_id, title, amount, date, category, description , type} = expense;
                    return <Incomeitems
                       key={_id}
                       id={_id}
                       title={title}
                       description={description}
                       amount={amount}
                       category={category}
                       date={date}
                       type={type}
                       indicatorColor="var(--color-green)"
                       deleteItem={deleteIncome}
                    />
                  })}
               </div>
            </div>
        </InnerLayout>
    </IncomeStyled>
  )
}
const IncomeStyled= styled.div `
   display: flex;
   overflow: auto;
   .total-income{
      display: flex;
      justify-content:center;
      align-items:center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem;
      font-size: 2rem;
      gap: .5rem;
      span{
         font-size: 2rem;
         font-weight: 700;
         color: var(--color-green);
      }
   }
   .income-content{
      display: flex;
      gap: 2rem;
      .incomes{
         flex: 1;
      }
   }
`

export default Income