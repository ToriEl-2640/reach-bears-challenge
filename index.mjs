import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
import { ask } from '@reach-sh/stdlib';
import react from 'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('A', {});
  init();
  
});

const stdlib = loadStdlib(process.env);
const stdlib = loadStdlib(launchToken);

const startingBalance = stdlib.parseCurrency(100);

const accBob = await stdlib.newTestAccount(startingBalance);
  
const accAlice = await stdlib.newTestAccount(stdlib.parseCurrency(6000));
console.log(`Hello, Alice and Bob!`);

const zorkmid = await stdlib.launchToken(accCreator, "jayson", "JSN");

console.log('Launching...');
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());

const choiceArray = ["I'm not here", "I'm still here"];

const getBalance = async (who) => stdlib.formatCurrency((await stdlib.balanceOf(who)));

console.log(`Alice's balance before is: ${await getBalance(accAlice)}`);
console.log(`Bob's account balance before is: ${await getBalance(accBob)}`);

const Shared = () => ({
  showTime: (t) => {
    //parsint
    console.log(parseInt(t));
  },
});

const commonInteract = {ask};




console.log('Starting backends...');
await Promise.all([
  backend.Alice(ctcAlice, {
    ...stdlib.hasRandom,
    ...Shared(),
    ...commonInteract,
    inherit: stdlib.parseCurrency(5000),
    getChoice: () => {
      const choice = Math.floor(Math.random() * 2);
      console.log(`Alice's choice is ${choiceArray[choice]}`);
      return (choice == 0 ? false : true);
    },
    // implement Alice's interact object here
  }),
  backend.Bob(ctcBob, {
    ...stdlib.hasRandom,
    ...Shared(),
    ...commonInteract,
    confirmTrans: async (price) => await ask.ask(`Do you want to purchase wisdom for ${toSU(price)} ${suStr}?`, ask.yesno),

    // implement Bob's interact object here
    acceptTerms: (num) => {
      console.log(`Bob accepts the terms of the vault for ${stdlib.formatCurrency(num)}`);
      return true;
    }
  }),
]);
ask.done();
exit();

await newSam('Bob1');
await newSam('Bob2');
await newSam('Bob3');


console.log(`Alice's balance after is: ${await getBalance(accAlice)}`);
console.log(`Bob's account after before is: ${await getBalance(accBob)}`);

console.log(`Goodbye, Alice and Bob!`);



const ask = async () => {
  await stdlib.wait(15, ({current, target}) => {
    if (current < target) {
      console.log(`At ${current} A is waiting for ${target - current} more...`);
    }
  });
  return 2;
};
//const interact = {ask};


