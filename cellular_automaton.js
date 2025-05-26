// Represents an Elementary Cellular Automaton.
class ElementaryCellularAutomaton {
    /**
     * Creates an instance of ElementaryCellularAutomaton.
     * @param {number} ruleNumber - the rule number (0-255) for the automaton
     * @param {number} width - the width of the automaton grid
     * @param {Array<number>} [initialGeneration=null] - The initial state of the cells. If null, a single '1' in the middle is used.
     */
    constructor(ruleNumber, width, initialGeneration = null) {
        if (ruleNumber < 0 || ruleNumber > 255) {
            throw new Error("Rule number must be between 0 and 255.");
        }
        if (width <= 0) {
            throw new Error("Width must be a positive integer.");
        }

        this.rule = this._getRuleArray(ruleNumber);
        this.width = width;
        this.generation = initialGeneration ? [...initialGeneration] : this._createInitialGeneration(width);

        // Ensure initial generation is the correct width
        if (this.generation.length !== this.width) {
            console.warn(`Initial generation length (${this.generation.length}) does not match width (${this.width}). Adjusting...`);
            if (this.generation.length < this.width) {
                const diff = this.width - this.generation.length;
                const padding = Array(Math.floor(diff / 2)).fill(0);
                this.generation = [...padding, ...this.generation, ...Array(diff - padding.length).fill(0)];
            } else {
                this.generation = this.generation.slice(0, this.width);
            }
        }
    }

    /**
     * Converts a rule number (0-255) into its binary representation array.
     * The binary representation determines the output of the CA for each
     * of the 8 possible 3-cell neighborhoods.
     * For example, rule 30 is 00011110 in binary.
     * The array is indexed such that:
     * rule[0] -> neighborhood 111
     * rule[1] -> neighborhood 110
     * ...
     * rule[7] -> neighborhood 000
     * @param {number} ruleNumber - The decimal rule number.
     * @returns {Array<number>} The rule as an array of 8 bits (0 or 1).
     * @private
     */
    _getRuleArray(ruleNumber) {
        return ruleNumber.toString(2).padStart(8, '0').split('').map(Number).reverse();
    }

    /**
     * Creates an initial generation with a single '1' in the middle.
     * @param {number} width - The width of the grid.
     * @returns {Array<number>} The initial generation.
     * @private
     */
    _createInitialGeneration(width) {
        const gen = Array(width).fill(0);
        gen[Math.floor(width / 2)] = 1;
        return gen;
    }

    /**
     * Calculates the next generation of cells based on the current generation and the rule.
     * It uses periodic boundary conditions (the grid wraps around).
     * @returns {Array<number>} the next generation
     */
    nextGeneration() {
        const nextGen = Array(this.width).fill(0);
        for (let i = 0; i < this.width; i++) {
            // Get the states of the left, middle, and right neighbors
            // Uses periodic boundary conditions:
            // If i is 0, left neighbor is the last cell (width - 1).
            // If i is width - 1, right neighbor is the first cell (0).
            const left = this.generation[(i - 1 + this.width) % this.width];
            const middle = this.generation[i];
            const right = this.generation[(i + 1) % this.width];

            // Convert the 3-cell neighborhood (e.g., [1, 0, 1]) into a decimal index (0-7)
            // The neighborhood '111' corresponds to index 0, '110' to 1, ..., '000' to 7 for our rule array.
            // So we read it as a binary number (left, middle, right) and use its decimal value.
            const neighborhoodIndex = parseInt(`${left}${middle}${right}`, 2);

            // The rule array is reversed, so '000' (decimal 0) uses rule[7], '111' (decimal 7) uses rule[0].
            // To map correctly: 7 - neighborhoodIndex
            nextGen[i] = this.rule[7 - neighborhoodIndex];
        }
        this.generation = nextGen;
        return this.generation;
    }

    /**
     * Gets the current generation of cells.
     * @returns {Array<number>} The current generation.
     */
    getCurrentGeneration() {
        return [...this.generation]; // Return a copy
    }

    /**
     * Prints the current generation to the console.
     * Uses '█' for a live cell (1) and ' ' (space) for a dead cell (0).
     */
    printGeneration() {
        console.log(this.generation.map(cell => cell === 1 ? '█' : ' ').join(''));
    }
}

// --- Example Usage ---
function runAutomaton(rule, width, generations) {
    console.log(`Running Elementary Cellular Automaton with Rule ${rule}, Width ${width}, for ${generations} generations.`);
    const ca = new ElementaryCellularAutomaton(rule, width);

    console.log("Initial Generation:");
    ca.printGeneration();

    for (let i = 0; i < generations; i++) {
        ca.nextGeneration();
        ca.printGeneration();
    }
    console.log("--- End of Simulation ---");
}

// --- Common Rules to Try ---
// Rule 30: Known for its chaotic, complex patterns.
// Rule 90: Produces a fractal pattern (Sierpinski triangle).
// Rule 110: Known to be Turing complete, meaning it can simulate any computation.
// Rule 184: Models traffic flow (1s are cars, 0s are empty spaces).

// Example: Run Rule 90 for 20 generations with a width of 50
    // (rule, width, generation) 
runAutomaton(90, 50, 20);
// Example: Run Rule 110 for 40 generations with a width of 150
runAutomaton(110, 150, 40);
// Example: Run Rule 60 for 60 generations with a width of 100
runAutomaton(60, 100, 60);