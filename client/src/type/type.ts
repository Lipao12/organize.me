export type Product = {
    productId: string;
    name: string;
    price: number;
    rating: number;
    stockQuantity: number;
  };

  export type SalesSummary = {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
  }

  export type PurchaseSummary = {
    purchase_id: string;
    total_purchased: number;
    change_percentage?: number;
    date: string;
  }
  
  export type ExpenseSummary = {
    expenseSummarId: string;
    totalExpenses: number;
    date: string;
  }
  
  export type ExpenseByCategorySummary = {
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
  }
  