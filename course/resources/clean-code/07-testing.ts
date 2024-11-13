// test clarity

test("should return true for valid email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
});

// vs

test("should validate email", () => {
    const result = isValidEmail("test@example.com");
    if (result !== true) throw new Error("Email validation failed");
});
