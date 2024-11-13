// error handling

try {
    processFile(file);
} catch (IOException e) {
    // Empty catch block
}

// vs

try {
    processFile(file);
} catch (Exception e) {
    e.printStackTrace();
}

// vs

try {
    processFile(file);
} catch (IOException e) {
    logger.error("Failed to process file", e);
    throw new FileProcessingException("Unable to process file", e);
}

// vs

private static final int MAX_RETRIES = 3;

public void processFileWithRetry(File file) {
    int attempt = 0;
    while (attempt < MAX_RETRIES) {
        try {
            processFile(file);
            return; // Exit if successful
        } catch (IOException e) {
            attempt++;
            if (attempt == MAX_RETRIES) {
                logger.error("Failed to process file after " + MAX_RETRIES + " attempts", e);
                throw new FileProcessingException("Unable to process file after retries", e);
            }
            // Optional: wait a short time before retrying
            try { Thread.sleep(1000); } catch (InterruptedException ie) { /* handle interrupt */ }
        }
    }
}
