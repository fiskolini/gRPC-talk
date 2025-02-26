import readline from 'readline';

// Create an interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function promptQuestion(query: string) {
    return new Promise((resolve) => {
        rl.question(`${query}\n`, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}