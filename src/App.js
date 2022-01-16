import { useState } from 'react'
import { Container, Stack, Button } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import ViewExpensesModal from './components/ViewExpensesModal'
import AddExpenseModal from './components/AddExpenseModal'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext'

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetID, setViewExpensesModalBudgetID] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gridGap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {
            budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)

              return (
                <BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} onAddExpenseClick={() => openAddExpenseModal(budget.id)} onViewExpensesClick={() => setViewExpensesModalBudgetID(budget.id)} />
              )
            })
          }
          
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpensesClick={() => setViewExpensesModalBudgetID(UNCATEGORIZED_BUDGET_ID)} />
          <TotalBudgetCard />
        </div>
      </Container>

      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />

      <AddExpenseModal show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} defaultBudgetId={addExpenseModalBudgetId} />

      <ViewExpensesModal budgetId={viewExpensesModalBudgetID} handleClose={() => setViewExpensesModalBudgetID()} />
    </>
  )
}

export default App
