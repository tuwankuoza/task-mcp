// solution
function findIndexOfSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for(let j = i+1; j < arr.length; j++) {
      if(arr[i] + arr[j] === target) return [i, j]
    }
  }
}

// test case
let caseA = findIndexOfSum([2, 7, 11, 15], 13)
console.log(caseA);

let caseB = findIndexOfSum([3, 2, 4], 6)
console.log(caseB);

let caseC = findIndexOfSum([3, 3], 6)
console.log(caseC);
