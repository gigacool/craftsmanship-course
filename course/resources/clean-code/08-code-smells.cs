// ============================================
// CODE SMELL: Rigidity (Hard to Change)
// ============================================
// Rigid code is difficult to modify or extend. Every change requires
// modifications to multiple places. This violates the Open/Closed Principle.

// ❌ BAD: Rigid design - hard-coded to specific data sources
// Problems:
// - Adding a new data source (JSON, XML, API) requires modifying the class
// - Each data source needs its own method
// - Cannot easily add new sources without changing existing code
// - Tight coupling to specific implementations (Database, CsvFile)
// - Violates Open/Closed Principle: not open for extension, only modification
public class ReportGeneratorRigid {
    public string GenerateFromDatabase(Database db) {
        // Fetch data from database
        string data = db.Query("SELECT * FROM reports");
        // Format and return report
        return FormatReport(data);
    }

    public string GenerateFromCsv(CsvFile csv) {
        // Read CSV file
        string data = csv.ReadAll();
        // Format and return report
        return FormatReport(data);
    }

    // What if we need to add JSON? API? XML? Excel?
    // We'd have to modify this class every single time!
    // public string GenerateFromJson(JsonFile json) { }
    // public string GenerateFromApi(ApiClient api) { }
    // public string GenerateFromXml(XmlFile xml) { }

    private string FormatReport(string data) {
        return "Report: " + data;
    }
}

// Usage shows the rigidity:
// var generator = new ReportGeneratorRigid();
// var report1 = generator.GenerateFromDatabase(db);
// var report2 = generator.GenerateFromCsv(csv);
// // Now we need JSON support... time to modify the class again!


// ✅ GOOD: Flexible design using abstraction
// Benefits:
// - Easy to add new data sources without modifying existing code
// - Single method works with any data source
// - Loose coupling through interface
// - Follows Open/Closed Principle: open for extension, closed for modification
// - More testable: can easily mock IDataSource
public interface IDataSource {
    string FetchData();
}

public class DatabaseSource : IDataSource {
    private readonly Database database;

    public DatabaseSource(Database database) {
        this.database = database;
    }

    public string FetchData() {
        return database.Query("SELECT * FROM reports");
    }
}

public class CsvSource : IDataSource {
    private readonly CsvFile csvFile;

    public CsvSource(CsvFile csvFile) {
        this.csvFile = csvFile;
    }

    public string FetchData() {
        return csvFile.ReadAll();
    }
}

// Adding a new source is easy - no need to modify ReportGenerator!
public class JsonSource : IDataSource {
    private readonly JsonFile jsonFile;

    public JsonSource(JsonFile jsonFile) {
        this.jsonFile = jsonFile;
    }

    public string FetchData() {
        return jsonFile.Parse();
    }
}

public class ApiSource : IDataSource {
    private readonly ApiClient apiClient;
    private readonly string endpoint;

    public ApiSource(ApiClient apiClient, string endpoint) {
        this.apiClient = apiClient;
        this.endpoint = endpoint;
    }

    public string FetchData() {
        return apiClient.Get(endpoint);
    }
}

public class ReportGenerator {
    public string Generate(IDataSource source) {
        string data = source.FetchData();
        return FormatReport(data);
    }

    private string FormatReport(string data) {
        return "Report: " + data;
    }
}

// Usage shows the flexibility:
// var generator = new ReportGenerator();
// var report1 = generator.Generate(new DatabaseSource(db));
// var report2 = generator.Generate(new CsvSource(csv));
// var report3 = generator.Generate(new JsonSource(json));
// var report4 = generator.Generate(new ApiSource(api, "/data"));
// No changes to ReportGenerator needed!


// ============================================
// RECOGNIZING AND FIXING RIGIDITY:
// ============================================
// Signs of rigidity:
// 1. Many methods doing similar things with different types
// 2. Adding features requires changing existing code
// 3. Lots of conditional logic based on types
// 4. Hard-coded dependencies
//
// How to fix rigidity:
// 1. Extract interfaces/abstractions
// 2. Use dependency injection
// 3. Apply the Strategy pattern
// 4. Follow the Open/Closed Principle
// 5. Program to interfaces, not implementations
//
// Remember: Good software should be easy to change.
// If adding a feature requires modifying many existing classes,
// your design is too rigid!


