// ============================================================================
//  task2/shapes_library.cpp
//  A mini shapes library demonstrating OOP best practices in modern C++:
//   - Abstract base class Shape with pure virtual methods
//   - Derived classes: Circle, Rectangle, Triangle
//   - Polymorphism via std::unique_ptr<Shape>
//   - Custom exception InvalidShapeException
//   - operator<< overload for clean printing
// ============================================================================

#include <iostream>
#include <iomanip>
#include <memory>
#include <vector>
#include <string>
#include <stdexcept>
#include <cmath>

// --------------------------------------------------------------------------
// Custom exception thrown when a shape is constructed with invalid dimensions.
// --------------------------------------------------------------------------
class InvalidShapeException : public std::runtime_error {
public:
    explicit InvalidShapeException(const std::string& msg)
        : std::runtime_error(msg) {}
};

// --------------------------------------------------------------------------
// Abstract base class
// --------------------------------------------------------------------------
class Shape {
public:
    virtual ~Shape() = default;

    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual std::string name() const = 0;

    // Stream operator delegates to a polymorphic print().
    friend std::ostream& operator<<(std::ostream& os, const Shape& shape) {
        os << shape.name()
           << " { area = " << std::fixed << std::setprecision(3) << shape.area()
           << ", perimeter = " << shape.perimeter() << " }";
        return os;
    }
};

// --------------------------------------------------------------------------
// Circle
// --------------------------------------------------------------------------
class Circle : public Shape {
    double radius_;
public:
    explicit Circle(double radius) : radius_(radius) {
        if (radius <= 0.0) {
            throw InvalidShapeException("Circle: radius must be > 0");
        }
    }

    double area() const override {
        constexpr double kPi = 3.14159265358979323846;
        return kPi * radius_ * radius_;
    }

    double perimeter() const override {
        constexpr double kPi = 3.14159265358979323846;
        return 2.0 * kPi * radius_;
    }

    std::string name() const override { return "Circle"; }
};

// --------------------------------------------------------------------------
// Rectangle
// --------------------------------------------------------------------------
class Rectangle : public Shape {
    double width_;
    double height_;
public:
    Rectangle(double width, double height) : width_(width), height_(height) {
        if (width <= 0.0 || height <= 0.0) {
            throw InvalidShapeException("Rectangle: width and height must be > 0");
        }
    }

    double area() const override { return width_ * height_; }
    double perimeter() const override { return 2.0 * (width_ + height_); }
    std::string name() const override { return "Rectangle"; }
};

// --------------------------------------------------------------------------
// Triangle (by three side lengths, validated with the triangle inequality)
// --------------------------------------------------------------------------
class Triangle : public Shape {
    double a_;
    double b_;
    double c_;
public:
    Triangle(double a, double b, double c) : a_(a), b_(b), c_(c) {
        if (a <= 0.0 || b <= 0.0 || c <= 0.0) {
            throw InvalidShapeException("Triangle: all sides must be > 0");
        }
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw InvalidShapeException(
                "Triangle: sides do not satisfy the triangle inequality");
        }
    }

    double area() const override {
        // Heron's formula
        const double s = (a_ + b_ + c_) / 2.0;
        return std::sqrt(s * (s - a_) * (s - b_) * (s - c_));
    }

    double perimeter() const override { return a_ + b_ + c_; }
    std::string name() const override { return "Triangle"; }
};

// --------------------------------------------------------------------------
// Demo
// --------------------------------------------------------------------------
int main() {
    std::vector<std::unique_ptr<Shape>> shapes;

    try {
        shapes.emplace_back(std::make_unique<Circle>(5.0));
        shapes.emplace_back(std::make_unique<Rectangle>(4.0, 6.0));
        shapes.emplace_back(std::make_unique<Triangle>(3.0, 4.0, 5.0));
    } catch (const InvalidShapeException& ex) {
        std::cerr << "[ERROR] " << ex.what() << '\n';
        return 1;
    }

    std::cout << "=== Shapes Library Demo (polymorphism via unique_ptr) ===\n";
    for (const auto& shape : shapes) {
        std::cout << "  " << *shape << '\n';
    }

    std::cout << "\n--- Invalid shape handling demo ---\n";
    try {
        Triangle bad(1.0, 1.0, 10.0);  // violates triangle inequality
    } catch (const InvalidShapeException& ex) {
        std::cout << "Caught expected exception: " << ex.what() << '\n';
    }

    return 0;
}