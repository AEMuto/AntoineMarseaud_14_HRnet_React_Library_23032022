/**
 * Faster quicksort using a stack to eliminate recursion, sorting inplace to reduce memory usage, and using insertion sort for small partition sizes
 * See https://jsben.ch/3I3n2 and https://jsben.ch/jSeTh
 * @param {Array<Array<string>>} array
 * @returns {Array<Array<string>>}
 */
export function fastQuicksort(array:Array<Array<string>>): Array<Array<string>> {
  const stack = [];
  let entry:any = [0, array.length, 2 * Math.floor(Math.log(array.length) / Math.log(2))];
  stack.push(entry);

  while(stack.length > 0) {
    entry = stack.pop();
    const start = entry[0];
    const end = entry[1];
    let depth = entry[2];

    if(depth === 0) {
      array = shellSortBound(array, start, end);
      continue;
    }

    depth--;
    const pivot = Math.round((start + end) / 2);
    const pivotNewIndex = inplaceQuicksortPartition(array, start, end, pivot);

    if(end - pivotNewIndex > 16) {
      entry = [pivotNewIndex, end, depth];
      stack.push(entry);
    }

    if(pivotNewIndex - start > 16) {
      entry = [start, pivotNewIndex, depth];
      stack.push(entry);
    }
  }

  array = insertionSort(array);
  return array;
}

function shellSortBound(array:Array<Array<string>>, start:number, end:number) {
  let inc = Math.round((start + end) / 2),
    i, j, t;
  while (inc >= start) {
    for (i = inc; i < end; i++) {
      t = array[i];
      j = i;
      while (j >= inc && array[j - inc][0] > t[0]) {
        array[j] = array[j - inc];
        j -= inc;
      }
      array[j] = t;
    }
    inc = Math.round(inc / 2.2);
  }
  return array;
}

// In place quicksort
function inplaceQuicksortPartition(array:Array<Array<string>>, start:number, end:number, pivotIndex:number) {
  let i = start, j = end;
  const pivot = array[pivotIndex][0];
  while(true) {
    while(array[i][0] < pivot) { i++ }
    j--;
    while(pivot < array[j][0]) { j-- }
    if(!(i < j)) {
      return i;
    }
    swap(array, i, j);
    i++;
  }
}

//Insertion sort
function insertionSort(array:Array<Array<string>>) {
  for(let i = 1, l = array.length; i < l; i++) {
    const value = array[i];
    for(var j = i - 1; j >= 0; j--) {
      if(array[j][0] <= value[0])
        break;
      array[j + 1] = array[j];
    }
    array[j + 1] = value;
  }
  return array;
}

function swap(array:Array<Array<string>>, a:number, b:number) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}