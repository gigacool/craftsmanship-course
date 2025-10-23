// ============================================
// CODE STRUCTURE: Vertical Formatting and Organization
// ============================================
// Code should be organized to be easy to read from top to bottom,
// like reading a newspaper article. Use whitespace and structure
// to make the code flow naturally.

// ❌ BAD: No vertical separation, everything cramped
// Problems:
// - Hard to distinguish between fields, constructor, and methods
// - Public fields break encapsulation
// - Everything on one line is hard to read
// - No clear visual boundaries between different parts
public class CustomerBad {
    public CustomerBad(String name, int age) { this.name = name; this.age = age; }
    public String name;
    public int age;
    public String getName() { return name; }
    public int getAge() { return age; }
}
// This looks like a mess! Where does one thing end and another begin?


// ✅ GOOD: Proper vertical separation and encapsulation
// Benefits:
// - Clear visual separation between sections
// - Fields are private (encapsulation)
// - Constructor is distinct and readable
// - Methods are easy to find
// - Follows the "newspaper" metaphor: high-level overview first
public class Customer {
    // Fields grouped together at the top
    private String name;
    private int age;

    // Constructor comes next (how to create the object)
    public Customer(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Public methods follow (what you can do with the object)
    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}


// ============================================
// More Structure Examples
// ============================================

// ❌ BAD: Random ordering, mixed concerns, no logical flow
public class OrderProcessorBad {
    public void processOrder(Order order) { /* ... */ }
    private int taxRate;
    public OrderProcessorBad() { this.taxRate = 15; }
    private void validateOrder(Order order) { /* ... */ }
    private String apiKey;
    public void setApiKey(String key) { this.apiKey = key; }
    private void calculateTotal(Order order) { /* ... */ }
}


// ✅ GOOD: Logical ordering with clear sections
// Follows the "stepdown rule": code reads like a narrative from top to bottom
public class OrderProcessor {
    // Constants at the very top
    private static final int DEFAULT_TAX_RATE = 15;

    // Instance fields
    private final int taxRate;
    private String apiKey;

    // Constructors
    public OrderProcessor() {
        this.taxRate = DEFAULT_TAX_RATE;
    }

    public OrderProcessor(int customTaxRate) {
        this.taxRate = customTaxRate;
    }

    // Public API methods (highest level of abstraction)
    public void processOrder(Order order) {
        validateOrder(order);
        calculateTotal(order);
        submitPayment(order);
    }

    public void setApiKey(String key) {
        this.apiKey = key;
    }

    // Private helper methods (implementation details)
    // Ordered by when they're called (following the narrative)
    private void validateOrder(Order order) {
        if (order == null || order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Invalid order");
        }
    }

    private void calculateTotal(Order order) {
        double subtotal = order.getSubtotal();
        double tax = subtotal * (taxRate / 100.0);
        order.setTotal(subtotal + tax);
    }

    private void submitPayment(Order order) {
        // Use apiKey to submit payment
        // Implementation details...
    }
}


// ============================================
// VERTICAL FORMATTING PRINCIPLES:
// ============================================
// 1. Related code should be vertically close together
// 2. Use blank lines to separate concepts
// 3. Order matters: public before private, high-level before low-level
// 4. The "newspaper metaphor": most important info at the top
// 5. Group related methods together
// 6. Keep vertically dense code (avoid excessive blank lines)
//
// Class Structure Order:
//   1. Static constants
//   2. Static variables
//   3. Instance variables (private first)
//   4. Constructors
//   5. Public methods (high-level operations)
//   6. Private helper methods (implementation details)
//
// This structure makes it easy to understand what a class does
// without having to read every line of code!
