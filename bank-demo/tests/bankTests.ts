import { Bank } from '../src/bank';
import { AccountType } from '../src/types';

// Setup existing data
const accounts: AccountType[] = [
  { id: 1234567890, balance: 3448 },
  { id: 1234567891, balance: 2424 }
];
const usernames = ['user1', 'user2'];

// Create a new Bank instance
const bank = new Bank(accounts, usernames);

/**
 * ---------------------------
 * Testing "Create Account"
 * ---------------------------
 */
try {
    // Scenario 1: Valid account creation
    const acc = bank.createAccount('user1', 23, 1234567892);
    if (acc.id !== 1234567892 || acc.balance !== 0 || acc.id.toString().length !== 10) {
        console.log('Create Account - Scenario 1 failed');
    } else {
        console.log('Create Account - Scenario 1 passed');
    }

    // Attempt to create the same account again
    bank.createAccount('user1', 23, 1234567892);
    console.log('Create Account - Scenario 1 (duplicate) failed');
} catch (e: any) {
    console.log('Create Account - Scenario 1 (duplicate) passed');
}

// Scenario 2: Invalid age
try {
    bank.createAccount('user1', 17, 1234567893);
    console.log('Create Account - Scenario 2 failed');
} catch (e: any) {
    console.log('Create Account - Scenario 2 passed');
}

// Scenario 3: Invalid username
try {
    bank.createAccount('unknown_user', 23, 1234567894);
    console.log('Create Account - Scenario 3 failed');
} catch (e: any) {
    console.log('Create Account - Scenario 3 passed');
}

/**
 * ---------------------------
 * Testing "Deposit Money"
 * ---------------------------
 */
// Scenario 1: Successful deposit
try {
    const newBalance = bank.deposit(1234567890, 500);
    if (newBalance === 3948) { // 3448 + 500
        console.log('Deposit - Scenario 1 passed');
    } else {
        console.log('Deposit - Scenario 1 failed');
    }
} catch (e: any) {
    console.log('Deposit - Scenario 1 failed', e.message);
}

// Scenario 2: Invalid account
try {
    bank.deposit(9999999999, 100);
    console.log('Deposit - Scenario 2 failed');
} catch (e: any) {
    console.log('Deposit - Scenario 2 passed');
}

// Scenario 3: Invalid deposit amount (<= 0)
try {
    bank.deposit(1234567890, 0);
    console.log('Deposit - Scenario 3 failed');
} catch (e: any) {
    console.log('Deposit - Scenario 3 passed');
}

/**
 * ---------------------------
 * Testing "Withdraw Money"
 * ---------------------------
 */
// Scenario 1: Successful withdrawal
try {
    const newBalance = bank.withdraw(1234567890, 100);
    if (newBalance === 3848) { // from the last deposit scenario, 3948 - 100
        console.log('Withdraw - Scenario 1 passed');
    } else {
        console.log('Withdraw - Scenario 1 failed');
    }
} catch (e: any) {
    console.log('Withdraw - Scenario 1 failed', e.message);
}

// Scenario 2: Insufficient funds
try {
    bank.withdraw(1234567891, 999999);
    console.log('Withdraw - Scenario 2 failed');
} catch (e: any) {
    console.log('Withdraw - Scenario 2 passed');
}

// Scenario 3: Invalid account
try {
    bank.withdraw(9999999999, 100);
    console.log('Withdraw - Scenario 3 failed');
} catch (e: any) {
    console.log('Withdraw - Scenario 3 passed');
}

// Scenario 4: Invalid withdrawal amount
try {
    bank.withdraw(1234567890, -50);
    console.log('Withdraw - Scenario 4 failed');
} catch (e: any) {
    console.log('Withdraw - Scenario 4 passed');
}

/**
 * ---------------------------
 * Testing "Check Balance"
 * ---------------------------
 */
// Scenario 1: Successful balance check
try {
    const balance = bank.getBalance(1234567890);
    console.log(`Check Balance - Scenario 1 passed. Balance is ${balance}`);
} catch (e: any) {
    console.log('Check Balance - Scenario 1 failed', e.message);
}

// Scenario 2: Invalid account
try {
    bank.getBalance(9999999999);
    console.log('Check Balance - Scenario 2 failed');
} catch (e: any) {
    console.log('Check Balance - Scenario 2 passed');
}
