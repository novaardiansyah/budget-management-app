import React, { useContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

const BudgetsContext = React.createContext()

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }

  function addBudget({name, max}) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }

      return [...prevBudgets, { id: uuidV4(), name, max }]
    })
  }
  
  function addExpense({ description, amount, budgetId }) {
    setExpenses(prevExpenses => {
      return [ ...prevExpenses, { id: uuidV4(), description, amount, budgetId } ]
    })
  }
  
  function deleteBudget({ id }) {
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }
  
  function deleteExpense({ id }) {
    setBudgets(prevExpenses => {
      return prevExpenses.filter(expenses => expenses.id !== id)
    })
  }

  return <BudgetsContext.Provider value={{
    budgets,
    expenses,
    getBudgetExpenses,
    addBudget,
    addExpense,
    deleteBudget,
    deleteExpense
  }}>{ children }</BudgetsContext.Provider>
}