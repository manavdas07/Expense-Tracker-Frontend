import React, { useContext, useState ,useEffect} from "react";
import axios from 'axios';


const Url = "http://localhost:4001/api/v1/";


const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) =>{

    const [incomes,setIncomes]= useState([]);
    const [expenses,setExpenses]= useState([]);
    const [error,setError]= useState(null);
    const [token,setToken] = useState(localStorage.getItem('token') || "")
    useEffect(() => {
        if (token) {
            getIncomes();
            getExpenses();
        }
    }, [token]);

    const axiosInstance = axios.create({
        baseURL: Url,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const loginUser = async (userData) => {
        console.log("Login User Data:", userData);
        try {
            const response = await axiosInstance.post(`${Url}loginUser`, userData);
            console.log("Login Response:", response.data);
            if (response.data.token) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
            } else {
                setError("Login failed: No token received.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || 'Login failed: An error occurred.');
        }
    };    


    const registerUser = async (userData) => {
        try {
            const response = await axiosInstance.post(`${Url}registerUser`, userData);
            if (response.data.token) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
            } else {
                setError("Registration failed: No token received.");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed: An error occurred.');
        }
    }


    const logoutUser = () => {
        setToken("");
        localStorage.removeItem('token');
    };

    const addIncome = async (income) =>{
               await axiosInstance.post(`${Url}add-income`, income)
              .catch((err) =>{
                setError(err.response.data.message)
            })
            getIncomes();
    }

    const getIncomes = async () => {
        const response = await axiosInstance.get(`${Url}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async(id) =>{
        await axiosInstance.delete(`${Url}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = ()=>{
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome += income.amount;
        })
        return totalIncome;
    }   

    const addExpense = async (income) => {
        const response = await axiosInstance.post(`${Url}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axiosInstance.get(`${Url}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axiosInstance.delete(`${Url}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalExpenses = 0;
        expenses.forEach((expense) =>{
            totalExpenses = totalExpenses + expense.amount
        })

        return totalExpenses;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = ()=>{
        const history = [...incomes,...expenses]
        history.sort((a,b) =>{
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 4)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome, 
            getIncomes, 
            incomes, 
            deleteIncome, 
            error, 
            setError ,
            totalIncome, 
            addExpense, 
            getExpenses,
            deleteExpense,
            totalExpenses,
            expenses,
            totalBalance,
            transactionHistory,
            token,
            setToken,
            loginUser,
            logoutUser,
            registerUser
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}