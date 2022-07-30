'reach 0.1';

const COUNTDOWN = 20;

const Shared = {
  showTime: Fun([UInt], Null),
}

export const main = Reach.App(() => {
  const A = Participant('Alice', {
    // Specify Alice's interact interface here
    ...Shared,
    ...commonInteract,
    inherit: UInt,
    getChoice: Fun([UInt], Bool),
  });
  const B = API('Bob', {
    // Specify Bob's interact interface here
    ...Shared,
    ...commonInteract,
    acceptTerms: Fun([UInt], Bool),
  });
  init();
  // The first one to publish deploys the contract
  A.only(() => {
    const value = declassify(interact.inherit);
  })
  A.publish(value)
   .pay(value);
  commit();
  // The second one to publish always attaches
  B.only(() => {
    const terms = declassify(interact.acceptTerms(value));
  })
  B.publish(terms);
  commit();

  each([A, B], () => {
    interact.showTime(COUNTDOWN);
    [ ...COUNTDOWN,
      lastConsensusTime(),
      lastConsensusSecs() ];
  })

  A.only(() => {
    const stillHere = declassify(interact.getChoice(0));
  })
  A.publish(stillHere);

  var d = countdown;

const d =
parallelReduce([ false, true ])
invariant(balance() == 0);
.api('Alice', 'Bob') => {
  Alice(null);
  return d;
};
.while (stillHere) {
  stillHere == true,
  },
    transfer(value).to(A);
  }
  else {
    transfer(value).to(B);
  }
  // write your program here
});

commit();
exit();


function go(who, k) {
  who.only(() => {
    const amt = declassify(interact.ask());
  });
  who.publish(amt)
    .pay(amt)
    .timeout(relativeTime(DELAY), () => k());
  commit();
}

//ask: Fun([], UInt),

