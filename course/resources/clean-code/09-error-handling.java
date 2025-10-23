// ============================================
// ERROR HANDLING: Proper Exception Management
// ============================================
// Good error handling makes software more robust and maintainable.
// Never swallow exceptions silently - always handle them appropriately.

// ❌ WORST: Empty catch block (swallowing exceptions)
// Problems:
// - Errors disappear silently
// - Impossible to debug when things go wrong
// - User has no idea what happened
// - System may be in an invalid state
// - This is one of the WORST code smells!
try {
    processFile(file);
} catch (IOException e) {
    // Empty catch block - THE CARDINAL SIN OF ERROR HANDLING!
    // If this fails, no one will ever know why
}
// NEVER DO THIS! At minimum, log the error!


// ❌ BAD: Only printing stack trace
// Problems:
// - Stack trace goes to console, not production logs
// - No context about what was being attempted
// - Catching Exception is too broad (catches everything)
// - Processing continues as if nothing happened
// - User gets no feedback about the failure
try {
    processFile(file);
} catch (Exception e) {
    e.printStackTrace();  // Better than nothing, but still inadequate
}
// This might be OK for debugging, but not for production code!


// ✅ BETTER: Proper logging and re-throwing with context
// Benefits:
// - Error is logged with context
// - Specific exception type is caught
// - Exception is wrapped and re-thrown with business-level message
// - Caller can handle the error appropriately
// - Stack trace is preserved
try {
    processFile(file);
} catch (IOException e) {
    logger.error("Failed to process file: " + file.getName(), e);
    throw new FileProcessingException("Unable to process file: " + file.getName(), e);
}
// Now developers and operators have the information they need!


// ✅ BEST: Robust error handling with retry logic
// Benefits:
// - Handles transient failures (network issues, temporary locks, etc.)
// - Provides feedback on progress
// - Logs detailed information about failures
// - Only gives up after multiple attempts
// - Preserves original exception in the final throw
private static final int MAX_RETRIES = 3;
private static final long RETRY_DELAY_MS = 1000;

public void processFileWithRetry(File file) throws FileProcessingException {
    int attempt = 0;

    while (attempt < MAX_RETRIES) {
        try {
            logger.info("Processing file: {} (attempt {}/{})",
                       file.getName(), attempt + 1, MAX_RETRIES);

            processFile(file);

            logger.info("Successfully processed file: {}", file.getName());
            return; // Success! Exit the method

        } catch (IOException e) {
            attempt++;

            if (attempt == MAX_RETRIES) {
                // Final attempt failed - log and throw
                logger.error("Failed to process file '{}' after {} attempts",
                           file.getName(), MAX_RETRIES, e);
                throw new FileProcessingException(
                    "Unable to process file '" + file.getName() +
                    "' after " + MAX_RETRIES + " attempts", e);
            }

            // Not the final attempt - log warning and retry
            logger.warn("Attempt {}/{} failed for file '{}', retrying in {}ms",
                       attempt, MAX_RETRIES, file.getName(), RETRY_DELAY_MS, e);

            // Wait before retrying
            try {
                Thread.sleep(RETRY_DELAY_MS);
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt(); // Preserve interrupt status
                throw new FileProcessingException(
                    "File processing interrupted", ie);
            }
        }
    }
}


// ============================================
// Advanced Error Handling Patterns
// ============================================

// ✅ GOOD: Using try-with-resources for automatic cleanup
// Benefits:
// - Resources are always closed, even if exceptions occur
// - No need for finally blocks
// - Cleaner, more concise code
public void processFileWithResources(File file) throws FileProcessingException {
    try (FileInputStream fis = new FileInputStream(file);
         BufferedReader reader = new BufferedReader(new InputStreamReader(fis))) {

        String line;
        while ((line = reader.readLine()) != null) {
            processLine(line);
        }

    } catch (IOException e) {
        logger.error("Failed to read file: {}", file.getName(), e);
        throw new FileProcessingException("Unable to read file: " + file.getName(), e);
    }
    // Resources are automatically closed here, even if an exception occurred!
}


// ✅ GOOD: Validation with meaningful error messages
// Benefits:
// - Fails fast with clear messages
// - Prevents invalid state
// - Easy to understand what went wrong
public void processOrder(Order order) throws OrderValidationException {
    if (order == null) {
        throw new OrderValidationException("Order cannot be null");
    }

    if (order.getItems() == null || order.getItems().isEmpty()) {
        throw new OrderValidationException(
            "Order " + order.getId() + " has no items");
    }

    if (order.getCustomer() == null) {
        throw new OrderValidationException(
            "Order " + order.getId() + " has no customer information");
    }

    if (order.getTotal() <= 0) {
        throw new OrderValidationException(
            "Order " + order.getId() + " has invalid total: " + order.getTotal());
    }

    // Process the valid order...
}


// ============================================
// ERROR HANDLING PRINCIPLES:
// ============================================
// 1. NEVER use empty catch blocks
// 2. Catch specific exceptions, not generic Exception
// 3. Always log errors with context
// 4. Provide meaningful error messages
// 5. Don't expose internal details to users
// 6. Use try-with-resources for automatic resource cleanup
// 7. Fail fast: validate inputs early
// 8. Preserve exception information when re-throwing
// 9. Consider retry logic for transient failures
// 10. Don't use exceptions for flow control
//
// Remember: Good error handling is not optional.
// It's the difference between a professional application
// and one that fails mysteriously in production!
