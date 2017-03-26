// BUDGET SERVICE //

import axios from 'axios';
const BASE_URL = '/api/v1/';

export default {

  getBudgets(userId) {
    console.log('GET user budgets...');
    return axios.get(`${BASE_URL}budgets/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
  },

  createNewBudget(budgetInfo) {
    console.log('CREATE new budget...');
    return axios.post(`${BASE_URL}budgets/create`, {
      CreatedByUserId: budgetInfo.CreatedByUserId,
      name: budgetInfo.name,
      totalAmount: budgetInfo.totalAmount,
      createdDateHumanized: budgetInfo.createdDateHumanized
    });
  },

  saveTransaction(transactionInfo) {
    console.log('CREATE new transaction...');
    return axios.post(`${BASE_URL}transactions/create`, {
      PostedByUserId: transactionInfo.PostedByUserId,
      BudgetId: transactionInfo.BudgetId,
      vendor: transactionInfo.vendor,
      amount: transactionInfo.amount,
      description: transactionInfo.description,
      postedDateHumanized: transactionInfo.postedDateHumanized
    });
  },

  deleteTransaction(transactionId) {
    console.log('DELETE transaction...');
    return axios.delete(`${BASE_URL}transactions/delete/${transactionId}`);
  }
};