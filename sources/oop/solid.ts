
// not S
class Employee {
    public calculateSalary (): number { /* code... */ }
    public hoursWorked (): number { /* code... */ }
    public storeToDB (): any { /* code... */ }
} 

// S
abstract class Employee {
    abstract calculateSalary (): number;
    abstract hoursWorked (): number;
    protected storeToDB ():any { /* code ... */ }
}

class Technical extends Employee {
    calculateSalary (): number { ….code }
    hoursWorked (): number {...code }
}
class Finance extends Employee {
    calculateSalary (): number {...code}
    hoursWorked (): number {..code}
}



class Rectangle {
    public Width (): number {/* code... */}
    public Height (): number {/* code... */}
}

class Circle {
    public Radius (): number {/* code... */}
}

class Area {
    public compute(shapes: any[]): number {
        return shapes.reduce((total, shape) => {
            if (shape instanceof Rectangle){
                let rectangle = (shape as Rectangle);
                return total + rectangle.Width() * rectangle.Height()
            }
            if (shape instanceof Circle){
                let circle = (shape as Circle);
                return total + circle.Radius() * circle.Radius() * Math.PI;
            }
        }

        , 0);
    }
}

abstract class Shape {
    public abstract area(): number;
}

class Rectangle extends Shape {
    public Width (): number {/* code... */}
    public Height (): number {/* code... */}
    public area(): number { /*...*/ }
}

class Circle extends Shape {
    public Radius (): number {/* code... */}
    public area(): number { /*...*/ }
}


abstract class Animal {
    public pet():void;
}

class Cat implements Animal {
    public pet():void { /* code ... */}
}

class Dog implements Animal {
    public pet():void { /* code ... */}
}

class Foo<T> {
    public bar(cat: Cat): number { /* code... */}
}

class Foo<T> {
    public bar(animal: Animal): number { /* code... */}
}



interface DoAll {
    public a():number;
    public b():number;
    public c():number;
    //...
    public z():number;
    public menage():number;
    public vaisselle():number;
    public lessive():number;
    public lessiveRapide():number;
    public lessiveFragile():number;
    public lessiveTresSale():number;
    public secheLinge():number;
    public cafe():number;
    public etPlus():number;
}

class doItAll implements DoAll {
    // good luck to users (and devs)
}

interface DoAtoC {
    public a():number;
    public b():number;
    public c():number;
}

// ...

interface Lessive {
    public lessive():number;
    public lessiveRapide():number;
    public lessiveFragile():number;
    public lessiveTresSale():number;
}

class doSome implements DoAtoC, DoDtoF, DoYtoZ {
    // code ...
}

class IPhone {
    public call(phoneNumber: number): void { /* code... */}
}

class PhoneOwner {
    public callFriend(phone: IPhone): void { /* code... */}
}

interface Phone {
    public call(phoneNumber: number): void;
}

class IPhone implements Phone {
    public call(phoneNumber: number): void { /* code... */}
}

class PhoneOwner {
    public callFriend(phone: Phone): void { /* code... */}
}


