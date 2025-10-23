// ============================================
// TESTING: Clear and Maintainable Tests
// ============================================
// Good tests are readable, focused, and use proper assertions.
// They serve as documentation and catch regressions effectively.

// ✅ GOOD: Clear test with descriptive name and proper assertion
// Benefits:
// - Test name clearly states what is being tested
// - Uses proper test framework assertions
// - Easy to understand what's expected
// - Failure messages are clear and helpful
test("should return true for valid email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
});

test("should return false for email without @ symbol", () => {
    expect(isValidEmail("testexample.com")).toBe(false);
});

test("should return false for email without domain", () => {
    expect(isValidEmail("test@")).toBe(false);
});


// ❌ BAD: Unclear test with manual error checking
// Problems:
// - Vague test name: "validate email" - what exactly are we validating?
// - Manual error throwing instead of using test framework
// - Generic error message provides no context
// - Harder to understand what's being tested
// - Doesn't follow testing conventions
test("should validate email", () => {
    const result = isValidEmail("test@example.com");
    if (result !== true) throw new Error("Email validation failed");
    // What was the expected value? What was the actual value?
});


// ============================================
// The AAA Pattern: Arrange, Act, Assert
// ============================================

// ✅ GOOD: Following the AAA pattern
test("should calculate total with tax correctly", () => {
    // Arrange: Set up test data
    const price = 100;
    const taxRate = 0.15;
    const expectedTotal = 115;

    // Act: Execute the function being tested
    const actualTotal = calculateTotal(price, taxRate);

    // Assert: Verify the result
    expect(actualTotal).toBe(expectedTotal);
});


// ❌ BAD: Everything mixed together
test("calculate total", () => {
    expect(calculateTotal(100, 0.15)).toBe(115);
    // Hard to modify, hard to debug, hard to understand
});


// ============================================
// Testing Edge Cases and Error Conditions
// ============================================

// ✅ GOOD: Testing both happy path and edge cases
describe("calculateTotal", () => {
    test("should calculate total with positive price and tax rate", () => {
        const result = calculateTotal(100, 0.15);
        expect(result).toBe(115);
    });

    test("should handle zero price", () => {
        const result = calculateTotal(0, 0.15);
        expect(result).toBe(0);
    });

    test("should throw error for negative price", () => {
        expect(() => calculateTotal(-10, 0.15)).toThrow("Price cannot be negative");
    });

    test("should throw error for invalid tax rate", () => {
        expect(() => calculateTotal(100, 1.5)).toThrow("Tax rate must be between 0 and 1");
    });

    test("should handle zero tax rate", () => {
        const result = calculateTotal(100, 0);
        expect(result).toBe(100);
    });
});


// ============================================
// Testing with Test Data Builders
// ============================================

// ✅ GOOD: Using test data builders for complex objects
class OrderBuilder {
    private order: Order = {
        id: "TEST-001",
        items: [],
        customer: { name: "Test User", isPremium: false },
        total: 0,
        isValid: true
    };

    withPremiumCustomer(): OrderBuilder {
        this.order.customer.isPremium = true;
        return this;
    }

    withTotal(total: number): OrderBuilder {
        this.order.total = total;
        return this;
    }

    withInvalidState(): OrderBuilder {
        this.order.isValid = false;
        return this;
    }

    build(): Order {
        return this.order;
    }
}

test("should apply discount for premium customers", () => {
    // Arrange: Build test data fluently
    const order = new OrderBuilder()
        .withPremiumCustomer()
        .withTotal(100)
        .build();

    // Act
    applyDiscount(order, 0.9);

    // Assert
    expect(order.total).toBe(90);
});

test("should throw error for invalid orders", () => {
    // Arrange
    const invalidOrder = new OrderBuilder()
        .withInvalidState()
        .build();

    // Act & Assert
    expect(() => validateOrder(invalidOrder)).toThrow("Invalid order");
});


// ============================================
// TEST WRITING PRINCIPLES:
// ============================================
// 1. Test names should describe what is being tested and expected behavior
// 2. Use the AAA pattern: Arrange, Act, Assert
// 3. One assertion per test (or closely related assertions)
// 4. Test both happy paths and edge cases
// 5. Use descriptive variable names in tests
// 6. Keep tests independent - no shared state
// 7. Tests should be fast and deterministic
// 8. Use test data builders for complex object creation
//
// Good test naming patterns:
//   - "should [expected behavior] when [condition]"
//   - "should throw [error] when [invalid condition]"
//   - "should return [value] for [input]"
//
// Remember: Tests are documentation. A new developer should be able
// to understand what your code does by reading your tests!
