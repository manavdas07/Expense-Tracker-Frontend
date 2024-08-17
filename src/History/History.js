import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../Context/globalContext'

function History() {
    const {transactionHistory} = useGlobalContext();

    const history = transactionHistory();
  return (
    <HistoryStyled>
        <h2>Recent History</h2>
        {history.map((item)=>{
            const {_id, title, amount =0, type} = item;
            const formattedAmmount= isNaN(amount) || amount <=0 ? 0 : amount;
             return(
                <div key={_id} className='history-item'>
                    <p style={{ color: type === 'expense' ? 'red' : 'var(--color-green)'}}>{title}</p>
                    <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${formattedAmmount}` : `+${formattedAmmount}`
                            }
                        </p>
                </div>
            )
        })}
    </HistoryStyled>
  )
}
const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 0.9rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`
export default History