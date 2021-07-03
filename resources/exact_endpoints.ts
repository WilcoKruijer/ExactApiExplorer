const endpoints = [
  {
    "service": "Accountancy",
    "endpoint": "AccountInvolvedAccounts",
    "url": "/api/v1/{division}/accountancy/AccountInvolvedAccounts",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy practicemanagement",
  },
  {
    "service": "Accountancy",
    "endpoint": "AccountOwners",
    "url": "/api/v1/{division}/accountancy/AccountOwners",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy practicemanagement",
  },
  {
    "service": "Accountancy",
    "endpoint": "InvolvedUserRoles",
    "url": "/api/v1/{division}/accountancy/InvolvedUserRoles",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy practicemanagement",
  },
  {
    "service": "Accountancy",
    "endpoint": "InvolvedUsers",
    "url": "/api/v1/{division}/accountancy/InvolvedUsers",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy practicemanagement",
  },
  {
    "service": "Accountancy",
    "endpoint": "SolutionLinks",
    "url": "/api/v1/{division}/accountancy/SolutionLinks",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy practicemanagement",
  },
  {
    "service": "Accountancy",
    "endpoint": "TaskTypes",
    "url": "/api/v1/{division}/accountancy/TaskTypes",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy practicemanagement",
  },
  {
    "service": "Activities",
    "endpoint": "CommunicationNotes",
    "url": "/api/v1/{division}/activities/CommunicationNotes",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Organization workflow",
  },
  {
    "service": "Activities",
    "endpoint": "Complaints",
    "url": "/api/v1/{division}/activities/Complaints",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Organization workflow",
  },
  {
    "service": "Activities",
    "endpoint": "Events",
    "url": "/api/v1/{division}/activities/Events",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Organization workflow",
  },
  {
    "service": "Activities",
    "endpoint": "ServiceRequests",
    "url": "/api/v1/{division}/activities/ServiceRequests",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Organization workflow",
  },
  {
    "service": "Activities",
    "endpoint": "Tasks",
    "url": "/api/v1/{division}/activities/Tasks",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Organization workflow",
  },
  {
    "service": "Assets",
    "endpoint": "AssetGroups",
    "url": "/api/v1/{division}/assets/AssetGroups",
    "methods": [
      "GET",
    ],
    "scope": "Financial assets",
  },
  {
    "service": "Assets",
    "endpoint": "Assets",
    "url": "/api/v1/{division}/assets/Assets",
    "methods": [
      "GET",
    ],
    "scope": "Financial assets",
  },
  {
    "service": "Assets",
    "endpoint": "DepreciationMethods",
    "url": "/api/v1/{division}/assets/DepreciationMethods",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial assets",
  },
  {
    "service": "Budget",
    "endpoint": "Budgets",
    "url": "/api/v1/{division}/budget/Budgets",
    "methods": [
      "GET",
    ],
    "scope": "Financial budgets",
  },
  {
    "service": "Budget",
    "endpoint": "BudgetScenarios",
    "url": "/api/v1/beta/{division}/budget/BudgetScenarios",
    "methods": [
      "GET",
    ],
    "scope": "Financial budgets",
  },
  {
    "service": "Bulk",
    "endpoint": "Cashflow/Payments",
    "url": "/api/v1/{division}/bulk/Cashflow/Payments",
    "methods": [
      "GET",
    ],
    "scope": "Financial cashflow",
  },
  {
    "service": "Bulk",
    "endpoint": "Cashflow/Receivables",
    "url": "/api/v1/{division}/bulk/Cashflow/Receivables",
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables",
  },
  {
    "service": "Bulk",
    "endpoint": "CRM/Accounts",
    "url": "/api/v1/{division}/bulk/CRM/Accounts",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "Bulk",
    "endpoint": "CRM/Addresses",
    "url": "/api/v1/{division}/bulk/CRM/Addresses",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "Bulk",
    "endpoint": "CRM/Contacts",
    "url": "/api/v1/{division}/bulk/CRM/Contacts",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "Bulk",
    "endpoint": "CRM/QuotationLines",
    "url": "/api/v1/{division}/bulk/CRM/QuotationLines",
    "methods": [
      "GET",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "Bulk",
    "endpoint": "CRM/Quotations",
    "url": "/api/v1/{division}/bulk/CRM/Quotations",
    "methods": [
      "GET",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "Bulk",
    "endpoint": "Documents/DocumentAttachments",
    "url": "/api/v1/{division}/bulk/Documents/DocumentAttachments",
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Bulk",
    "endpoint": "Documents/Documents",
    "url": "/api/v1/{division}/bulk/Documents/Documents",
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Bulk",
    "endpoint": "Financial/GLAccounts",
    "url": "/api/v1/{division}/bulk/Financial/GLAccounts",
    "methods": [
      "GET",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Bulk",
    "endpoint": "Financial/GLClassifications",
    "url": "/api/v1/{division}/bulk/Financial/GLClassifications",
    "methods": [
      "GET",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Bulk",
    "endpoint": "Financial/TransactionLines",
    "url": "/api/v1/{division}/bulk/Financial/TransactionLines",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Bulk",
    "endpoint": "Logistics/Items",
    "url": "/api/v1/{division}/bulk/Logistics/Items",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Bulk",
    "endpoint": "Logistics/SalesItemPrices",
    "url": "/api/v1/{division}/bulk/Logistics/SalesItemPrices",
    "methods": [
      "GET",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Bulk",
    "endpoint": "Project/ProjectWBS",
    "url": "/api/v1/{division}/bulk/Project/ProjectWBS",
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Bulk",
    "endpoint": "SalesInvoice/SalesInvoiceLines",
    "url": "/api/v1/{division}/bulk/SalesInvoice/SalesInvoiceLines",
    "methods": [
      "GET",
    ],
    "scope": "Sales invoices",
  },
  {
    "service": "Bulk",
    "endpoint": "SalesInvoice/SalesInvoices",
    "url": "/api/v1/{division}/bulk/SalesInvoice/SalesInvoices",
    "methods": [
      "GET",
    ],
    "scope": "Sales invoices",
  },
  {
    "service": "Bulk",
    "endpoint": "SalesOrder/GoodsDeliveries",
    "url": "/api/v1/{division}/bulk/SalesOrder/GoodsDeliveries",
    "methods": [
      "GET",
    ],
    "scope": "Logistics wms",
  },
  {
    "service": "Bulk",
    "endpoint": "SalesOrder/GoodsDeliveryLines",
    "url": "/api/v1/{division}/bulk/SalesOrder/GoodsDeliveryLines",
    "methods": [
      "GET",
    ],
    "scope": "Logistics wms",
  },
  {
    "service": "Bulk",
    "endpoint": "SalesOrder/SalesOrderLines",
    "url": "/api/v1/{division}/bulk/SalesOrder/SalesOrderLines",
    "methods": [
      "GET",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "Bulk",
    "endpoint": "SalesOrder/SalesOrders",
    "url": "/api/v1/{division}/bulk/SalesOrder/SalesOrders",
    "methods": [
      "GET",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "Cashflow",
    "endpoint": "AllocationRule",
    "url": "/api/v1/beta/{division}/cashflow/AllocationRule",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial cashflow",
  },
  {
    "service": "Cashflow",
    "endpoint": "Banks",
    "url": "/api/v1/{division}/cashflow/Banks",
    "methods": [
      "GET",
    ],
    "scope": "Financial cashflow",
  },
  {
    "service": "Cashflow",
    "endpoint": "DirectDebitMandates",
    "url": "/api/v1/{division}/cashflow/DirectDebitMandates",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial cashflow",
  },
  {
    "service": "Cashflow",
    "endpoint": "PaymentConditions",
    "url": "/api/v1/{division}/cashflow/PaymentConditions",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Financial cashflow",
  },
  {
    "service": "Cashflow",
    "endpoint": "Payments",
    "url": "/api/v1/{division}/cashflow/Payments",
    "methods": [
      "GET",
      "PUT",
    ],
    "scope": "Financial cashflow",
  },
  {
    "service": "Cashflow",
    "endpoint": "ProcessPayments",
    "url": "/api/v1/{division}/cashflow/ProcessPayments",
    "methods": [
      "POST",
    ],
    "scope": "Financial cashflow",
  },
  {
    "service": "Cashflow",
    "endpoint": "Receivables",
    "url": "/api/v1/{division}/cashflow/Receivables",
    "methods": [
      "GET",
      "PUT",
    ],
    "scope": "Financial receivables",
  },
  {
    "service": "ContinuousMonitoring",
    "endpoint": "IndicatorBalances",
    "url": "/api/v1/beta/{division}/continuousmonitoring/IndicatorBalances",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy processmanagement",
  },
  {
    "service": "ContinuousMonitoring",
    "endpoint": "IndicatorDeviatingAmountEntereds",
    "url":
      "/api/v1/beta/{division}/continuousmonitoring/IndicatorDeviatingAmountEntereds",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy processmanagement",
  },
  {
    "service": "ContinuousMonitoring",
    "endpoint": "IndicatorDifferenceByPeriods",
    "url":
      "/api/v1/beta/{division}/continuousmonitoring/IndicatorDifferenceByPeriods",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy processmanagement",
  },
  {
    "service": "ContinuousMonitoring",
    "endpoint": "IndicatorDifferentVatCodes",
    "url":
      "/api/v1/beta/{division}/continuousmonitoring/IndicatorDifferentVatCodes",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy processmanagement",
  },
  {
    "service": "ContinuousMonitoring",
    "endpoint": "IndicatorGLAccounts",
    "url": "/api/v1/beta/{division}/continuousmonitoring/IndicatorGLAccounts",
    "methods": [
      "GET",
      "POST",
      "DELETE",
    ],
    "scope": "Accountancy processmanagement",
  },
  {
    "service": "ContinuousMonitoring",
    "endpoint": "IndicatorLiquidities",
    "url": "/api/v1/beta/{division}/continuousmonitoring/IndicatorLiquidities",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy processmanagement",
  },
  {
    "service": "ContinuousMonitoring",
    "endpoint": "IndicatorSignals",
    "url": "/api/v1/beta/{division}/continuousmonitoring/IndicatorSignals",
    "methods": [
      "GET",
    ],
    "scope": "Accountancy processmanagement",
  },
  {
    "service": "ContinuousMonitoring",
    "endpoint": "IndicatorStates",
    "url": "/api/v1/beta/{division}/continuousmonitoring/IndicatorStates",
    "methods": [
      "GET",
    ],
    "scope": "Accountancy processmanagement",
  },
  {
    "service": "ContinuousMonitoring",
    "endpoint": "IndicatorUsageOfJournals",
    "url":
      "/api/v1/beta/{division}/continuousmonitoring/IndicatorUsageOfJournals",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Accountancy processmanagement",
  },
  {
    "service": "CRM",
    "endpoint": "AcceptQuotation",
    "url": "/api/v1/{division}/crm/AcceptQuotation",
    "methods": [
      "POST",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "CRM",
    "endpoint": "AccountClasses",
    "url": "/api/v1/{division}/crm/AccountClasses",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "CRM",
    "endpoint": "AccountClassificationNames",
    "url": "/api/v1/{division}/crm/AccountClassificationNames",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "CRM",
    "endpoint": "AccountClassifications",
    "url": "/api/v1/{division}/crm/AccountClassifications",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "CRM",
    "endpoint": "AccountDocumentFolders",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadCRMAccountDocumentFolders" target="_blank">AccountDocumentFolders - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "CRM",
    "endpoint": "AccountDocuments",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadCRMAccountDocuments" target="_blank">AccountDocuments - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "CRM",
    "endpoint": "AccountDocumentsCount",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadCRMAccountDocumentsCount" target="_blank">AccountDocumentsCount - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "CRM",
    "endpoint": "Accounts",
    "url": "/api/v1/{division}/crm/Accounts",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "CRM",
    "endpoint": "Addresses",
    "url": "/api/v1/{division}/crm/Addresses",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "CRM",
    "endpoint": "AddressStates",
    "url": "/api/v1/{division}/crm/AddressStates",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "CRM",
    "endpoint": "BankAccounts",
    "url": "/api/v1/{division}/crm/BankAccounts",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "CRM",
    "endpoint": "Contacts",
    "url": "/api/v1/{division}/crm/Contacts",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "CRM",
    "endpoint": "DefaultAddressForAccount",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadCRMDefaultAddressForAccount" target="_blank">DefaultAddressForAccount - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "CRM",
    "endpoint": "Documents",
    "url": "/api/v1/{division}/read/crm/Documents",
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "CRM",
    "endpoint": "DocumentsAttachments",
    "url": "/api/v1/{division}/read/crm/DocumentsAttachments",
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "CRM",
    "endpoint": "HostingOpportunities",
    "url": "/api/v1/{division}/crm/HostingOpportunities",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Hosting hosting",
  },
  {
    "service": "CRM",
    "endpoint": "Opportunities",
    "url": "/api/v1/{division}/crm/Opportunities",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Crm opportunities",
  },
  {
    "service": "CRM",
    "endpoint": "OpportunityContacts",
    "url": "/api/v1/{division}/read/crm/OpportunityContacts",
    "methods": [
      "GET",
    ],
    "scope": "Crm opportunities",
  },
  {
    "service": "CRM",
    "endpoint": "OpportunityDocuments",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadCRMOpportunityDocuments" target="_blank">OpportunityDocuments - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Crm opportunities",
  },
  {
    "service": "CRM",
    "endpoint": "OpportunityDocumentsCount",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadCRMOpportunityDocumentsCount" target="_blank">OpportunityDocumentsCount - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Crm opportunities",
  },
  {
    "service": "CRM",
    "endpoint": "PrintQuotation",
    "url": "/api/v1/{division}/crm/PrintQuotation",
    "methods": [
      "POST",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "CRM",
    "endpoint": "QuotationLines",
    "url": "/api/v1/{division}/crm/QuotationLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "CRM",
    "endpoint": "Quotations",
    "url": "/api/v1/{division}/crm/Quotations",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "CRM",
    "endpoint": "ReasonCodes",
    "url": "/api/v1/{division}/crm/ReasonCodes",
    "methods": [
      "GET",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "CRM",
    "endpoint": "RejectQuotation",
    "url": "/api/v1/{division}/crm/RejectQuotation",
    "methods": [
      "POST",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "CRM",
    "endpoint": "ReopenQuotation",
    "url": "/api/v1/{division}/crm/ReopenQuotation",
    "methods": [
      "POST",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "CRM",
    "endpoint": "ReviewQuotation",
    "url": "/api/v1/{division}/crm/ReviewQuotation",
    "methods": [
      "POST",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "Documents",
    "endpoint": "DocumentAttachments",
    "url": "/api/v1/{division}/documents/DocumentAttachments",
    "methods": [
      "GET",
      "POST",
      "DELETE",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Documents",
    "endpoint": "DocumentCategories",
    "url": "/api/v1/{division}/documents/DocumentCategories",
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Documents",
    "endpoint": "DocumentFolders",
    "url": "/api/v1/{division}/documents/DocumentFolders",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Documents",
    "endpoint": "Documents",
    "url": "/api/v1/{division}/documents/Documents",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Documents",
    "endpoint": "DocumentTypeCategories",
    "url": "/api/v1/{division}/documents/DocumentTypeCategories",
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Documents",
    "endpoint": "DocumentTypeFolders",
    "url": "/api/v1/{division}/documents/DocumentTypeFolders",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Documents",
    "endpoint": "DocumentTypes",
    "url": "/api/v1/{division}/documents/DocumentTypes",
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Financial",
    "endpoint": "AgingOverview",
    "url": "/api/v1/{division}/read/financial/AgingOverview",
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables, financial payables",
  },
  {
    "service": "Financial",
    "endpoint": "AgingOverviewByAccount",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialAgingOverviewByAccount" target="_blank">AgingOverviewByAccount - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables, financial payables",
  },
  {
    "service": "Financial",
    "endpoint": "AgingPayablesList",
    "url": "/api/v1/{division}/read/financial/AgingPayablesList",
    "methods": [
      "GET",
    ],
    "scope": "Financial payables",
  },
  {
    "service": "Financial",
    "endpoint": "AgingPayablesListByAgeGroup",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialAgingPayablesListByAgeGroup" target="_blank">AgingPayablesListByAgeGroup - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial payables",
  },
  {
    "service": "Financial",
    "endpoint": "AgingReceivablesList",
    "url": "/api/v1/{division}/read/financial/AgingReceivablesList",
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables",
  },
  {
    "service": "Financial",
    "endpoint": "AgingReceivablesListByAgeGroup",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialAgingReceivablesListByAgeGroup" target="_blank">AgingReceivablesListByAgeGroup - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables",
  },
  {
    "service": "Financial",
    "endpoint": "DeductibilityPercentages",
    "url": "/api/v1/{division}/financial/DeductibilityPercentages",
    "methods": [
      "GET",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Financial",
    "endpoint": "ExchangeRates",
    "url": "/api/v1/{division}/financial/ExchangeRates",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial currencies",
  },
  {
    "service": "Financial",
    "endpoint": "FinancialPeriods",
    "url": "/api/v1/{division}/financial/FinancialPeriods",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Financial",
    "endpoint": "GLAccountClassificationMappings",
    "url": "/api/v1/{division}/financial/GLAccountClassificationMappings",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Financial",
    "endpoint": "GLAccounts",
    "url": "/api/v1/{division}/financial/GLAccounts",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Financial",
    "endpoint": "GLClassifications",
    "url": "/api/v1/{division}/financial/GLClassifications",
    "methods": [
      "GET",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Financial",
    "endpoint": "GLSchemes",
    "url": "/api/v1/{division}/financial/GLSchemes",
    "methods": [
      "GET",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Financial",
    "endpoint": "GLTransactionSources",
    "url": "/api/v1/{division}/financial/GLTransactionSources",
    "methods": [
      "GET",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Financial",
    "endpoint": "GLTransactionTypes",
    "url": "/api/v1/{division}/financial/GLTransactionTypes",
    "methods": [
      "GET",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Financial",
    "endpoint": "Journals",
    "url": "/api/v1/{division}/financial/Journals",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Financial",
    "endpoint": "JournalStatusByFinancialPeriod",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialJournalStatusByFinancialPeriod" target="_blank">JournalStatusByFinancialPeriod - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Financial",
    "endpoint": "JournalStatusList",
    "url": "/api/v1/{division}/read/financial/JournalStatusList",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Financial",
    "endpoint": "OfficialReturns",
    "url": "/api/v1/{division}/financial/OfficialReturns",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Financial returns",
  },
  {
    "service": "Financial",
    "endpoint": "OutstandingInvoicesOverview",
    "url": "/api/v1/{division}/read/financial/OutstandingInvoicesOverview",
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables, financial payables",
  },
  {
    "service": "Financial",
    "endpoint": "PayablesList",
    "url": "/api/v1/{division}/read/financial/PayablesList",
    "methods": [
      "GET",
    ],
    "scope": "Financial payables",
  },
  {
    "service": "Financial",
    "endpoint": "PayablesListByAccount",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialPayablesListByAccount" target="_blank">PayablesListByAccount - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial payables",
  },
  {
    "service": "Financial",
    "endpoint": "PayablesListByAccountAndAgeGroup",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialPayablesListByAccountAndAgeGroup" target="_blank">PayablesListByAccountAndAgeGroup - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial payables",
  },
  {
    "service": "Financial",
    "endpoint": "PayablesListByAgeGroup",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialPayablesListByAgeGroup" target="_blank">PayablesListByAgeGroup - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial payables",
  },
  {
    "service": "Financial",
    "endpoint": "ProfitLossOverview",
    "url": "/api/v1/{division}/read/financial/ProfitLossOverview",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Financial",
    "endpoint": "ReceivablesList",
    "url": "/api/v1/{division}/read/financial/ReceivablesList",
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables",
  },
  {
    "service": "Financial",
    "endpoint": "ReceivablesListByAccount",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialReceivablesListByAccount" target="_blank">ReceivablesListByAccount - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables",
  },
  {
    "service": "Financial",
    "endpoint": "ReceivablesListByAccountAndAgeGroup",
    "url":
      "/api/v1/{division}/read/financial/ReceivablesListByAccountAndAgeGroup",
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables",
  },
  {
    "service": "Financial",
    "endpoint": "ReceivablesListByAgeGroup",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialReceivablesListByAgeGroup" target="_blank">ReceivablesListByAgeGroup - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial receivables",
  },
  {
    "service": "Financial",
    "endpoint": "ReportingBalance",
    "url": "/api/v1/{division}/financial/ReportingBalance",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Financial",
    "endpoint": "ReportingBalanceByClassification",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialReportingBalanceByClassification" target="_blank">ReportingBalanceByClassification - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Financial",
    "endpoint": "Returns",
    "url": "/api/v1/{division}/read/financial/Returns",
    "methods": [
      "GET",
    ],
    "scope": "Financial returns",
  },
  {
    "service": "Financial",
    "endpoint": "RevenueList",
    "url": "/api/v1/{division}/read/financial/RevenueList",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Financial",
    "endpoint": "RevenueListByYear",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialRevenueListByYear" target="_blank">RevenueListByYear - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Financial",
    "endpoint": "RevenueListByYearAndStatus",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadFinancialRevenueListByYearAndStatus" target="_blank">RevenueListByYearAndStatus - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "FinancialTransaction",
    "endpoint": "BankEntries",
    "url": "/api/v1/{division}/financialtransaction/BankEntries",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "FinancialTransaction",
    "endpoint": "BankEntryLines",
    "url": "/api/v1/{division}/financialtransaction/BankEntryLines",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "FinancialTransaction",
    "endpoint": "CashEntries",
    "url": "/api/v1/{division}/financialtransaction/CashEntries",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "FinancialTransaction",
    "endpoint": "CashEntryLines",
    "url": "/api/v1/{division}/financialtransaction/CashEntryLines",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "FinancialTransaction",
    "endpoint": "TransactionLines",
    "url": "/api/v1/{division}/financialtransaction/TransactionLines",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "General",
    "endpoint": "Currencies",
    "url": "/api/v1/{division}/general/Currencies",
    "methods": [
      "GET",
    ],
    "scope": "Financial currencies",
  },
  {
    "service": "GeneralJournalEntry",
    "endpoint": "GeneralJournalEntries",
    "url": "/api/v1/{division}/generaljournalentry/GeneralJournalEntries",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "GeneralJournalEntry",
    "endpoint": "GeneralJournalEntryLines",
    "url": "/api/v1/{division}/generaljournalentry/GeneralJournalEntryLines",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "HRM",
    "endpoint": "AbsenceRegistrations",
    "url": "/api/v1/{division}/hrm/AbsenceRegistrations",
    "methods": [
      "GET",
    ],
    "scope": "Hrm employees",
  },
  {
    "service": "HRM",
    "endpoint": "AbsenceRegistrationTransactions",
    "url": "/api/v1/{division}/hrm/AbsenceRegistrationTransactions",
    "methods": [
      "GET",
    ],
    "scope": "Hrm employees",
  },
  {
    "service": "HRM",
    "endpoint": "Costcenters",
    "url": "/api/v1/{division}/hrm/Costcenters",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial costcenters",
  },
  {
    "service": "HRM",
    "endpoint": "Costunits",
    "url": "/api/v1/{division}/hrm/Costunits",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial costcenters",
  },
  {
    "service": "HRM",
    "endpoint": "Departments",
    "url": "/api/v1/{division}/hrm/Departments",
    "methods": [
      "GET",
    ],
    "scope": "Hrm employees",
  },
  {
    "service": "HRM",
    "endpoint": "DivisionClasses",
    "url": "/api/v1/{division}/hrm/DivisionClasses",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "HRM",
    "endpoint": "DivisionClassNames",
    "url": "/api/v1/{division}/hrm/DivisionClassNames",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "HRM",
    "endpoint": "DivisionClassValues",
    "url": "/api/v1/{division}/hrm/DivisionClassValues",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "HRM",
    "endpoint": "Divisions",
    "url": "/api/v1/{division}/hrm/Divisions",
    "methods": [
      "GET",
    ],
    "scope": "-",
  },
  {
    "service": "HRM",
    "endpoint": "JobGroups",
    "url": "/api/v1/{division}/hrm/JobGroups",
    "methods": [
      "GET",
    ],
    "scope": "Hrm employees",
  },
  {
    "service": "HRM",
    "endpoint": "JobTitles",
    "url": "/api/v1/{division}/hrm/JobTitles",
    "methods": [
      "GET",
    ],
    "scope": "Hrm employees",
  },
  {
    "service": "HRM",
    "endpoint": "LeaveBuildUpRegistrations",
    "url": "/api/v1/{division}/hrm/LeaveBuildUpRegistrations",
    "methods": [
      "GET",
    ],
    "scope": "Hrm employees",
  },
  {
    "service": "HRM",
    "endpoint": "LeaveRegistrations",
    "url": "/api/v1/{division}/hrm/LeaveRegistrations",
    "methods": [
      "GET",
    ],
    "scope": "Hrm employees",
  },
  {
    "service": "HRM",
    "endpoint": "Schedules",
    "url": "/api/v1/{division}/hrm/Schedules",
    "methods": [
      "GET",
    ],
    "scope": "Hrm employees",
  },
  {
    "service": "Inventory",
    "endpoint": "AssemblyOrders",
    "url": "/api/v1/{division}/inventory/AssemblyOrders",
    "methods": [
      "GET",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Inventory",
    "endpoint": "BatchNumbers",
    "url": "/api/v1/{division}/inventory/BatchNumbers",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Inventory",
    "endpoint": "ItemWarehousePlanningDetails",
    "url": "/api/v1/{division}/inventory/ItemWarehousePlanningDetails",
    "methods": [
      "GET",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "ItemWarehouses",
    "url": "/api/v1/{division}/inventory/ItemWarehouses",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "ItemWarehouseStorageLocations",
    "url": "/api/v1/{division}/inventory/ItemWarehouseStorageLocations",
    "methods": [
      "GET",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "ProcessStockCount",
    "url": "/api/v1/{division}/inventory/ProcessStockCount",
    "methods": [
      "POST",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "ProcessWarehouseTransfer",
    "url": "/api/v1/{division}/inventory/ProcessWarehouseTransfer",
    "methods": [
      "POST",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "SerialNumbers",
    "url": "/api/v1/{division}/inventory/SerialNumbers",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Inventory",
    "endpoint": "StockBatchNumbers",
    "url": "/api/v1/{division}/inventory/StockBatchNumbers",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "StockCountLines",
    "url": "/api/v1/{division}/inventory/StockCountLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "StockCounts",
    "url": "/api/v1/{division}/inventory/StockCounts",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "StockSerialNumbers",
    "url": "/api/v1/{division}/inventory/StockSerialNumbers",
    "methods": [
      "GET",
      "POST",
      "DELETE",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "StorageLocations",
    "url": "/api/v1/{division}/inventory/StorageLocations",
    "methods": [
      "GET",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "Warehouses",
    "url": "/api/v1/{division}/inventory/Warehouses",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "WarehouseTransferLines",
    "url": "/api/v1/{division}/inventory/WarehouseTransferLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Inventory",
    "endpoint": "WarehouseTransfers",
    "url": "/api/v1/{division}/inventory/WarehouseTransfers",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Logistics",
    "endpoint": "AccountItems",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadLogisticsAccountItems" target="_blank">AccountItems - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "CustomerItems",
    "url": "/api/v1/{division}/logistics/CustomerItems",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "ItemAssortment",
    "url": "/api/v1/{division}/logistics/ItemAssortment",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "ItemAssortmentProperty",
    "url": "/api/v1/{division}/logistics/ItemAssortmentProperty",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "ItemChargeRelation",
    "url": "/api/v1/{division}/logistics/ItemChargeRelation",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "ItemDetailsByID",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadLogisticsItemDetailsByID" target="_blank">ItemDetailsByID - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "ItemExtraField",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadLogisticsItemExtraField" target="_blank">ItemExtraField - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "ItemGroups",
    "url": "/api/v1/{division}/logistics/ItemGroups",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "Items",
    "url": "/api/v1/{division}/logistics/Items",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "ItemVersions",
    "url": "/api/v1/{division}/logistics/ItemVersions",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "SalesItemPrice",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadLogisticsSalesItemPrice" target="_blank">SalesItemPrice - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Logistics",
    "endpoint": "SalesItemPrices",
    "url": "/api/v1/{division}/logistics/SalesItemPrices",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Logistics",
    "endpoint": "SelectionCodes",
    "url": "/api/v1/{division}/logistics/SelectionCodes",
    "methods": [
      "GET",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "Logistics",
    "endpoint": "StockPosition",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadLogisticsStockPosition" target="_blank">StockPosition - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Logistics inventory",
  },
  {
    "service": "Logistics",
    "endpoint": "SupplierItem",
    "url": "/api/v1/{division}/logistics/SupplierItem",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Logistics",
    "endpoint": "Units",
    "url": "/api/v1/{division}/logistics/Units",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Mailbox",
    "endpoint": "DefaultMailbox",
    "url": "/api/v1/{division}/read/mailbox/DefaultMailbox",
    "methods": [
      "GET",
    ],
    "scope": "Communication mailboxes",
  },
  {
    "service": "Mailbox",
    "endpoint": "Mailboxes",
    "url": "/api/v1/{division}/mailbox/Mailboxes",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Communication mailboxes",
  },
  {
    "service": "Mailbox",
    "endpoint": "MailMessageAttachments",
    "url": "/api/v1/{division}/mailbox/MailMessageAttachments",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Communication mailboxes",
  },
  {
    "service": "Mailbox",
    "endpoint": "MailMessagesSent",
    "url": "/api/v1/{division}/mailbox/MailMessagesSent",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Communication mailboxes",
  },
  {
    "service": "Mailbox",
    "endpoint": "PreferredMailbox",
    "url": "/api/v1/{division}/read/mailbox/PreferredMailbox",
    "methods": [
      "GET",
    ],
    "scope": "Communication mailboxes",
  },
  {
    "service": "Mailbox",
    "endpoint": "PreferredMailboxForOperation",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadMailboxPreferredMailboxForOperation" target="_blank">PreferredMailboxForOperation - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Communication mailboxes",
  },
  {
    "service": "Manufacturing",
    "endpoint": "BillOfMaterialMaterials",
    "url": "/api/v1/{division}/manufacturing/BillOfMaterialMaterials",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "BillOfMaterialVersions",
    "url": "/api/v1/{division}/manufacturing/BillOfMaterialVersions",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ByProductReceipts",
    "url": "/api/v1/{division}/manufacturing/ByProductReceipts",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ByProductReversals",
    "url": "/api/v1/{division}/manufacturing/ByProductReversals",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ManufacturingSettings",
    "url": "/api/v1/{division}/manufacturing/ManufacturingSettings",
    "methods": [
      "GET",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "MaterialIssues",
    "url": "/api/v1/{division}/manufacturing/MaterialIssues",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "MaterialReversals",
    "url": "/api/v1/{division}/manufacturing/MaterialReversals",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "OperationResources",
    "url": "/api/v1/{division}/manufacturing/OperationResources",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "Operations",
    "url": "/api/v1/{division}/manufacturing/Operations",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ProductionAreas",
    "url": "/api/v1/{division}/manufacturing/ProductionAreas",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "RecentTimeTransactions",
    "url": "/api/v1/{division}/read/manufacturing/RecentTimeTransactions",
    "methods": [
      "GET",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ShopOrderMaterialPlanDetails",
    "url": "/api/v1/{division}/manufacturing/ShopOrderMaterialPlanDetails",
    "methods": [
      "GET",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ShopOrderMaterialPlans",
    "url": "/api/v1/{division}/manufacturing/ShopOrderMaterialPlans",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ShopOrderPriorities",
    "url": "/api/v1/{division}/manufacturing/ShopOrderPriorities",
    "methods": [
      "GET",
      "PUT",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ShopOrderReceipts",
    "url": "/api/v1/{division}/manufacturing/ShopOrderReceipts",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ShopOrderReversals",
    "url": "/api/v1/{division}/manufacturing/ShopOrderReversals",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ShopOrderRoutingStepPlans",
    "url": "/api/v1/{division}/manufacturing/ShopOrderRoutingStepPlans",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ShopOrderRoutingStepPlansAvailableToWork",
    "url":
      "/api/v1/{division}/read/manufacturing/ShopOrderRoutingStepPlansAvailableToWork",
    "methods": [
      "GET",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "ShopOrders",
    "url": "/api/v1/{division}/manufacturing/ShopOrders",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "Manufacturing",
    "endpoint": "StageForDeliveryReceipts",
    "url": "/api/v1/{division}/manufacturing/StageForDeliveryReceipts",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "StageForDeliveryReversals",
    "url": "/api/v1/{division}/manufacturing/StageForDeliveryReversals",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "StartedTimedTimeTransactions",
    "url": "/api/v1/{division}/read/manufacturing/StartedTimedTimeTransactions",
    "methods": [
      "GET",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "SubOrderReceipts",
    "url": "/api/v1/{division}/manufacturing/SubOrderReceipts",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "SubOrderReversals",
    "url": "/api/v1/{division}/manufacturing/SubOrderReversals",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Manufacturing production",
  },
  {
    "service": "Manufacturing",
    "endpoint": "TimedTimeTransactions",
    "url": "/api/v1/{division}/manufacturing/TimedTimeTransactions",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "Manufacturing",
    "endpoint": "TimeTransactions",
    "url": "/api/v1/{division}/manufacturing/TimeTransactions",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "Manufacturing",
    "endpoint": "Workcenters",
    "url": "/api/v1/{division}/manufacturing/Workcenters",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Manufacturing shopfloor",
  },
  {
    "service": "OpeningBalance",
    "endpoint": "CurrentYear/AfterEntry",
    "url": "/api/v1/{division}/openingbalance/CurrentYear/AfterEntry",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "OpeningBalance",
    "endpoint": "CurrentYear/Processed",
    "url": "/api/v1/{division}/openingbalance/CurrentYear/Processed",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "OpeningBalance",
    "endpoint": "PreviousYear/AfterEntry",
    "url": "/api/v1/{division}/openingbalance/PreviousYear/AfterEntry",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "OpeningBalance",
    "endpoint": "PreviousYear/Processed",
    "url": "/api/v1/{division}/openingbalance/PreviousYear/Processed",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Payroll",
    "endpoint": "ActiveEmployments",
    "url": "/api/v1/{division}/payroll/ActiveEmployments",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "Employees",
    "url": "/api/v1/{division}/payroll/Employees",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "EmploymentConditionGroups",
    "url": "/api/v1/beta/{division}/payroll/EmploymentConditionGroups",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "EmploymentContractFlexPhases",
    "url": "/api/v1/{division}/payroll/EmploymentContractFlexPhases",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "EmploymentContracts",
    "url": "/api/v1/{division}/payroll/EmploymentContracts",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "EmploymentEndReasons",
    "url": "/api/v1/{division}/payroll/EmploymentEndReasons",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "EmploymentEndReasonsOnFocusDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadPayrollEmploymentEndReasonsOnFocusDate" target="_blank">EmploymentEndReasonsOnFocusDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "EmploymentOrganizations",
    "url": "/api/v1/{division}/payroll/EmploymentOrganizations",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "Employments",
    "url": "/api/v1/{division}/payroll/Employments",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "EmploymentSalaries",
    "url": "/api/v1/{division}/payroll/EmploymentSalaries",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "PayrollComponents",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=PayrollPayrollComponents" target="_blank">PayrollComponents - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "PayrollTransactionsByPayrollYear",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=PayrollPayrollTransactionsByPayrollYear" target="_blank">PayrollTransactionsByPayrollYear - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Payroll",
    "endpoint": "TaxEmploymentEndFlexCodes",
    "url": "/api/v1/{division}/payroll/TaxEmploymentEndFlexCodes",
    "methods": [
      "GET",
    ],
    "scope": "Hrm payroll",
  },
  {
    "service": "Project",
    "endpoint": "CostEntryExpensesByProject",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostEntryExpensesByProject" target="_blank">CostEntryExpensesByProject - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostEntryRecentAccounts",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostEntryRecentAccounts" target="_blank">CostEntryRecentAccounts - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostEntryRecentAccountsByProject",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostEntryRecentAccountsByProject" target="_blank">CostEntryRecentAccountsByProject - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostEntryRecentCostTypes",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostEntryRecentCostTypes" target="_blank">CostEntryRecentCostTypes - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostEntryRecentCostTypesByProject",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostEntryRecentCostTypesByProject" target="_blank">CostEntryRecentCostTypesByProject - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostEntryRecentExpensesByProject",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostEntryRecentExpensesByProject" target="_blank">CostEntryRecentExpensesByProject - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostEntryRecentProjects",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostEntryRecentProjects" target="_blank">CostEntryRecentProjects - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostsByDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostsByDate" target="_blank">CostsByDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostsById",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostsById" target="_blank">CostsById - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostTransactions",
    "url": "/api/v1/{division}/project/CostTransactions",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostTypes",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostTypes" target="_blank">CostTypes - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostTypesByDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostTypesByDate" target="_blank">CostTypesByDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "CostTypesByProjectAndDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectCostTypesByProjectAndDate" target="_blank">CostTypesByProjectAndDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "EmployeeRestrictionItems",
    "url": "/api/v1/{division}/project/EmployeeRestrictionItems",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "EmploymentInternalRates",
    "url": "/api/v1/{division}/project/EmploymentInternalRates",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourCostTypes",
    "url": "/api/v1/{division}/read/project/HourCostTypes",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourEntryActivitiesByProject",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourEntryActivitiesByProject" target="_blank">HourEntryActivitiesByProject - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourEntryRecentAccounts",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourEntryRecentAccounts" target="_blank">HourEntryRecentAccounts - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourEntryRecentAccountsByProject",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourEntryRecentAccountsByProject" target="_blank">HourEntryRecentAccountsByProject - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourEntryRecentActivitiesByProject",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourEntryRecentActivitiesByProject" target="_blank">HourEntryRecentActivitiesByProject - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "HourEntryRecentHourTypes",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourEntryRecentHourTypes" target="_blank">HourEntryRecentHourTypes - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourEntryRecentHourTypesByProject",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourEntryRecentHourTypesByProject" target="_blank">HourEntryRecentHourTypesByProject - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourEntryRecentProjects",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourEntryRecentProjects" target="_blank">HourEntryRecentProjects - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HoursByDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHoursByDate" target="_blank">HoursByDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HoursById",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHoursById" target="_blank">HoursById - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourTypes",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourTypes" target="_blank">HourTypes - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourTypesByDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourTypesByDate" target="_blank">HourTypesByDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "HourTypesByProjectAndDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectHourTypesByProjectAndDate" target="_blank">HourTypesByProjectAndDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "InvoiceTerms",
    "url": "/api/v1/{division}/project/InvoiceTerms",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectAccountMutations",
    "url": "/api/v1/{division}/project/ProjectAccountMutations",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectBudgetTypes",
    "url": "/api/v1/{division}/project/ProjectBudgetTypes",
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectHourBudgets",
    "url": "/api/v1/{division}/project/ProjectHourBudgets",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectPlanning",
    "url": "/api/v1/{division}/project/ProjectPlanning",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectPlanningRecurring",
    "url": "/api/v1/{division}/project/ProjectPlanningRecurring",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectRestrictionEmployeeItems",
    "url": "/api/v1/{division}/project/ProjectRestrictionEmployeeItems",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectRestrictionEmployees",
    "url": "/api/v1/{division}/project/ProjectRestrictionEmployees",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectRestrictionItems",
    "url": "/api/v1/{division}/project/ProjectRestrictionItems",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectRestrictionRebillings",
    "url": "/api/v1/{division}/project/ProjectRestrictionRebillings",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "Projects",
    "url": "/api/v1/{division}/project/Projects",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectWBSByProject",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectProjectWBSByProject" target="_blank">ProjectWBSByProject - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "ProjectWBSByProjectAndWBS",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectProjectWBSByProjectAndWBS" target="_blank">ProjectWBSByProjectAndWBS - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "RecentCosts",
    "url": "/api/v1/{division}/read/project/RecentCosts",
    "methods": [
      "GET",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "RecentCostsByNumberOfWeeks",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectRecentCostsByNumberOfWeeks" target="_blank">RecentCostsByNumberOfWeeks - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "RecentHours",
    "url": "/api/v1/{division}/read/project/RecentHours",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "RecentHoursByNumberOfWeeks",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectRecentHoursByNumberOfWeeks" target="_blank">RecentHoursByNumberOfWeeks - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingAccountDetails",
    "url": "/api/v1/{division}/read/project/TimeAndBillingAccountDetails",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingAccountDetailsByID",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectTimeAndBillingAccountDetailsByID" target="_blank">TimeAndBillingAccountDetailsByID - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingActivitiesAndExpenses",
    "url":
      "/api/v1/{division}/read/project/TimeAndBillingActivitiesAndExpenses",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryAccounts",
    "url": "/api/v1/{division}/read/project/TimeAndBillingEntryAccounts",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryAccountsByDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectTimeAndBillingEntryAccountsByDate" target="_blank">TimeAndBillingEntryAccountsByDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryAccountsByProjectAndDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectTimeAndBillingEntryAccountsByProjectAndDate" target="_blank">TimeAndBillingEntryAccountsByProjectAndDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryProjects",
    "url": "/api/v1/{division}/read/project/TimeAndBillingEntryProjects",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryProjectsByAccountAndDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectTimeAndBillingEntryProjectsByAccountAndDate" target="_blank">TimeAndBillingEntryProjectsByAccountAndDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryProjectsByDate",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectTimeAndBillingEntryProjectsByDate" target="_blank">TimeAndBillingEntryProjectsByDate - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryRecentAccounts",
    "url": "/api/v1/{division}/read/project/TimeAndBillingEntryRecentAccounts",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryRecentActivitiesAndExpenses",
    "url":
      "/api/v1/{division}/read/project/TimeAndBillingEntryRecentActivitiesAndExpenses",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryRecentHourCostTypes",
    "url":
      "/api/v1/{division}/read/project/TimeAndBillingEntryRecentHourCostTypes",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingEntryRecentProjects",
    "url": "/api/v1/{division}/read/project/TimeAndBillingEntryRecentProjects",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingItemDetails",
    "url": "/api/v1/{division}/read/project/TimeAndBillingItemDetails",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingItemDetailsByID",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectTimeAndBillingItemDetailsByID" target="_blank">TimeAndBillingItemDetailsByID - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingProjectDetails",
    "url": "/api/v1/{division}/read/project/TimeAndBillingProjectDetails",
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingProjectDetailsByID",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectTimeAndBillingProjectDetailsByID" target="_blank">TimeAndBillingProjectDetailsByID - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeAndBillingRecentProjects",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=ReadProjectTimeAndBillingRecentProjects" target="_blank">TimeAndBillingRecentProjects - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeCorrections",
    "url": "/api/v1/{division}/project/TimeCorrections",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "TimeTransactions",
    "url": "/api/v1/{division}/project/TimeTransactions",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects billing",
  },
  {
    "service": "Project",
    "endpoint": "WBSActivities",
    "url": "/api/v1/{division}/project/WBSActivities",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "WBSDeliverables",
    "url": "/api/v1/{division}/project/WBSDeliverables",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Project",
    "endpoint": "WBSExpenses",
    "url": "/api/v1/{division}/project/WBSExpenses",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Projects projects",
  },
  {
    "service": "Purchase",
    "endpoint": "PurchaseInvoiceLines",
    "url": "/api/v1/{division}/purchase/PurchaseInvoiceLines",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Purchase invoices",
  },
  {
    "service": "Purchase",
    "endpoint": "PurchaseInvoices",
    "url": "/api/v1/{division}/purchase/PurchaseInvoices",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Purchase invoices",
  },
  {
    "service": "PurchaseEntry",
    "endpoint": "PurchaseEntries",
    "url": "/api/v1/{division}/purchaseentry/PurchaseEntries",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "PurchaseEntry",
    "endpoint": "PurchaseEntryLines",
    "url": "/api/v1/{division}/purchaseentry/PurchaseEntryLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "PurchaseOrder",
    "endpoint": "GoodsReceiptLines",
    "url": "/api/v1/{division}/purchaseorder/GoodsReceiptLines",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Logistics wms",
  },
  {
    "service": "PurchaseOrder",
    "endpoint": "GoodsReceipts",
    "url": "/api/v1/{division}/purchaseorder/GoodsReceipts",
    "methods": [
      "GET",
      "POST",
    ],
    "scope": "Logistics wms",
  },
  {
    "service": "PurchaseOrder",
    "endpoint": "PurchaseOrderLines",
    "url": "/api/v1/{division}/purchaseorder/PurchaseOrderLines",
    "methods": [
      "GET",
      "POST",
      "DELETE",
    ],
    "scope": "Purchase orders",
  },
  {
    "service": "PurchaseOrder",
    "endpoint": "PurchaseOrders",
    "url": "/api/v1/{division}/purchaseorder/PurchaseOrders",
    "methods": [
      "GET",
      "POST",
      "DELETE",
    ],
    "scope": "Purchase orders",
  },
  {
    "service": "Sales",
    "endpoint": "PriceLists",
    "url": "/api/v1/{division}/sales/PriceLists",
    "methods": [
      "GET",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Sales",
    "endpoint": "SalesPriceListDetails",
    "url": "/api/v1/{division}/sales/SalesPriceListDetails",
    "methods": [
      "GET",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Sales",
    "endpoint": "SalesPriceListLinkedAccounts",
    "url": "/api/v1/{division}/sales/SalesPriceListLinkedAccounts",
    "methods": [
      "GET",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Sales",
    "endpoint": "SalesPriceListPeriods",
    "url": "/api/v1/{division}/sales/SalesPriceListPeriods",
    "methods": [
      "GET",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Sales",
    "endpoint": "SalesPriceLists",
    "url": "/api/v1/{division}/sales/SalesPriceLists",
    "methods": [
      "GET",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Sales",
    "endpoint": "SalesPriceListVolumeDiscounts",
    "url": "/api/v1/{division}/sales/SalesPriceListVolumeDiscounts",
    "methods": [
      "GET",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Sales",
    "endpoint": "ShippingMethods",
    "url": "/api/v1/{division}/sales/ShippingMethods",
    "methods": [
      "GET",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "SalesEntry",
    "endpoint": "SalesEntries",
    "url": "/api/v1/{division}/salesentry/SalesEntries",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "SalesEntry",
    "endpoint": "SalesEntryLines",
    "url": "/api/v1/{division}/salesentry/SalesEntryLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "SalesInvoice",
    "endpoint": "InvoiceSalesOrders",
    "url": "/api/v1/{division}/salesinvoice/InvoiceSalesOrders",
    "methods": [
      "POST",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "SalesInvoice",
    "endpoint": "Layouts",
    "url": "/api/v1/{division}/salesinvoice/Layouts",
    "methods": [
      "GET",
    ],
    "scope": "Sales invoices",
  },
  {
    "service": "SalesInvoice",
    "endpoint": "PrintedSalesInvoices",
    "url": "/api/v1/{division}/salesinvoice/PrintedSalesInvoices",
    "methods": [
      "POST",
    ],
    "scope": "Sales invoices",
  },
  {
    "service": "SalesInvoice",
    "endpoint": "SalesInvoiceLines",
    "url": "/api/v1/{division}/salesinvoice/SalesInvoiceLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Sales invoices",
  },
  {
    "service": "SalesInvoice",
    "endpoint": "SalesInvoices",
    "url": "/api/v1/{division}/salesinvoice/SalesInvoices",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Sales invoices",
  },
  {
    "service": "SalesInvoice",
    "endpoint": "SalesOrderID",
    "url": "/api/v1/{division}/salesinvoice/SalesOrderID",
    "methods": [
      "POST",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "SalesOrder",
    "endpoint": "GoodsDeliveries",
    "url": "/api/v1/{division}/salesorder/GoodsDeliveries",
    "methods": [
      "GET",
      "POST",
      "PUT",
    ],
    "scope": "Logistics wms",
  },
  {
    "service": "SalesOrder",
    "endpoint": "GoodsDeliveryLines",
    "url": "/api/v1/{division}/salesorder/GoodsDeliveryLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
    ],
    "scope": "Logistics wms",
  },
  {
    "service": "SalesOrder",
    "endpoint": "PlannedSalesReturnLines",
    "url": "/api/v1/{division}/salesorder/PlannedSalesReturnLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "SalesOrder",
    "endpoint": "PlannedSalesReturns",
    "url": "/api/v1/{division}/salesorder/PlannedSalesReturns",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "SalesOrder",
    "endpoint": "PrintedSalesOrders",
    "url": "/api/v1/{division}/salesorder/PrintedSalesOrders",
    "methods": [
      "POST",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "SalesOrder",
    "endpoint": "SalesOrderLines",
    "url": "/api/v1/{division}/salesorder/SalesOrderLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "SalesOrder",
    "endpoint": "SalesOrders",
    "url": "/api/v1/{division}/salesorder/SalesOrders",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "Subscription",
    "endpoint": "SubscriptionLines",
    "url": "/api/v1/{division}/subscription/SubscriptionLines",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Sales contracts",
  },
  {
    "service": "Subscription",
    "endpoint": "SubscriptionLineTypes",
    "url": "/api/v1/{division}/subscription/SubscriptionLineTypes",
    "methods": [
      "GET",
    ],
    "scope": "Sales contracts",
  },
  {
    "service": "Subscription",
    "endpoint": "SubscriptionReasonCodes",
    "url": "/api/v1/{division}/subscription/SubscriptionReasonCodes",
    "methods": [
      "GET",
    ],
    "scope": "Sales contracts",
  },
  {
    "service": "Subscription",
    "endpoint": "SubscriptionRestrictionEmployees",
    "url": "/api/v1/{division}/subscription/SubscriptionRestrictionEmployees",
    "methods": [
      "GET",
      "POST",
      "DELETE",
    ],
    "scope": "Sales contracts",
  },
  {
    "service": "Subscription",
    "endpoint": "SubscriptionRestrictionItems",
    "url": "/api/v1/{division}/subscription/SubscriptionRestrictionItems",
    "methods": [
      "GET",
      "POST",
      "DELETE",
    ],
    "scope": "Sales contracts",
  },
  {
    "service": "Subscription",
    "endpoint": "Subscriptions",
    "url": "/api/v1/{division}/subscription/Subscriptions",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Sales contracts",
  },
  {
    "service": "Subscription",
    "endpoint": "SubscriptionTypes",
    "url": "/api/v1/{division}/subscription/SubscriptionTypes",
    "methods": [
      "GET",
    ],
    "scope": "Sales contracts",
  },
  {
    "service": "Sync",
    "endpoint": "Cashflow/PaymentTerms",
    "url": "/api/v1/{division}/sync/Cashflow/PaymentTerms",
    "methods": [
      "GET",
    ],
    "scope": "Financial cashflow",
  },
  {
    "service": "Sync",
    "endpoint": "CRM/Accounts",
    "url": "/api/v1/{division}/sync/CRM/Accounts",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "Sync",
    "endpoint": "CRM/Addresses",
    "url": "/api/v1/{division}/sync/CRM/Addresses",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "Sync",
    "endpoint": "CRM/Contacts",
    "url": "/api/v1/{division}/sync/CRM/Contacts",
    "methods": [
      "GET",
    ],
    "scope": "Crm accounts",
  },
  {
    "service": "Sync",
    "endpoint": "CRM/Quotations",
    "url": "/api/v1/{division}/sync/CRM/Quotations",
    "methods": [
      "GET",
    ],
    "scope": "Crm quotes",
  },
  {
    "service": "Sync",
    "endpoint": "Deleted",
    "url": "/api/v1/{division}/sync/Deleted",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "Sync",
    "endpoint": "Documents/DocumentAttachments",
    "url": "/api/v1/{division}/sync/Documents/DocumentAttachments",
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Sync",
    "endpoint": "Documents/Documents",
    "url": "/api/v1/{division}/sync/Documents/Documents",
    "methods": [
      "GET",
    ],
    "scope": "Organization documents",
  },
  {
    "service": "Sync",
    "endpoint": "Financial/GLAccounts",
    "url": "/api/v1/{division}/sync/Financial/GLAccounts",
    "methods": [
      "GET",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Sync",
    "endpoint": "Financial/GLClassifications",
    "url": "/api/v1/{division}/sync/Financial/GLClassifications",
    "methods": [
      "GET",
    ],
    "scope": "Financial generalledgers",
  },
  {
    "service": "Sync",
    "endpoint": "Financial/TransactionLines",
    "url": "/api/v1/{division}/sync/Financial/TransactionLines",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Sync",
    "endpoint": "Logistics/Items",
    "url": "/api/v1/{division}/sync/Logistics/Items",
    "methods": [
      "GET",
    ],
    "scope": "Logistics items",
  },
  {
    "service": "Sync",
    "endpoint": "Logistics/SalesItemPrices",
    "url": "/api/v1/{division}/sync/Logistics/SalesItemPrices",
    "methods": [
      "GET",
    ],
    "scope": "Sales prices",
  },
  {
    "service": "Sync",
    "endpoint": "SalesInvoice/SalesInvoices",
    "url": "/api/v1/{division}/sync/SalesInvoice/SalesInvoices",
    "methods": [
      "GET",
    ],
    "scope": "Sales invoices",
  },
  {
    "service": "Sync",
    "endpoint": "SalesOrder/GoodsDeliveries",
    "url": "/api/v1/{division}/sync/SalesOrder/GoodsDeliveries",
    "methods": [
      "GET",
    ],
    "scope": "Logistics wms",
  },
  {
    "service": "Sync",
    "endpoint": "SalesOrder/GoodsDeliveryLines",
    "url": "/api/v1/{division}/sync/SalesOrder/GoodsDeliveryLines",
    "methods": [
      "GET",
    ],
    "scope": "Logistics wms",
  },
  {
    "service": "Sync",
    "endpoint": "SalesOrder/SalesOrders",
    "url": "/api/v1/{division}/sync/SalesOrder/SalesOrders",
    "methods": [
      "GET",
    ],
    "scope": "Sales orders",
  },
  {
    "service": "System",
    "endpoint": "AccountantInfo",
    "url": "/api/v1/{division}/system/AccountantInfo",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "System",
    "endpoint": "AllDivisions",
    "url": "/api/v1/{division}/system/AllDivisions",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "System",
    "endpoint": "AvailableFeatures",
    "url": "/api/v1/{division}/system/AvailableFeatures",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "System",
    "endpoint": "Divisions",
    "url": "/api/v1/{division}/system/Divisions",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "System",
    "endpoint": "GetMostRecentlyUsedDivisions",
    "url": "/api/v1/{division}/system/GetMostRecentlyUsedDivisions",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "System",
    "endpoint": "Me",
    "url": "/api/v1/current/Me",
    "methods": [
      "GET",
    ],
    "scope": "-",
  },
  {
    "service": "System",
    "endpoint": "Users",
    "url": "/api/v1/system/Users",
    "methods": [
      "GET",
      "POST",
      "PUT",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "Users",
    "endpoint": "UserHasRights",
    "url":
      '<a href="HlpRestAPIResourcesDetails.aspx?name=UsersUserHasRights" target="_blank">UserHasRights - Function Details</a>',
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "Users",
    "endpoint": "UserRoles",
    "url": "/api/v1/{division}/users/UserRoles",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "Users",
    "endpoint": "UserRolesPerDivision",
    "url": "/api/v1/{division}/users/UserRolesPerDivision",
    "methods": [
      "GET",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "VAT",
    "endpoint": "VATCodes",
    "url": "/api/v1/{division}/vat/VATCodes",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "VAT",
    "endpoint": "VatPercentages",
    "url": "/api/v1/{division}/vat/VatPercentages",
    "methods": [
      "GET",
    ],
    "scope": "Financial accounting",
  },
  {
    "service": "Webhooks",
    "endpoint": "WebhookSubscriptions",
    "url": "/api/v1/{division}/webhooks/WebhookSubscriptions",
    "methods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    "scope": "Organization administration",
  },
  {
    "service": "Workflow",
    "endpoint": "RequestAttachments",
    "url": "/api/v1/beta/{division}/workflow/RequestAttachments",
    "methods": [
      "GET",
    ],
    "scope": "Organization workflow",
  },
] as const;

export default endpoints;
