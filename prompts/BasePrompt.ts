import ExactRepository from "../repositories/ExactRepository.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import DatabaseSingleton from "../singletons/DatabaseSingleton.ts";
import ExactApiSingleton from "../singletons/ExactApiSingleton.ts";

export default abstract class BasePrompt {
  #db = DatabaseSingleton.getInstance();
  #settingRepo = new SettingRepository(this.#db);
  #api = ExactApiSingleton.getInstance(this.#settingRepo);
  #exactRepo: ExactRepository | undefined;

  get exactRepo(): ExactRepository {
    if (!this.#exactRepo) {
      throw new TypeError("Exact repository not set.");
    }

    return this.#exactRepo;
  }

  abstract run(): Promise<unknown>;

  protected ensureApi() {
    if (!this.#api) {
      throw new Error(
        "Cannot run prompt before Exact Api has been intialized.",
      );
    }

    this.#exactRepo = new ExactRepository(this.#api);
  }
}
