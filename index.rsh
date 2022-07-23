'reach 0.1'

export const main = Reach.App(() => {
    const A = Participant('Carl', {
        //Carl interact interface here
        ready: Fun([], Null),
    })

    const B = API('Sam', {
     //Sams interact interface here
    })
 
   const i =
   parallelReduce([ false, true ])
   .invariant(balance() == 0)
   .while( i > 3 )
   .api('Carl', 'Sam') => {
       Carl(null);
       return i + 1;
   }

    init();
    A.only(() => {
        interact.ready()
    });
    A.publish();
    commit();
    exit();
})