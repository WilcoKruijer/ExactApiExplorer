/** String in the format /Date(UNIX_TIMESTAMP)/ */
export type ODataDateTime = string;
/** Ex. e0ecaffc-4093-493a-b4db-e9425e8901ba */
export type ODataGuid = string;

export interface DivisionResponse {
  Code: string;
  Description: string;
}

export interface Creator {
  Created: ODataDateTime;
  Creator: ODataGuid;
  CreatorFullName: string;
}

export interface Modifier {
  Modified: ODataDateTime;
  Modifier: ODataGuid;
  ModifierFullName: string;
}

export interface FinancialPeriod extends Creator, Modifier {
  ID: ODataGuid;
  Division: number;
  StartDate: ODataDateTime;
  EndDate: ODataDateTime;
  FinPeriod: number;
  FinYear: number;
}

export interface Account {
  GLAccount: ODataGuid;
  GLAccountCode: string;
  GLAccountDescription: string;
}

export interface AccountClassification extends Account, Creator, Modifier {
  ID: ODataGuid;
  Abstract: boolean;
  Code: string;
  Description: string;
  Division: number;
  IsTupleSubElement: boolean;
  Name: string;
  Nillable: boolean;
  Parent: ODataGuid | null;
  // instance = balance, duration = profit/loss
  PeriodType: "instant" | "duration";
  TaxonomyNamespace: ODataGuid;
  TaxonomyNamespaceDescription: string;
}

export interface AccountClassificationMapping extends Account {
  Classification: ODataGuid;
  ClassificationCode: string;
  ClassificationDescription: string;
  Division: number;
  GLSchemeCode: string;
  GLSchemeDescription: string;
  GLSchemeID: ODataGuid;
  ID: ODataGuid;
}

export enum AccountStatus {
  Open = 20,
  Processed = 50,
}

export enum ReportingType {
  OpeningBalance = 10,
  SalesEntry = 20,
  SalesEntryNote = 21,
  PurchaseEntry = 30,
  PurchaseCreditNote = 31,
  CashFlow = 40,
  VATReturn = 50,
  AssetDepreciation = 70,
  AssetInvestment = 71,
  AssetRevaluation = 72,
  AssetTransfer = 73,
  AssetSplit = 74,
  AssetDiscontinue = 75,
  AssetSales = 76,
  Revaluation = 80,
  ExchangeRateDifference = 82,
  PaymentDifference = 83,
  DeferredRevenue = 84,
  TrackingNumberRevaluation = 85,
  DeferredCost = 86,
  VATOnPrepayment = 87,
  // Other often means "Memoriaal" transactions
  Other = 90,
  AuditFile = 91,
  Intercompany = 92,
  Delivery = 120,
  SalesReturn = 121,
  Receipt = 130,
  PurchaseReturn = 131,
  ShopOrderStockReceipt = 140,
  ShopOrderStockReversal = 141,
  IssueToParent = 142,
  ShopOrderTimeEntry = 145,
  ShopOrderTimeReversal = 146,
  ShopOrderByProductReceipt = 147,
  ShopOrderByProductReversal = 148,
  RequirementIssue = 150,
  RequirementReversal = 151,
  ReturnedFromParent = 152,
  SubcontractIssue = 155,
  SubcontractReversal = 156,
  ShopOrderCompleted = 158,
  ShopOrderUncompleted = 159,
  FinishAssembly = 162,
  Payroll = 170,
  StockRevaluation = 180,
  FinancialRevaluation = 181,
  StockCount = 195,
  CorrectionEntry = 290,
  PeriodClosing = 310,
  YearEndReflection = 320,
  YearEndCosting = 321,
  YearEndProfitsToGrossProfit = 322,
  YearEndCosesToGrossProfit = 323,
  YearEndTax = 324,
  YearEndGrossProfitToNetProfitLoss = 325,
  YearEndProfitLossToBalanceSheet = 326,
  YearEndClosingBalance = 327,
  YearStartOpeningBalance = 328,
  Budget = 3000,
}

export interface ReportingBalance extends Account {
  Amount: number;
  AmountCredit: number;
  AmountDebit: number;
  BalanceType: "W" | "B";
  Count: number;
  Division: number;
  ID: string; // Not a guid for some reason.
  ReportingPeriod: number;
  ReportingYear: number;
  Type: ReportingType;
  Status: AccountStatus;
}

export interface RevenueListResponse {
  Year: number;
  Period: number;
  Amount: number;
}