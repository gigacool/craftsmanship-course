// ============================================
// NAMING: Meaningful Names Reveal Intent
// ============================================
// Good names make code self-documenting and eliminate the need
// for comments. Names should clearly express what something is or does.

// ❌ BAD: Cryptic, abbreviated names
// Problems:
// - What does "X" represent? What does "DoIt" do?
// - What is "O"? Impossible to understand without reading implementation
// - Forces developers to constantly look up what things mean
// - Makes code review and maintenance difficult
public class X {
    private int d;  // What is 'd'? Days? Distance? Data?
    private List<O> os;  // What are these?

    public void DoIt(O o) {
        // What is being done here?
        // Without reading the code, you have no idea
    }

    public int Calc() {  // Calculate what?
        return d * 2;
    }
}

// Usage reveals nothing:
// X x = new X();
// x.DoIt(o);  // What is happening here?


// ✅ GOOD: Descriptive, intention-revealing names
// Benefits:
// - Immediately clear what the class does
// - Method names describe the action
// - Parameter types and names provide context
// - Code reads like natural language
public class OrderProcessor {
    private int processingTimeInMinutes;
    private List<Order> pendingOrders;

    public void ProcessOrder(Order order) {
        ValidateOrder(order);
        CalculateTotals(order);
        ApplyDiscounts(order);
        SubmitToPaymentGateway(order);
    }

    public int CalculateEstimatedDeliveryDays() {
        return processingTimeInMinutes / (24 * 60);
    }
}

// Usage is self-explanatory:
// OrderProcessor processor = new OrderProcessor();
// processor.ProcessOrder(customerOrder);  // Clear what's happening!


// ============================================
// More Naming Examples
// ============================================

// ❌ BAD: Non-descriptive names
public class DataManager {
    public void Process(object data) { }  // Too generic
    public object Get(int id) { }  // Get what?
    public void Update(object obj) { }  // Update what?
}

// ✅ GOOD: Specific, descriptive names
public class CustomerRepository {
    public void SaveCustomer(Customer customer) { }
    public Customer GetCustomerById(int customerId) { }
    public void UpdateCustomerAddress(Customer customer, Address newAddress) { }
}


// ============================================
// NAMING RULES:
// ============================================
// 1. Classes: Use nouns (Customer, OrderProcessor, PaymentGateway)
// 2. Methods: Use verbs (ProcessOrder, CalculateTotal, ValidateInput)
// 3. Booleans: Use is/has/can prefix (isValid, hasPermission, canDelete)
// 4. Avoid abbreviations unless they're universally understood (HTTP, URL, ID)
// 5. Be specific: Not "Manager" or "Handler", but what does it manage/handle?
// 6. Use searchable names: Avoid single letters except for loop counters
//
// Remember: Code is read far more often than it's written.
// Spend time choosing good names - your future self will thank you!

