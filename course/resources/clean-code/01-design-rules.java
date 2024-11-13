// polymorphism

class Shape {
    double radius;
    double side;

    public double area(String shapeType) {
        if (shapeType.equals("circle")) {
            return Math.PI * radius * radius;
        } else if (shapeType.equals("square")) {
            return side * side;
        }
        return 0;
    }
}

//  vs

interface IShape {
    double area();
}

class Circle implements IShape {
    private double radius;
    public Circle(double radius) { this.radius = radius; }
    public double area() { return Math.PI * radius * radius; }
}

class Square implements IShape {
    private double side;
    public Square(double side) { this.side = side; }
    public double area() { return side * side; }
}
