import React from 'react';
import styled from 'styled-components';
import userIcon from '../../img/user-solid.svg';  
import { menuItems } from '../../utils/menuItems';
import { useGlobalContext } from '../../Context/globalContext';
import { login, signout } from '../../utils/Icons';

function Navigation({ active, setActive, setShowLogin }) {
    const { token, setToken } = useGlobalContext();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    return (
        <NavStyled>
            {!token ? (
                <img
                    className='login'
                    src={login}
                    alt='Login'
                    onClick={() => setShowLogin(true)} 
                />
            ) : (
                <div className='user-con'>
                    <img src={userIcon} alt='User' />
                    <ul className="nav-profile-dropdown">
                        <li onClick={logout}>
                            <p>Logout</p>
                        </li>
                    </ul>
                </div>
            )}

            <ul className='menu-items'>
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        <i>{item.icon}</i>
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>

            {token && (
                <div className='bottom-nav' onClick={logout}>
                    {signout} Sign Out
                </div>
            )}
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 1rem 1.5rem;
    width: 300px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    .login {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;    
        background: #fcf6f9;
        border: 2px solid #FFFFFF;
        padding: .1rem;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);  
        cursor: pointer;
    }

    .user-con {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            object-fit: cover;    
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .1rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);   
        }

        .nav-profile-dropdown {
            margin-top: 10px;
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;

            li {
                padding: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                &:hover {
                    background-color: #f0f0f0;
                }
            }
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;

        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;

            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s;
            }
        }

        .active {
            color: rgba(34, 34, 96, 1);

            i {
                color: rgba(34, 34, 96, 1);
            }

            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                background: #222260;
                border-radius: 0 10px 10px 0;        
            }
        }
    }

    .bottom-nav {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: all .4s;

        i {
            font-size: 1.4rem;
            color: rgba(34, 34, 96, 0.6);
        }

        span {
            font-weight: 500;
            color: rgba(34, 34, 96, .6);
        }

        &:hover {
            color: rgba(34, 34, 96, 1);
            
            i {
                color: rgba(34, 34, 96, 1);
            }
        }
    }
`;

export default Navigation;
