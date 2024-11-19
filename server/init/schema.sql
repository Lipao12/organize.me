CREATE TABLE Products (
    productId VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1),
    stockQuantity INT NOT NULL
);

CREATE TABLE Users (
    userId VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL
);

CREATE TABLE Sales (
    saleId VARCHAR PRIMARY KEY,
    productId VARCHAR NOT NULL,
    timestamp DATE NOT NULL,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (productId) REFERENCES Products(productId)
);

CREATE TABLE Purchases (
    purchaseId VARCHAR PRIMARY KEY,
    productId VARCHAR NOT NULL,
    timestamp DATE NOT NULL,
    quantity INT NOT NULL,
    unitCost DECIMAL(10, 2) NOT NULL,
    totalCost DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (productId) REFERENCES Products(productId)
);

CREATE TABLE Expenses (
    expenseId VARCHAR PRIMARY KEY,
    category ENUM('category1', 'category2', 'category3'),
    amount DECIMAL(10, 2) NOT NULL,
    timestamp DATE NOT NULL
);

CREATE TABLE ExpenseSummary (
    expenseSummaryId VARCHAR PRIMARY KEY,
    totalExpenses DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE ExpenseByCategory (
    expenseByCategoryId VARCHAR PRIMARY KEY,
    expenseSummaryId VARCHAR NOT NULL,
    date DATE NOT NULL,
    category BIGINT NOT NULL,
    amount BIGINT NOT NULL,
    FOREIGN KEY (expenseSummaryId) REFERENCES ExpenseSummary(expenseSummaryId)
);

CREATE TABLE SalesSummary (
    salesSummaryId VARCHAR PRIMARY KEY,
    totalValue DECIMAL(10, 2) NOT NULL,
    changePercentage DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE PurchaseSummary (
    purchaseSummaryId VARCHAR PRIMARY KEY,
    totalPurchased DECIMAL(10, 2) NOT NULL,
    changePercentage DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL
);
