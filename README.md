# Elementary Cellular Automaton in JavaScript

This project provides a basic implementation of an Elementary Cellular Automaton in JavaScript.

## What is an Elementary Cellular Automaton?

An Elementary Cellular Automaton is a simple type of cellular automaton. It consists of:

1.  **A 1D Grid of Cells**: Imagine a row of cells, where each cell can be in one of two states: **alive (1)** or **dead (0)**.
2.  **Neighborhood**: The state of a cell in the next generation depends on its own state and the state of its immediate left and right neighbors in the current generation. This forms a 3-cell neighborhood.
3.  **Rules**: There are $2^3 = 8$ possible patterns for a 3-cell neighborhood (e.g., `111`, `110`, `101`, ..., `000`). For each of these 8 patterns, a rule specifies whether the central cell will be alive (1) or dead (0) in the next generation.
4.  **Rule Numbering (Wolfram Code)**: Since there are 8 possible outcomes (one for each neighborhood pattern), and each outcome can be 0 or 1, there are $2^8 = 256$ possible rules. These rules are numbered from 0 to 255. The rule number's 8-bit binary representation defines the outcome for each neighborhood. For example, Rule 30 is `00011110` in binary. This means:
    * `111` -> `0`
    * `110` -> `0`
    * `101` -> `0`
    * `100` -> `1`
    * `011` -> `1`
    * `010` -> `1`
    * `001` -> `1`
    * `000` -> `0`
    (Note: The implementation maps these slightly differently to array indices, but the principle is the same).

5.  **Generations**: The automaton evolves in discrete time steps called generations. All cells are updated simultaneously based on the rule.
6.  **Boundary Conditions**: This implementation uses **periodic boundary conditions**, meaning the grid wraps around. The left neighbor of the first cell is the last cell, and the right neighbor of the last cell is the first cell.

## Implemented Rule

This code allows you to specify any of the 256 elementary rules by providing a **rule number** (0-255) when creating an instance of the `ElementaryCellularAutomaton` class.

Common interesting rules include:
* **Rule 30**: Produces complex, chaotic patterns.
* **Rule 90**: Generates a fractal pattern resembling the Sierpinski triangle.
* **Rule 110**: Famously proven to be Turing complete, meaning it can perform any computation.
* **Rule 184**: Can be used to model simple traffic flow.

## Files

* `cellular_automaton.js`: Contains the JavaScript class `ElementaryCellularAutomaton` and example usage.
* `index.html`: Open in browser console to see CA.

## How to Run the Code

1.  **Git clone the repository**
2.  **Option A: Open in a Browser Console**:
    * Open `index.html` in a web browser (like Chrome, Firefox, Edge).
    * Open the browser's developer console (usually by pressing `F12` or right-clicking on the page and selecting "Inspect" -> "Console"). You will see the output of the automaton printed there.

2.  **Option B: Run with Node.js**:
    * If you have Node.js installed, you can run the script directly from your terminal:
        ```bash
        node cellular_automaton.js
        ```
    * The output will be printed to your terminal.

## Customization

You can easily customize the automaton:

* **Change the Rule**: Modify the `rule` parameter in the `runAutomaton` function call (e.g., `runAutomaton(90, 50, 20);`).
* **Change the Width**: Modify the `width` parameter. This is the number of cells in each generation.
* **Change the Number of Generations**: Modify the `generations` parameter.

## Example Output (Rule 90, Width 50, 20 Generations)