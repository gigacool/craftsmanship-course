// vertical separation

public class Customer {
    public Customer(String name, int age) { this.name = name; this.age = age; }
    public String name;
    public int age;
    public String getName() { return name; }
    public int getAge() { return age; }
}

// vs

public class Customer {
    private String name;
    private int age;

    public Customer(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }
}
