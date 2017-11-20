// BUDGET SERVICE //

import axios from 'axios';

const BASE_URL = '/api/v1/';

export default {

  getBudgets(userId) {
    return axios.get(`${BASE_URL}budgets/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  createNewBudget(budgetInfo) {
    return axios.post(`${BASE_URL}budgets/create`, budgetInfo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  saveTransaction(transactionInfo) {
    return axios.post(`${BASE_URL}transactions/create`, {
      PostedByUserId: transactionInfo.PostedByUserId,
      BudgetId: transactionInfo.BudgetId,
      vendor: transactionInfo.vendor,
      amount: transactionInfo.amount,
      description: transactionInfo.description,
      postedDateHumanized: transactionInfo.postedDateHumanized,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  deleteTransaction(transactionId) {
    return axios.delete(`${BASE_URL}transactions/delete/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};
