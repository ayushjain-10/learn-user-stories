import { BankType, AccountType } from './types';


export class Bank implements BankType {

    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    public constructor(accounts: AccountType[], usernames: string[]) {
        this.accounts = accounts;
        this.usernames = usernames;
    }


    private isUsernameExists(username: string): boolean {
        return this.usernames.includes(username);
    }


    private findAccount(accountNumber: number): AccountType | undefined {
        return this.accounts.find(account => account.id === accountNumber);
    }


    private isAccountNumberValid(accountNumber: number): boolean {
        return accountNumber.toString().length === 10;
    }


    createAccount(username: string, age: number, accountNumber: number): AccountType {
        if(!this.isUsernameExists(username)) {
            throw new Error('User not found');
        }
        if(!this.isAccountNumberValid(accountNumber)) {
            throw new Error('Invalid account number');
        }
        if(this.findAccount(accountNumber)) {
            throw new Error('Account already exists');
        }
        if(age < 18) {
            throw new Error('Age must be 18 or above');
        }
        
        const newAccount: AccountType = {
            id: accountNumber,
            balance: 0
        }
        this.accounts.push(newAccount);
        return newAccount;
    }


    deposit(accountNumber: number, amount: number): number {
        const account = this.findAccount(accountNumber);
        if (!account) {
            throw new Error('Account not found');
        }
        if (amount <= 0) {
            throw new Error('Deposit amount must be greater than 0');
        }
        account.balance += amount;
        return account.balance;
    }


    withdraw(accountNumber: number, amount: number): number {
        const account = this.findAccount(accountNumber);
        if (!account) {
            throw new Error('Account not found');
        }
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be greater than 0');
        }
        if (account.balance < amount) {
            throw new Error('Insufficient funds');
        }
        account.balance -= amount;
        return account.balance; // Return the updated balance
    }


    getBalance(accountNumber: number): number {
        const account = this.findAccount(accountNumber);
        if (!account) {
            throw new Error('Account not found');
        }
        return account.balance;
    }
}
