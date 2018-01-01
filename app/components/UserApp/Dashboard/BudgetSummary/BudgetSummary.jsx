import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import swal from 'sweetalert';
import Spinner from 'components/Common/Spinner';
import BudgetCard from './BudgetCard';
import styles from './budgetSummary.scss';

@inject('dataStore', 'navigator')
@observer
export default class BudgetSummary extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  componentWillMount() {
    this.dataStore.clearSelectedBudget();
  }

  goToBudgetCategoryView(selectedBudgetId) {
    this.dataStore.setSelectedBudget(selectedBudgetId);
    this.navigator.changeRoute(`/${this.dataStore.userId}/budget/${selectedBudgetId}`, 'push');
  }

  openBudgetCloseModal(selectedBudgetId, selectedBudgetName, dateInfo) {
    let modalContent;
    if (dateInfo) {
      modalContent =
        `<div class="modalContentWrapper swal-text">
          <p>You are closing out &nbsp;<span class="highlight">${selectedBudgetName}</span>&nbsp; for ${dateInfo}.</p>
           <br>
          <p>Only close this budget when you have entered in all transactions for this month.</p>
          <br>
          <p>Your transaction data for this budget will be saved and a new budget for the next month (with current categories and limits) will be created.</p>
        </div>`;
    } else {
      modalContent =
        `<div class="modalContentWrapper swal-text">
             <p>You are closing out &nbsp;<span class="highlight">${selectedBudgetName}</span>&nbsp;</p>
            <br>
            <p>Only close this budget when you have entered in all transactions.</p>
            <br>
            <p>Your transaction data for this budget will be saved.</p>
        </div>`;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalContent;

    swal({
      title: 'Close Budget',
      content: wrapper,
      icon: 'info',
      buttons: ['Cancel', 'Close Budget'],
    })
      .then((value) => {
        if (value) {
          const budgetTemplate = _.find(_.get(this.dataStore, 'budgetSummaries'), { id: selectedBudgetId });
          const oldBudgetData = {
            status: 'closed',
            recurring: budgetTemplate.recurring,
          };

          const newBudgetData = {
            name: budgetTemplate.name,
            status: 'active',
            recurring: budgetTemplate.recurring,
            monthYear: budgetTemplate.recurring ? this.setMonthYear(budgetTemplate.monthYear) : null,
            createdDateHumanized: moment().format('L'),
          };

          return this.dataStore.closeBudget(selectedBudgetId, oldBudgetData, newBudgetData);
        }
        return false;
      });
  }

  setMonthYear(monthYear) {
    const month = _.head(_.split(monthYear, ' '));
    const year = _.last(_.split(monthYear, ' '));

    let newMonth;
    let newYear = year;

    switch (month) {
      case 'January':
        newMonth = 'February';
        break;
      case 'February':
        newMonth = 'March';
        break;
      case 'March':
        newMonth = 'April';
        break;
      case 'April':
        newMonth = 'May';
        break;
      case 'May':
        newMonth = 'June';
        break;
      case 'June':
        newMonth = 'July';
        break;
      case 'July':
        newMonth = 'August';
        break;
      case 'August':
        newMonth = 'September';
        break;
      case 'September':
        newMonth = 'October';
        break;
      case 'October':
        newMonth = 'November';
        break;
      case 'November':
        newMonth = 'December';
        break;
      case 'December':
        newMonth = 'January';
        newYear = _.toNumber(year) + 1;
        break;
      default:
        break;
    }

    return `${newMonth} ${newYear}`;
  }

  render() {
    if (this.dataStore.budgetSummaryUpdating) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      );
    }

    const budgets = _.map(this.dataStore.budgetSummaries, ({
      id,
      name,
      recurring,
      monthYear,
      budgetLimit,
      budgetSpent,
      difference,
    }) => (
      <BudgetCard
        key={id}
        id={id}
        name={name}
        recurring={recurring}
        dateInfo={recurring ? monthYear : null}
        limit={budgetLimit}
        spent={budgetSpent}
        remaining={difference}
        details={this.goToBudgetCategoryView}
        close={this.openBudgetCloseModal}
      />
    ));

    return (
      <div className={styles.budgetSummaryMain}>
        <div className={styles.budgets}>
          {budgets}
        </div>
      </div>
    );
  }
}
