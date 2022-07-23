//import React from 'react';
import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();


console.log("creating a starting  balance");
const startingBalance = stdlib.parseCurrency(100);

const accCarl = await stdlib.newTestAccount(startingBalance);
console.log('Hello, Carl and Sams!');

console.log('Launching...');
const ctcCarl = accCarl.contract(backend);

console.log('Starting backends...');

const users = [];
const startSams = async () => {
const newSam = async (who) => {
    const acc = await stdlib.newTestAccount(startingBalance);
    const ctc = acc.contract(backend, ctcCarl.getInfo());
    users.push(acc.getAddress());
};

await newSam('Sam1');
await newSam('Sam2');
await newSam('Sam3');
await newSam('Sam4');
await newSam('Sam5');

/*while(i > 3, i++){
    await stdlib.wait(1);
} */

while(i){
    await stdlib.wait(1);
}

//.timeout(DEADLINE, () => {
  //  return newApi;
//});

console.log(users);
};

 ctcCarl.p.Carl({
    //Carl interact object
    ready: () => {
        console.log('Carl is ready to receive users');
        startSams();
    },
});

console.log('Goodbye, Carl and Sams!');
//newSam = true;