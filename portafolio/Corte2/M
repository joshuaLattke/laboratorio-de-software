classDiagram
    class NQueensGA {
        -int boardSize
        -int populationSize
        -float mutationRate
        -int maxGenerations
        +createIndividual() Array
        +calculateFitness(individual: Array) int
        +tournamentSelection(population: Array) Array
        +crossover(parent1: Array, parent2: Array) Array
        +mutate(individual: Array) Array
        +solve() Object
    }

    class Individual {
        -Array genes
        +getFitness() int
        +mutate() void
    }

    class GeneticOperators {
        +selection(population: Array) Array
        +crossover(parent1: Array, parent2: Array) Array
        +mutation(individual: Array) Array
    }

    NQueensGA "1" *-- "0..*" Individual: Contains
    NQueensGA ..> GeneticOperators: Uses
    Individual ..> GeneticOperators: Interacts with

    note for NQueensGA "Implementa algoritmo genético\npara resolver problema\nde N-Reinas"