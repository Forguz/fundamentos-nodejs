import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class CreateBalanceService {
  static execute(transactions: Transaction[]): Balance {
    const { income, outcome } = transactions.reduce(
      (acumulator: Omit<Balance, 'total'>, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            // eslint-disable-next-line no-param-reassign
            acumulator.income += transaction.value;
            break;
          case 'outcome':
            // eslint-disable-next-line no-param-reassign
            acumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default CreateBalanceService;
