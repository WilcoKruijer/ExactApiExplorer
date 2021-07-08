import type {
  AccountClassification,
  AccountClassificationMapping,
  IAccount,
  ODataGuid,
} from "../repositories/exact_models.d.ts";
import type {
  XMLBalance,
  YearlyReportingBalance,
} from "../services/ExactReportService.ts";

export type SimplifiedClassification = Pick<
  AccountClassification,
  "ID" | "Code" | "Description" | "PeriodType"
>;

export type AccountResult = Pick<
  YearlyReportingBalance,
  "Amount" | "AmountCredit" | "AmountDebit" | "BalanceType" | "Count"
>;

export interface AccountTreeItemBase {
  type: "account" | "classification";
}

export interface AccountTreeItemAccount extends AccountTreeItemBase {
  type: "account";
  account: IAccount;
  result?: AccountResult;
}

export interface AccountTreeItemClassification extends AccountTreeItemBase {
  type: "classification";
  classification: SimplifiedClassification;
  children: AccountTreeItem[];
}

export type AccountTreeItem =
  | AccountTreeItemAccount
  | AccountTreeItemClassification;
export type AccountTree = AccountTreeItem[];

export default class AccountTreeCreator {
  #tree: AccountTree = [];

  constructor(
    private classifications: AccountClassification[],
    private mapping: AccountClassificationMapping[],
  ) {
    this.create();
  }

  public static accountMappingToAccount(
    mapping: AccountClassificationMapping,
  ): IAccount {
    return {
      GLAccount: mapping.GLAccount,
      GLAccountCode: mapping.GLAccountCode,
      GLAccountDescription: mapping.GLAccountDescription,
    };
  }

  public static simplifyClassification(
    classification: AccountClassification,
  ): SimplifiedClassification {
    return {
      ID: classification.ID,
      Code: classification.Code,
      Description: classification.Description,
      PeriodType: classification.PeriodType,
    };
  }

  public static simplifyYearlyReportingBalance(
    yearlyBalance: Pick<
      YearlyReportingBalance,
      | "Amount"
      | "AmountCredit"
      | "AmountDebit"
      | "BalanceType"
      | "Count"
    >,
  ): AccountResult {
    return {
      Amount: yearlyBalance.Amount,
      AmountCredit: yearlyBalance.AmountCredit,
      AmountDebit: yearlyBalance.AmountDebit,
      BalanceType: yearlyBalance.BalanceType,
      Count: yearlyBalance.Count,
    };
  }

  /** Returns a copy of the tree.
   */
  public get tree(): AccountTree {
    return this.#tree.slice();
  }

  public addReportingBalancesToTree(
    yearlyBalances: Map<string, YearlyReportingBalance>,
  ) {
    for (const balance of yearlyBalances.values()) {
      const accountItem = this.findAccountInTree(
        (account) => account.GLAccount === balance.GLAccount,
      );

      if (!accountItem) {
        throw new TypeError(
          `Account '${balance.GLAccountDescription}' not found in tree.`,
        );
      }

      accountItem.result = AccountTreeCreator.simplifyYearlyReportingBalance(
        balance,
      );
    }
  }

  public addXMLBalancesToTree(
    balances: XMLBalance[],
  ) {
    for (const balance of balances) {
      const accountItem = this.findAccountInTree(
        (account) => account.GLAccountCode === balance.GLAccountCode,
      );

      if (!accountItem) {
        throw new TypeError(
          `Account '${balance.GLAccountDescription}' not found in tree.`,
        );
      }

      accountItem.result = AccountTreeCreator.simplifyYearlyReportingBalance(
        { Count: 0, ...balance },
      );
    }
  }

  private create() {
    this.createClassificationTree();
    this.addAccountsToClassifications();
  }

  private addAccountsToClassifications() {
    for (const accountMapping of this.mapping) {
      const parent = this.findParentInTree(accountMapping.Classification);

      if (!parent) {
        throw new TypeError(
          `Parent for '${accountMapping.GLAccountDescription}' not found in tree.`,
        );
      }

      parent.children.push({
        type: "account",
        account: AccountTreeCreator.accountMappingToAccount(accountMapping),
      });
    }
  }

  /**
   *
   * @param current the leave to search in
   * @param parent the guid we are looking for
   * @returns The parent of this leave. Null means the root of the tree is the
   *          parent. Undefined means the parent is not in the tree.
   */
  private findParentInTree(
    parent: ODataGuid | null,
    current: AccountTreeItem[] = this.#tree,
  ): AccountTreeItemClassification | null | undefined {
    if (parent === null) {
      if (current !== this.#tree) {
        throw new TypeError("Searching for parent 'null' in non-root.");
      }

      return null;
    }

    for (const treeItem of current) {
      if (treeItem.type !== "classification") {
        continue;
      }

      if (treeItem.classification.ID === parent) {
        return treeItem;
      }

      let result;
      if (
        typeof (result = this.findParentInTree(parent, treeItem.children)) !==
          "undefined"
      ) {
        return result;
      }
    }
  }

  private findAccountInTree(
    predicate: (acc: IAccount) => boolean,
    current: AccountTreeItem[] = this.#tree,
  ): AccountTreeItemAccount | undefined {
    for (const treeItem of current) {
      if (
        treeItem.type === "account" && predicate(treeItem.account)
      ) {
        return treeItem;
      }

      if (treeItem.type === "classification") {
        let result;
        if (
          typeof (result = this.findAccountInTree(
            predicate,
            treeItem.children,
          )) !== "undefined"
        ) {
          return result;
        }
      }
    }
  }

  private addClassificationToTree(
    classification: AccountClassification,
  ): AccountTreeItemClassification | null | undefined {
    const parent = this.findParentInTree(classification.Parent);

    if (typeof parent !== "undefined") {
      const childrenArray = parent === null ? this.#tree : parent.children;

      childrenArray.push({
        type: "classification",
        classification: AccountTreeCreator.simplifyClassification(
          classification,
        ),
        children: [],
      });

      return parent;
    }
  }

  private createClassificationTree() {
    let classificationsLeftToProcess: AccountClassification[] = this
      .classifications.splice(0);

    for (const c of classificationsLeftToProcess) {
      const parent = this.addClassificationToTree(c);

      if (typeof parent === "undefined") {
        // This classification was not added to the tree.
        this.classifications.push(c);
      }
    }

    classificationsLeftToProcess = this.classifications;

    if (this.classifications.length) {
      this.createClassificationTree();
    }
  }
}
