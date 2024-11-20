CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Products (
    productId VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1),
    stockQuantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Sales (
    saleId VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    productId VARCHAR(255) NOT NULL,
    timestamp DATE NOT NULL,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (productId) REFERENCES Products(productId),
    CONSTRAINT fk_sales_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Purchases (
    purchaseId VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    productId VARCHAR(255) NOT NULL,
    timestamp DATE NOT NULL,
    quantity INT NOT NULL,
    unitCost DECIMAL(10, 2) NOT NULL,
    totalCost DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (productId) REFERENCES Products(productId),
    CONSTRAINT fk_purchases_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Expenses (
    expenseId VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    category TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    timestamp DATE NOT NULL,
    CONSTRAINT fk_expenses_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE ExpenseSummary (
    expenseSummaryId VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    totalExpenses DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_expense_summary_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE ExpenseByCategory (
    expenseByCategoryId VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    expenseSummaryId VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    category TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,  -- Alterado de BIGINT para DECIMAL(10,2)
    FOREIGN KEY (expenseSummaryId) REFERENCES ExpenseSummary(expenseSummaryId),
    CONSTRAINT fk_expense_by_category_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE SalesSummary (
    salesSummaryId VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    totalValue DECIMAL(10, 2) NOT NULL,
    changePercentage DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_sales_summary_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE PurchaseSummary (
    purchaseSummaryId VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    totalPurchased DECIMAL(10, 2) NOT NULL,
    changePercentage DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_purchase_summary_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

-- Índices
CREATE INDEX idx_user_id_products ON Products (user_id);
CREATE INDEX idx_product_name ON Products (name);
CREATE INDEX idx_user_id_sales ON Sales (user_id);
CREATE INDEX idx_user_id_purchases ON Purchases (user_id);
CREATE INDEX idx_user_id_expenses ON Expenses (user_id);
CREATE INDEX idx_user_id_expense_summary ON ExpenseSummary (user_id);
CREATE INDEX idx_user_id_expense_by_category ON ExpenseByCategory (user_id);
CREATE INDEX idx_user_id_sales_summary ON SalesSummary (user_id);
CREATE INDEX idx_user_id_purchase_summary ON PurchaseSummary (user_id);
