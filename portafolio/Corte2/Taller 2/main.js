const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const { performance } = require('perf_hooks');

const DATA_SIZE = 10000000; // Tamaño total de datos
const THREAD_COUNT = require('os').cpus().length; // Número de hilos (núcleos de CPU)

if (isMainThread) {
    // Código principal (Main Thread)
    console.log(`Procesando ${DATA_SIZE.toLocaleString()} datos con ${THREAD_COUNT} hilos...`);

    const startTime = performance.now();

    // Dividir los datos en partes iguales para cada hilo
    const dataChunks = [];
    const chunkSize = Math.ceil(DATA_SIZE / THREAD_COUNT);
    for (let i = 0; i < THREAD_COUNT; i++) {
        dataChunks.push(
            Array.from(
                { length: Math.min(chunkSize, DATA_SIZE - i * chunkSize) },
                () => Math.random()
            )
        );
    }

    // Crear una promesa para cada worker
    const workers = dataChunks.map(
        (chunk, index) =>
            new Promise((resolve, reject) => {
                const worker = new Worker(__filename, { workerData: chunk });
                worker.on('message', resolve); // Recibir datos ordenados
                worker.on('error', reject); // Manejo de errores
                worker.on('exit', (code) => {
                    if (code !== 0) reject(new Error(`Worker finalizó con código ${code}`));
                });
            })
    );

    // Esperar a que todos los workers terminen
    Promise.all(workers)
        .then((sortedChunks) => {
            // Combinar y ordenar los resultados finales
            console.log('Combinando resultados...');
            const sortedArray = [].concat(...sortedChunks).sort((a, b) => a - b);

            const endTime = performance.now();
            console.log(
                `Tarea completada en ${(endTime - startTime) / 1000} segundos.`
            );
        })
        .catch((error) => console.error('Error en ejecución:', error.message));
} else {
    // Código de cada Worker
    const sortedChunk = workerData.sort((a, b) => a - b); // Ordenar el chunk recibido
    parentPort.postMessage(sortedChunk); // Enviar el chunk ordenado de vuelta
}
