import ExactRepository from "../repositories/ExactRepository.ts";

export default class ExactTransactionService {
  #exactRepo;

  constructor(exactRepo: ExactRepository) {
    this.#exactRepo = exactRepo;
  }

  async getTransactions(accountDescription: string, year: number) {
    console.log(`Getting '${accountDescription}'.`);
    const accounts = await this.#exactRepo.getAccounts(accountDescription, 1);

    if (!accounts.length) {
      throw new TypeError(`Failed to get account for '${accountDescription}'.`);
    }

    return this.#exactRepo.getTransactionLines(accounts[0].ID, year);
  }
}
