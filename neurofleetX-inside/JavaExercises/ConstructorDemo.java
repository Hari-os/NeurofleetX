class Car {
    String brand;
    int year;

    Car(String b, int y) {
        brand = b;
        year = y;
    }

    void display() {
        System.out.println("Brand: " + brand + ", Year: " + year);
    }
}

public class ConstructorDemo {
    public static void main(String[] args) {
        Car c1 = new Car("Honda", 2024);
        c1.display();
    }
}
