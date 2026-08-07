/*
Behavioral Pattern Audit

File reviewed: AddInternForm.tsx

1. Is there any object that directly calls methods on multiple other objects
   in response to a state change?
   → Possible Observer problem? No
   Reason:
   The component mainly updates React state and renders UI.
   It does not notify multiple independent objects after a state change.

2. Is there any function or method with a growing if/else block that selects
   different behaviour based on a type, mode, or string value?
   → Possible Strategy problem? Yes
   Reason:
   Form validation and submission logic could grow with multiple validation
   rules or submission modes. Different validation strategies could be
   extracted into separate classes or functions.

3. Rule of three check:
   - Observer:
     No. The same notification logic does not appear repeatedly.
   - Strategy:
     Yes. If validation or submission modes continue growing,
     Strategy would simplify the design.

4. If a pattern fits:
   Validation logic could be extracted into different validation strategies,
   while the form simply delegates validation to the selected strategy.

5. If no pattern fits:
   For small components with only one validation rule,
   simple functions are easier and a design pattern would add unnecessary complexity.
*/

// ======================================================
// Observer Base Classes
// ======================================================

interface Observer {
  update(data: unknown): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  protected notify(data: unknown): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// ======================================================
// Task 3.1
// ======================================================

type PriceChangeEvent = {
  product: string;
  oldPrice: number;
  newPrice: number;
};

class PricingEngine extends Subject {
  updatePrice(product: string, oldPrice: number, newPrice: number): void {
    this.notify({
      product,
      oldPrice,
      newPrice,
    });
  }
}

class DiscountAlertObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent;

    const percentage =
      ((event.oldPrice - event.newPrice) / event.oldPrice) * 100;

    if (percentage > 10) {
      console.log(
        `[Discount] ${event.product} dropped by ${percentage.toFixed(1)}% — alert sent`,
      );
    }
  }
}

class PriceHistoryObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent;

    console.log(
      `[History] ${event.product}: ${event.oldPrice} -> ${event.newPrice}`,
    );
  }
}

class BudgetTrackerObserver implements Observer {
  private threshold = 2000;

  update(data: unknown): void {
    const event = data as PriceChangeEvent;

    if (event.oldPrice >= this.threshold && event.newPrice < this.threshold) {
      console.log(
        `[Budget] ${event.product} is now under budget at ${event.newPrice}`,
      );
    }
  }
}

// ======================================================
// Testing
// ======================================================

const engine = new PricingEngine();

engine.subscribe(new DiscountAlertObserver());
engine.subscribe(new PriceHistoryObserver());
engine.subscribe(new BudgetTrackerObserver());

engine.updatePrice("Monitor", 18999, 14999);

engine.updatePrice("Keyboard", 2499, 1999);

engine.updatePrice("Mouse", 899, 849);

/*
Task 3.1 Comment

Monitor (18999 -> 14999)

- DiscountAlertObserver:
  Fired because the price dropped by more than 10%.

- PriceHistoryObserver:
  Fired because it records every price change.

- BudgetTrackerObserver:
  Did NOT fire because the new price (14999)
  is still above the 2000 budget threshold.


Keyboard (2499 -> 1999)

- DiscountAlertObserver:
  Fired because the price dropped by about 20%.

- PriceHistoryObserver:
  Fired because it records every price change.

- BudgetTrackerObserver:
  Fired because the product crossed below
  the 2000 threshold.


Mouse (899 -> 849)

- DiscountAlertObserver:
  Did NOT fire because the price dropped by
  less than 10%.

- PriceHistoryObserver:
  Fired because it records every price change.

- BudgetTrackerObserver:
  Did NOT fire because the product was already
  below the budget threshold before the update.
*/
