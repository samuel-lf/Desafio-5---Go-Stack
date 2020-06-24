import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = {
      "income": 0,
      "outcome": 0,
      "total": 0
    }

    this.transactions.map(transaction => {
      if(transaction.type === 'income'){
        balance.income = transaction.value + balance.income;
        balance.total = transaction.value + balance.total;
      } else {
        balance.outcome = transaction.value + balance.outcome;
        balance.total = balance.total - transaction.value;
      }
    })

    return balance;

  }

  public create(title: string, value: number, type: 'income' | 'outcome' ): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
