// ============================================
// FUNCTION SIZING: Small Functions with Single Responsibility
// ============================================
// Functions should be small and do one thing well. This makes them
// easier to test, understand, maintain, and reuse.

// ❌ BAD: Large function doing multiple things
// Problems:
// - Hard to understand at a glance
// - Difficult to test individual steps
// - Magic numbers (0.9, 0.15, 100) lack context
// - Hard to reuse individual pieces
// - Mixed levels of abstraction
function processOrder(order: Order) {
    // Validate order
    if (!order.isValid) {
        throw new Error("Invalid order");
    }

    // Apply discounts
    if (order.customer.isPremium) {
        order.total *= 0.9;  // What is 0.9? Why this number?
    }

    // Apply tax
    const taxRate = 0.15;  // Is this always 15%? Can it change by location?
    order.total += order.total * taxRate;

    // Send notification
    if (order.total > 100) {  // Why 100? What currency?
        sendNotification(order.customer, "High-value order received");
    }

    // Process payment
    processPayment(order);
}
// This function does: validation, discount calculation, tax calculation,
// notification, and payment processing. That's 5 responsibilities!


// ✅ BETTER: Breaking down into smaller functions
// Benefits:
// - Each function has one clear purpose
// - Magic numbers replaced with named constants
// - Easy to test each step independently
// - More readable: reads like a story
// - Easy to modify individual steps without affecting others
const PREMIUM_DISCOUNT_RATE = 0.9;  // 10% discount for premium customers
const STANDARD_TAX_RATE = 0.15;     // Standard tax rate (15%)
const HIGH_VALUE_THRESHOLD = 100;   // USD threshold for high-value notification

function validateOrder(order: Order): void {
    if (!order.isValid) {
        throw new Error("Invalid order");
    }
}

function applyDiscount(order: Order, discountRate: number): void {
    if (order.customer.isPremium) {
        order.total *= discountRate;
    }
}

function applyTax(order: Order, taxRate: number): void {
    order.total += order.total * taxRate;
}

function notifyCustomerIfHighValue(order: Order, threshold: number): void {
    if (order.total > threshold) {
        sendNotification(order.customer, "High-value order received");
    }
}

function processOrder(order: Order): void {
    validateOrder(order);
    applyDiscount(order, PREMIUM_DISCOUNT_RATE);
    applyTax(order, STANDARD_TAX_RATE);
    notifyCustomerIfHighValue(order, HIGH_VALUE_THRESHOLD);
    processPayment(order);
}
// Now processOrder reads like a high-level overview of what happens,
// and each step is independently testable and maintainable!


// ✅ EVEN BETTER: Separation of Concerns with Transaction Handling
// Benefits:
// - Transaction logic is separated from business logic
// - Easy to add error handling and recovery
// - Can use the same functions with or without transactions
// - Clear what happens on success vs failure
interface ITransaction {
    begin(): void;
    commit(): void;
    rollback(): void;
}

function processOrderWithTransaction(order: Order, transaction: ITransaction): void {
    try {
        transaction.begin();

        // Same business logic, but now with transactional safety
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


// ============================================
// KEY PRINCIPLES FOR FUNCTION SIZE:
// ============================================
// 1. Single Responsibility: Each function does ONE thing
// 2. Small Size: Aim for 5-15 lines (excluding braces/whitespace)
// 3. One Level of Abstraction: Don't mix high-level and low-level code
// 4. Descriptive Names: Name reveals what the function does
// 5. Few Parameters: Ideally 0-3 parameters (more suggests complexity)
// 6. No Side Effects: Function should do what its name suggests, nothing more
//
// Remember: Functions are like paragraphs in a book.
// Each paragraph should express one idea clearly and completely.
