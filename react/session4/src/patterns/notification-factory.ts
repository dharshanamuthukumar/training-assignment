// Task 2.3 — Notification Factory
// Reflection:
// To support SlackNotifier, I only modified three existing places:
// 1. Added a new SlackNotifier class.
// 2. Added one new case ("slack") in createNotifier().
// 3. Added "slack" to the channels array.
//
// The existing notification classes and the send() loop did not need any
// structural changes. This demonstrates that the Factory pattern follows the
// Open/Closed Principle: the system is open for extension but closed for
// modification. New notification types can be added with minimal impact on
// existing code.

interface Notifier {
  send(recipient: string, message: string): void;
}

class EmailNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Email] To: ${recipient} — ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[SMS] To: ${recipient} — ${message}`);
  }
}

class PushNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Push] To: ${recipient} — ${message}`);
  }
}

class SlackNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Slack] To: ${recipient} — ${message}`);
  }
}

function createNotifier(channel: string): Notifier {
  switch (channel.toLowerCase()) {
    case "email":
      return new EmailNotifier();

    case "sms":
      return new SMSNotifier();

    case "push":
      return new PushNotifier();

    case "slack":
      return new SlackNotifier();

    default:
      throw new Error(
        `createNotifier: unknown channel '${channel}', expected one of: email, sms, push, slack`,
      );
  }
}

// Test
const channels = ["email", "sms", "push", "slack"];

for (const channel of channels) {
  const notifier = createNotifier(channel);

  notifier.send("user@example.com", "Your order has been confirmed.");
}
