import { colors, Figures, Input } from "../deps.ts";
import type { GenericSuggestionsOptions, InputKeys } from "../deps.ts";

export interface DebouncedInputOptions
  extends GenericSuggestionsOptions<string, string> {
  debounceTime?: number;
  update: (inputValue: string) => Promise<Iterable<string | number>>;

  minLength?: number;
  maxLength?: number;
  keys?: InputKeys;
}

export default class DebouncedInput extends Input {
  #debounceTime = 500;
  #suggestions: Set<string | number>;
  #lastCall = 0;
  #update: (inputValue: string) => Promise<Iterable<string | number>>;
  #lastInput: string | number | undefined = undefined;
  #inputRetrieved: Set<string> = new Set();
  #inFlight = false;

  public static prompt(options: DebouncedInputOptions): Promise<string> {
    return new this({
      ...options,
    }).prompt();
  }

  protected constructor(options: DebouncedInputOptions) {
    super({
      pointer: colors.blue(Figures.POINTER_SMALL),
      indent: " ",
      listPointer: colors.blue(Figures.POINTER),
      maxRows: 8,
      minLength: 0,
      maxLength: Infinity,
      ...options,
    });

    if (typeof options.debounceTime === "number") {
      this.#debounceTime = options.debounceTime;
    }

    this.#update = options.update;
    this.#suggestions = new Set(options.suggestions ?? []);
  }

  protected override input() {
    // Should latch this value, it can change before the update is completed.
    const val = this.inputValue;
    if (this.shouldUpdate(val)) {
      this.#inFlight = true;

      this.#update(this.inputValue).then((newSuggestions) => {
        for (const suggestion of newSuggestions) {
          this.#suggestions.add(suggestion);
        }

        this.settings.suggestions = Array.from(this.#suggestions);

        this.#lastCall = Date.now();
        this.#lastInput = this.inputValue;
        this.#inputRetrieved.add(val);
        this.#inFlight = false;
        this.render();
      });
    }

    return super.input();
  }

  protected shouldUpdate(newValue: string): boolean {
    if (this.#inFlight) {
      return false;
    }

    if (newValue === this.#lastInput) {
      return false;
    }

    if ((Date.now() - this.#lastCall) < this.#debounceTime) {
      return false;
    }

    if (this.#inputRetrieved.has(newValue)) {
      return false;
    }

    if (this.#suggestions.has(newValue)) {
      return false;
    }

    return true;
  }
}
