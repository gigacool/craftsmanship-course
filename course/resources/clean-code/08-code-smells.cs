// rigidity

public class ReportGenerator {
    public string GenerateFromDatabase(Database db) {
        // Generates report directly from the database
    }

    public string GenerateFromCsv(CsvFile csv) {
        // Generates report directly from a CSV file
    }
}


// vs

public interface IDataSource {
    string FetchData();
}

public class DatabaseSource : IDataSource {
    public string FetchData() {
        // Fetch data from the database
    }
}

public class CsvSource : IDataSource {
    public string FetchData() {
        // Fetch data from CSV file
    }
}

public class ReportGenerator {
    public string Generate(IDataSource source) {
        String data = source.FetchData();
        // process and generate report
    }
}


