export type AccountType = {
    id: number,
    balance: number
}

export interface BankType {
    createAccount(username: string, age: number, accountNumber: number): AccountType;
    deposit(accountNumber: number, amount: number): number;      // returns new balance
    withdraw(accountNumber: number, amount: number): number;     // returns new balance
    getBalance(accountNumber: number): number;                   // returns the balance
}
