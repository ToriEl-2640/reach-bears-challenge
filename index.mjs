import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const shouldFail = async (fp) => {
  let worked = undefined;
  try {
    await fp();
    worked = true;
  } catch (e) {
    worked = false;
  }
  console.log(`\tshouldFail = ${worked}`);
  if (worked !== false) {
    throw Error(`shouldFail`);
  }
};

const stdlib = loadStdlib();

const time = stdlib.connector === 'CFX' ? 50 : 10;

const startingBalance = stdlib.parseCurrency(100);
const accCreator = await stdlib.newTestAccount(startingBalance);
const riecoin = await stdlib.launchToken(accCreator, "riecoin", "rcn");
const fur = await stdlib.launchToken(accCreator, "fur", "fur");

const accTom = await stdlib.newTestAccount(startingBalance);
const accSam = await stdlib.newTestAccount(startingBalance);
if ( stdlib.connector === 'ETH' || stdlib.connector === 'CFX' ) {
  const myGasLimit = 5000000;
  accTom.setGasLimit(myGasLimit);
  accSam.setGasLimit(myGasLimit);
} else if ( stdlib.connector == 'ALGO' ) {
  console.log(`Demonstrating need to opt-in on ALGO`);
  await shouldFail(async () => await riecoin.mint(accTom, startingBalance));
  console.log(`Opt-ing in on ALGO`);
  await accTom.tokenAccept(riecoin.id);
  await accTom.tokenAccept(fur.id);
  await accSam.tokenAccept(riecoin.id);
  await accSam.tokenAccept(fur.id);
}

await riecoin.mint(accTom, startingBalance.mul(2));
await fur.mint(accSam, startingBalance.mul(2));

if ( stdlib.connector == 'ALGO' ) {
  console.log(`Demonstrating opt-out on ALGO`);
  console.log(`\tTom opts out`);
  await riecoin.optOut(accTom);
  console.log(`\tTom can't receive mint`);
  await shouldFail(async () => await riecoin.mint(accTom, startingBalance));
  console.log(`\tTom re-opts-in`);
  await accTom.tokenAccept(riecoin.id);
  console.log(`\tTom can receive mint`);
  await riecoin.mint(accTom, startingBalance);
}

const fmt = (x) => stdlib.formatCurrency(x, 4);
const doSwap = async (tokenA, amtA, tokenB, amtB, trusted) => {
  console.log(`\nPerforming swap of ${fmt(amtA)} ${tokenA.sym} for ${fmt(amtB)} ${tokenB.sym}`);

  const getBalance = async (tokenX, who) => {
    const amt = await stdlib.balanceOf(who, tokenX.id);
    return `${fmt(amt)} ${tokenX.sym}`; };
  const getBalances = async (who) =>
    `${await getBalance(tokenA, who)} & ${await getBalance(tokenB, who)}`;

  const beforeTom = await getBalances(accTom);
  const beforeSam = await getBalances(accSam);
  console.log(`Tom has ${beforeTom}`);
  console.log(`Sam has ${beforeSam}`);

  if ( trusted ) {
    console.log(`Tom transfers to Sam honestly`);
    await stdlib.transfer(accTom, accSam, amtA, tokenA.id);
    console.log(`Sam transfers to Tom honestly`);
    await stdlib.transfer(accSam, accTom, amtB, tokenB.id);
  } else {
    console.log(`Tom will deploy the Reach DApp.`);
    const ctcTom = accTom.contract(backend);
    console.log(`Sam attaches to the Reach DApp.`);
    const ctcSam = accSam.contract(backend, ctcTom.getInfo());

    let succ = undefined;
    const Common = (who) => ({
      seeTimeout: () => {
        succ = false;
        console.log(`${who} saw a timeout`); },
      seeTransfer: () => {
        succ = true;
        console.log(`${who} saw the transfer happened`); },
    });

    await Promise.all([
      backend.Tom(ctcTom, {
        ...Common(`Tom`),
        getSwap: () => {
          console.log(`Tom proposes swap`);
          return [ tokenA.id, amtA, tokenB.id, amtB, time ]; },
      }),
      backend.Sam(ctcSam, {
        ...Common(`Sam`),
        accSwap: (...v) => {
          console.log(`Sam accepts swap of`, v);
          return true; },
      }),
    ]);

    return succ;
  }

  const afterTom = await getBalances(accTom);
  const afterSam = await getBalances(accSam);
  console.log(`Tom went from ${beforeTom} to ${afterTom}`);
  console.log(`Sam went from ${beforeSam} to ${afterSam}`);
};

const amtA = stdlib.parseCurrency(1);
const amtB = stdlib.parseCurrency(2);

if ( await doSwap(riecoin, amtA, fur, amtB, false)
     && await doSwap(fur, amtB, riecoin, amtA, false) ) {
  await doSwap(riecoin, amtA, fur, amtB, true);
}