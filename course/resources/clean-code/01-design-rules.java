// ============================================
// DESIGN PRINCIPLE: Polymorphism over Conditionals
// ============================================
// Clean code uses polymorphism to replace complex conditional logic,
// making code more maintainable and following the Open/Closed Principle.

// ❌ BAD: Using conditionals and type strings
// Problems:
// - All shapes share the same class with irrelevant fields
// - Adding a new shape requires modifying existing code
// - Easy to make mistakes (e.g., wrong shapeType string)
// - Fields like 'radius' are meaningless for squares
class ShapeBad {
    double radius;  // Only used for circles
    double side;    // Only used for squares

    public double area(String shapeType) {
        if (shapeType.equals("circle")) {
            return Math.PI * radius * radius;
        } else if (shapeType.equals("square")) {
            return side * side;
        }
        return 0;  // What does 0 mean? Error? Empty shape?
    }
}

// Example usage showing the problems:
// ShapeBad circle = new ShapeBad();
// circle.radius = 5.0;
// circle.side = 10.0;  // Meaningless for a circle, but nothing prevents this!
// double area = circle.area("circle");  // Easy to typo: "cirlce", "Circle", etc.


// ✅ GOOD: Using polymorphism with interfaces
// Benefits:
// - Each shape has only the fields it needs
// - Type safety: compiler catches errors
// - Easy to add new shapes without modifying existing code
// - Clear, self-documenting design
interface IShape {
    double area();
}

class Circle implements IShape {
    private final double radius;

    public Circle(double radius) {
        if (radius <= 0) {
            throw new IllegalArgumentException("Radius must be positive");
        }
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

class Square implements IShape {
    private final double side;

    public Square(double side) {
        if (side <= 0) {
            throw new IllegalArgumentException("Side must be positive");
        }
        this.side = side;
    }

    @Override
    public double area() {
        return side * side;
    }
}

// Adding a new shape is easy and doesn't require changing existing code
class Triangle implements IShape {
    private final double base;
    private final double height;

    public Triangle(double base, double height) {
        if (base <= 0 || height <= 0) {
            throw new IllegalArgumentException("Base and height must be positive");
        }
        this.base = base;
        this.height = height;
    }

    @Override
    public double area() {
        return 0.5 * base * height;
    }
}

// Example usage showing the benefits:
// IShape circle = new Circle(5.0);
// IShape square = new Square(10.0);
// IShape triangle = new Triangle(4.0, 6.0);
//
// List<IShape> shapes = Arrays.asList(circle, square, triangle);
// for (IShape shape : shapes) {
//     System.out.println("Area: " + shape.area());  // Polymorphism in action!
// }
