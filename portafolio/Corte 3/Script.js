class NQueensGA {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.populationSize = 100;
        this.mutationRate = 0.1;
        this.maxGenerations = 500;
    }

    // Genera un individuo (configuración de reinas)
    createIndividual() {
        return Array.from({length: this.boardSize}, () => 
            Math.floor(Math.random() * this.boardSize)
        );
    }

    // Calcula el número de conflictos
    calculateFitness(individual) {
        let conflicts = 0;
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = i + 1; j < this.boardSize; j++) {
                // Conflictos diagonales y en la misma fila
                if (individual[i] === individual[j] || 
                    Math.abs(individual[i] - individual[j]) === j - i) {
                    conflicts++;
                }
            }
        }
        return this.boardSize * (this.boardSize - 1) / 2 - conflicts;
    }

    // Selección por torneo
    tournamentSelection(population) {
        const tournamentSize = 5;
        const selectedIndividuals = [];

        for (let i = 0; i < 2; i++) {
            let best = null;
            let bestFitness = -1;

            for (let j = 0; j < tournamentSize; j++) {
                const candidate = population[Math.floor(Math.random() * population.length)];
                const fitness = this.calculateFitness(candidate);

                if (fitness > bestFitness) {
                    best = candidate;
                    bestFitness = fitness;
                }
            }
            selectedIndividuals.push(best);
        }

        return selectedIndividuals;
    }

    // Cruce de un punto
    crossover(parent1, parent2) {
        const crossoverPoint = Math.floor(Math.random() * this.boardSize);
        const child1 = [
            ...parent1.slice(0, crossoverPoint),
            ...parent2.slice(crossoverPoint)
        ];
        const child2 = [
            ...parent2.slice(0, crossoverPoint),
            ...parent1.slice(crossoverPoint)
        ];
        return [child1, child2];
    }

    // Mutación con reposicionamiento aleatorio
    mutate(individual) {
        return individual.map(gen => 
            Math.random() < this.mutationRate 
                ? Math.floor(Math.random() * this.boardSize) 
                : gen
        );
    }

    solve() {
        let population = Array.from(
            {length: this.populationSize}, 
            () => this.createIndividual()
        );

        for (let generation = 0; generation < this.maxGenerations; generation++) {
            // Evaluar población
            const populationWithFitness = population.map(individual => ({
                individual,
                fitness: this.calculateFitness(individual)
            }));

            // Ordenar por fitness
            populationWithFitness.sort((a, b) => b.fitness - a.fitness);

            // Verificar solución
            if (populationWithFitness[0].fitness === this.boardSize * (this.boardSize - 1) / 2) {
                return {
                    solution: populationWithFitness[0].individual,
                    generations: generation
                };
            }

            // Nueva población
            const newPopulation = [];
            while (newPopulation.length < this.populationSize) {
                const [parent1, parent2] = this.tournamentSelection(population);
                const [child1, child2] = this.crossover(parent1, parent2);
                
                newPopulation.push(
                    this.mutate(child1),
                    this.mutate(child2)
                );
            }

            population = newPopulation;
        }

        return null;
    }
}

function renderChessboard(boardSize, solution) {
    const board = document.getElementById('chessboard');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${boardSize}, 50px)`;

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            
            if (solution[row] === col) {
                cell.innerHTML = '♕';
            }

            board.appendChild(cell);
        }
    }
}

function startGeneticAlgorithm() {
    const boardSizeInput = document.getElementById('boardSize');
    const statsDiv = document.getElementById('stats');
    const boardSize = parseInt(boardSizeInput.value);

    const ga = new NQueensGA(boardSize);
    const result = ga.solve();

    if (result) {
        renderChessboard(boardSize, result.solution);
        statsDiv.innerHTML = `
            Solución encontrada en ${result.generations} generaciones
        `;
    } else {
        statsDiv.innerHTML = 'No se encontró solución';
    }
}