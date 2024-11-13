// function sizing

function processOrder(order: Order) {
    // Validate order
    if (!order.isValid) {
        throw new Error("Invalid order");
    }

    // Apply discounts
    if (order.customer.isPremium) {
        order.total *= 0.9;
    }

    // Apply tax
    const taxRate = 0.15;
    order.total += order.total * taxRate;

    // Send notification
    if (order.total > 100) {
        sendNotification(order.customer, "High-value order received");
    }

    // Process payment
    processPayment(order);
}

// vs

const PREMIUM_DISCOUNT_RATE = 0.9;  // 10% discount for premium customers
const STANDARD_TAX_RATE = 0.15;     // Standard tax rate
const HIGH_VALUE_THRESHOLD = 100; // Threshold for high-value order notification

function validateOrder(order: Order): void {
    if (!order.isValid) throw new Error("Invalid order");
}

function applyDiscount(order: Order, discountRate: number): void {
    if (order.customer.isPremium) order.total *= discountRate;
}

function applyTax(order: Order, taxRate: number): void {
    order.total += order.total * taxRate;
}

function notifyCustomerIfHighValue(order: Order, threshold: number): void {
    if (order.total > threshold) sendNotification(order.customer, "High-value order received");
}

function processOrder(order: Order): void {
    validateOrder(order);
    applyDiscount(order, PREMIUM_DISCOUNT_RATE);
    applyTax(order, STANDARD_TAX_RATE);
    notifyCustomerIfHighValue(order, HIGH_VALUE_THRESHOLD);  
    processPayment(order);
}

// vs...

interface ITransaction {
    begin(): void;
    commit(): void;
    rollback(): void;
}

function processOrderWithTransaction(order: Order, transaction: ITransaction): void {
    try {
        transaction.begin();

        validateOrder(order);
        applyDiscount(order, PREMIUM_DISCOUNT_RATE);
        applyTax(order, STANDARD_TAX_RATE);
        notifyCustomerIfHighValue(order, HIGH_VALUE_THRESHOLD);
        processPayment(order);

        transaction.commit();  // Commit if all steps succeed
    } catch (error) {
        transaction.rollback();  // Roll back if any step fails
        throw new Error("Order processing failed: " + error.message);
    }
}
