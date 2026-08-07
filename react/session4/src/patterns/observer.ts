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
    this.observers.forEach((o) => o.update(data));
  }
}
// notify is protected so that only subclasses of Subject can notify observers.
// External code should not be able to trigger notifications directly.
//
// If notify were public, code like this would be possible:
//
// const subject = new Subject();
// subject.notify("Fake Update");
//
// This is undesirable because observers would receive notifications
// even though the subject's state never changed.
type Order = {
  id: string;
  customerEmail: string;
  total: number;
};
class OrderStore extends Subject {
  private orders: Order[] = [];

  placeOrder(order: Order): void {
    this.orders.push(order);
    this.notify(order);
  }

  cancelOrder(id: string): void {
    const index = this.orders.findIndex((order) => order.id === id);

    if (index !== -1) {
      const [order] = this.orders.splice(index, 1);
      this.notify({ cancelled: true, order });
    }
  }

  getOrders(): Order[] {
    return [...this.orders];
  }
}
class ShipmentQueue implements Observer {
  update(data: unknown): void {
    const order = data as Order;

    console.log(`[ShipmentQueue] scheduling delivery for ${order.id}`);
  }
}
class EmailService implements Observer {
  update(data: unknown): void {
    const order = data as Order;

    console.log(
      `[EmailService] sending confirmation to ${order.customerEmail}`,
    );
  }
}
class AuditLog implements Observer {
  update(data: unknown): void {
    const order = data as Order;

    console.log(
      `[AuditLog] recorded order ${order.id} at ${new Date().toISOString()}`,
    );
  }
}
class AnalyticsService implements Observer {
  update(data: unknown): void {
    const order = data as Order;

    console.log(
      `[AnalyticsService] tracking purchase event for order ${order.id}, value: ${order.total}`,
    );
  }
}
const store = new OrderStore();

const shipment = new ShipmentQueue();
const email = new EmailService();
const audit = new AuditLog();
const analytics = new AnalyticsService();
store.subscribe(shipment);
store.subscribe(email);
store.subscribe(audit);
store.subscribe(analytics);
store.placeOrder({
  id: "ORD-001",
  customerEmail: "alice@example.com",
  total: 1500,
});

store.placeOrder({
  id: "ORD-002",
  customerEmail: "bob@example.com",
  total: 800,
});
// I did not need to modify the OrderStore class to add AuditLog.
// I only created a new observer and subscribed it using store.subscribe(audit).
// This shows that the Observer Pattern is open for extension and closed for
// modification. New functionality can be added without changing the existing
// OrderStore implementation.
console.log("\n--- Unsubscribe AuditLog ---");

store.unsubscribe(audit);

store.placeOrder({
  id: "ORD-003",
  customerEmail: "carol@example.com",
  total: 200,
});
console.log("\n--- Re-subscribe AuditLog ---");

store.subscribe(audit);

store.placeOrder({
  id: "ORD-004",
  customerEmail: "david@example.com",
  total: 1200,
});
// Observers may be unsubscribed at runtime when they are no longer interested
// in receiving updates.
//
// Example 1:
// A user logs out of an application, so their notification observer is
// unsubscribed and they stop receiving real-time updates.
//
// Example 2:
// A dashboard or browser tab is closed, so its UI observer is unsubscribed
// to avoid unnecessary updates and memory usage.
store.placeOrder({
  id: "ORD-005",
  customerEmail: "eva@example.com",
  total: 2500,
});
// From reading placeOrder() alone, we cannot tell that four different
// actions happen because it only calls this.notify(order). The actual
// observers are hidden from the method, making the control flow less obvious.
//
// This becomes a problem in large applications where many observers are
// subscribed. It can be difficult to understand, debug, and trace what
// happens after an event is triggered.
//
// If the observer chain becomes very long, there is a performance cost
// because every observer is notified. It also becomes harder to identify
// which observer caused an error or slowdown.