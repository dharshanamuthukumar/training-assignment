"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateTotal(order) {
    let total = 0;
    for (const item of order.items) {
        total += item.product.price * item.quantity;
    }
    return total;
}
const order = {
    id: "ORD001",
    customer: "Alice Johnson",
    items: [
        {
            product: {
                id: "P001",
                name: "Laptop",
                price: 60000,
                category: "Electronics",
            },
            quantity: 1,
        },
        {
            product: {
                id: "P002",
                name: "Mouse",
                price: 1000,
                category: "Accessories",
            },
            quantity: 2,
        },
    ],
    shippingAddress: {
        street: "12 MG Road",
        city: "Chennai",
        state: "Tamil Nadu",
        country: "India",
        postalCode: "600001",
    },
    status: "pending",
    createdAt: new Date(),
};
console.log("Customer:", order.customer);
console.log("Order Status:", order.status);
console.log("Total Amount: ₹" + calculateTotal(order));
/*
Recursive Types

An interface can reference itself. This is called a recursive type.

Example:

interface TreeNode {
  value: string;
  children: TreeNode[];
}

Each TreeNode can contain an array of other TreeNode objects,
allowing us to represent tree-like structures such as folders,
organization charts, or family trees.
*/
//# sourceMappingURL=order.js.map