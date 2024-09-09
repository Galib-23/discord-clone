type P = Promise<number>

// const addTwoPromises = (
//   promise1: P,
//   promise2: P
// ): P => {
//   const data1 = promise1.then((data) => data);
//   const data2 = promise2.then((data) => data);

//   return new Promise((resolve) => {
//     resolve(data1 + data2);
//   })
// }