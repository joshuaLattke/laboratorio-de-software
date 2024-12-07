// Algoritmos de ordenamiento
function gnomeSort(arr) {
    const array = [...arr];
    let index = 0;
    let startTime = performance.now();

    while (index < array.length) {
        if (index === 0 || array[index] >= array[index - 1]) {
            index++;
        } else {
            [array[index], array[index - 1]] = [array[index - 1], array[index]];
            index--;
        }
    }

    return {
        sortedArray: array,
        time: performance.now() - startTime
    };
}

function shellSort(arr) {
    const array = [...arr];
    let startTime = performance.now();
    let gap = Math.floor(array.length / 2);

    while (gap > 0) {
        for (let i = gap; i < array.length; i++) {
            let temp = array[i];
            let j = i;

            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
            }
            array[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }

    return {
        sortedArray: array,
        time: performance.now() - startTime
    };
}

function bubbleSort(arr) {
    const array = [...arr];
    let startTime = performance.now();
    let swapped;

    for (let i = 0; i < array.length; i++) {
        swapped = false;
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }

    return {
        sortedArray: array,
        time: performance.now() - startTime
    };
}

// Recibir mensajes del hilo principal
self.onmessage = function (e) {
    const { algorithm, array } = e.data;

    let result;
    switch (algorithm) {
        case 'gnomeSort':
            result = gnomeSort(array);
            break;
        case 'shellSort':
            result = shellSort(array);
            break;
        case 'bubbleSort':
            result = bubbleSort(array);
            break;
    }

    self.postMessage(result);
};
