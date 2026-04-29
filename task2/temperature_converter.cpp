// ============================================================================
//  task2/temperature_converter.cpp
//  A clean, professional temperature converter (Celsius <-> Fahrenheit)
//  with input validation and clear console formatting.
//
//  Formulas:
//      F = (9.0 / 5.0) * C + 32.0
//      C = (5.0 / 9.0) * (F - 32.0)
// ============================================================================

#include <iostream>
#include <iomanip>
#include <limits>
#include <string>

// Convert Celsius to Fahrenheit.
double celsiusToFahrenheit(double celsius) {
    return (9.0 / 5.0) * celsius + 32.0;
}

// Convert Fahrenheit to Celsius.
double fahrenheitToCelsius(double fahrenheit) {
    return (5.0 / 9.0) * (fahrenheit - 32.0);
}

// Safely read a double value. Returns false if input is invalid.
bool readDouble(const std::string& prompt, double& out) {
    std::cout << prompt;
    std::cin >> out;
    if (std::cin.fail()) {
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        return false;
    }
    return true;
}

void printHeader() {
    std::cout << "===========================================" << '\n';
    std::cout << "     Temperature Converter (C <-> F)       " << '\n';
    std::cout << "===========================================" << '\n';
}

int main() {
    printHeader();

    std::cout << "Choose conversion direction:\n";
    std::cout << "  [C] Celsius    -> Fahrenheit\n";
    std::cout << "  [F] Fahrenheit -> Celsius\n";
    std::cout << "Your choice: ";

    char unit;
    std::cin >> unit;

    // Normalize the unit to uppercase.
    if (unit >= 'a' && unit <= 'z') {
        unit = static_cast<char>(unit - ('a' - 'A'));
    }

    if (unit != 'C' && unit != 'F') {
        std::cerr << "\n[ERROR] Invalid unit. Please enter 'C' or 'F'." << '\n';
        return 1;
    }

    double value = 0.0;
    if (!readDouble("Enter the temperature value: ", value)) {
        std::cerr << "\n[ERROR] Invalid numeric input." << '\n';
        return 1;
    }

    std::cout << std::fixed << std::setprecision(2);
    std::cout << "\n-------------------------------------------" << '\n';

    if (unit == 'C') {
        const double f = celsiusToFahrenheit(value);
        std::cout << "  " << value << " C  =  " << f << " F" << '\n';
    } else {
        const double c = fahrenheitToCelsius(value);
        std::cout << "  " << value << " F  =  " << c << " C" << '\n';
    }

    std::cout << "-------------------------------------------" << '\n';
    std::cout << "Done." << '\n';
    return 0;
}