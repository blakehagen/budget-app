// BUDGET SERVICE //

import axios from 'axios';

const BASE_URL = '/api/v1/';

export default {
  createNewBudget(budgetInfo) {
    return axios.post(`${BASE_URL}budgets/create`, budgetInfo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  closeBudget(budgetId, budgetData) {
    return axios.put(`${BASE_URL}budgets/close/${budgetId}`, budgetData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getCategoryList(budgetId) {
    return axios.get(`${BASE_URL}budgets/categories/list/${budgetId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getBudgetCategories(budgetId) {
    return axios.get(`${BASE_URL}budgets/categories/${budgetId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getCategoryTransactions(categoryId) {
    return axios.get(`${BASE_URL}transactions/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  saveTransaction(transaction) {
    return axios.post(`${BASE_URL}transactions/create`, transaction, {
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
