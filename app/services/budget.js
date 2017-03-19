// BUDGET SERVICE //

import axios from 'axios';
const BASE_URL = '/api/v1/';

export default {

  createNewBudget(budgetInfo) {
    console.log('saving new budget...');
    return axios.post(`${BASE_URL}budgets/create`, {
      CreatedByUserId: budgetInfo.CreatedByUserId,
      name: budgetInfo.name,
      totalAmount: budgetInfo.totalAmount,
      createdDateHumanized: budgetInfo.createdDateHumanized
    });
  }
};