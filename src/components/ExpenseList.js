"use client"
import { useState, useEffect } from 'react';
import NewExpenseModal from './NewExpenseModal';

const ExpenseList = ({ eventID, guests }) => {
  const [isNewExpenseModalOpen, setIsNewExpenseModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, [eventID]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/expenses?eventId=${eventID}`);
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = () => {
    fetchExpenses();
  };

  if (loading) return <div>Loading expenses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 border-primary border-4 rounded-lg shadow-lg">
      <h2 className="text-lg text-secondary-two font-bold mb-4">Expenses</h2>
      <div className="space-y-3">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div key={expense.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{expense.description}</h3>
                  <p className="text-sm text-gray-600">
                    Paid by: {expense.paid_by_guest.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${expense.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">
                    ${expense.split_amount.toFixed(2)} per person
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-semibold mb-1">Split Status:</h4>
                <div className="space-y-1">
                  {expense.expense_shares.map((share, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{share.guest.name}</span>
                      <span className={share.is_paid ? "text-green-600" : "text-red-600"}>
                        {share.is_paid ? "Paid" : "Unpaid"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No expenses yet.</p>
        )}
      </div>
      <button
        className="w-full text-xl mt-4 p-2 bg-primary text-white rounded-lg hover:bg-primary-two transition-colors"
        onClick={() => setIsNewExpenseModalOpen(true)}
      >
        Add Expense
      </button>
      {isNewExpenseModalOpen && (
        <NewExpenseModal
          isOpen={isNewExpenseModalOpen}
          setIsOpen={setIsNewExpenseModalOpen}
          eventID={eventID}
          guests={guests}
          onExpenseAdded={handleExpenseAdded}
        />
      )}
    </div>
  );
};

export default ExpenseList;