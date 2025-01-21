import { BankType, AccountType } from './types';

/**
 * Bank class implements the BankType interface
 * and is able to create new accounts, deposit, withdraw,
 * and check balances.
 */
export class Bank implements BankType {

    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    /**
     * 
     * @param accounts - a list of accounts to be stored in the bank
     * @param usernames - a list bank verified usernames
     * @returns a new Bank object
     */
    public constructor(accounts: AccountType[], usernames: string[]) {
        this.accounts = accounts;
        this.usernames = usernames;
    }

    /**
     * Check if a username is in the bank's verified list
     */
    private isUsernameExists(username: string): boolean {
        return this.usernames.includes(username);
    }

    /**
     * Finds an account by account number
     */
    private findAccount(accountNumber: number): AccountType | undefined {
        return this.accounts.find(account => account.id === accountNumber);
    }

    /**
     * Checks if an account number is valid (10 digits)
     */
    private isAccountNumberValid(accountNumber: number): boolean {
        return accountNumber.toString().length === 10;
    }

    /**
     * Create a new bank account
     */
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

    /**
     * Deposit money into an account
     */
    deposit(accountNumber: number, amount: number): number {
        const account = this.findAccount(accountNumber);
        if (!account) {
            throw new Error('Account not found');
        }
        if (amount <= 0) {
            throw new Error('Deposit amount must be greater than 0');
        }
        account.balance += amount;
        return account.balance; // Return the updated balance
    }

    /**
     * Withdraw money from an account
     */
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

    /**
     * Check the balance of an account
     */
    getBalance(accountNumber: number): number {
        const account = this.findAccount(accountNumber);
        if (!account) {
            throw new Error('Account not found');
        }
        return account.balance;
    }
}
