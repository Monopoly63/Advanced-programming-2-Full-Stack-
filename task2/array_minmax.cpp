// ============================================================================
//  task2/array_minmax.cpp
//  Dynamic array of random integers with a standalone find_min_max()
//  implemented using pointers. Demonstrates manual memory management
//  with new/delete.
// ============================================================================

#include <iostream>
#include <cstdlib>
#include <ctime>
#include <limits>

// Find the minimum and maximum of an integer array using pointer arithmetic.
// - arr:   pointer to the first element
// - size:  number of elements
// - outMin / outMax: output parameters (passed by reference)
void find_min_max(const int* arr, int size, int& outMin, int& outMax) {
    if (arr == nullptr || size <= 0) {
        outMin = 0;
        outMax = 0;
        return;
    }

    outMin = *arr;
    outMax = *arr;

    for (const int* p = arr + 1; p < arr + size; ++p) {
        if (*p < outMin) outMin = *p;
        if (*p > outMax) outMax = *p;
    }
}

// Print an array in a clean single-line format.
void printArray(const int* arr, int size) {
    std::cout << "[ ";
    for (int i = 0; i < size; ++i) {
        std::cout << arr[i];
        if (i + 1 < size) std::cout << ", ";
    }
    std::cout << " ]\n";
}

int main() {
    std::srand(static_cast<unsigned>(std::time(nullptr)));

    int size = 0;
    std::cout << "Enter array size: ";
    std::cin >> size;

    if (std::cin.fail() || size <= 0) {
        std::cerr << "[ERROR] Invalid size. Must be a positive integer.\n";
        return 1;
    }

    // Allocate dynamic array.
    int* arr = new int[size];

    // Fill with random integers in the range [-100, 100].
    for (int i = 0; i < size; ++i) {
        arr[i] = (std::rand() % 201) - 100;
    }

    std::cout << "\nGenerated array:\n";
    printArray(arr, size);

    int minVal = 0;
    int maxVal = 0;
    find_min_max(arr, size, minVal, maxVal);

    std::cout << "\n-------------------------\n";
    std::cout << " Min = " << minVal << '\n';
    std::cout << " Max = " << maxVal << '\n';
    std::cout << "-------------------------\n";

    // Release dynamic memory.
    delete[] arr;
    arr = nullptr;

    return 0;
}