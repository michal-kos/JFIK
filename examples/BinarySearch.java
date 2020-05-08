class BinarySearch {
    public static void main(String[] args) {
       int[] array = { 1, 2, 3, 5, 6, 7, 8, 9 };
 
       int index = runBinarySearchRecursively(array, 5, 0, array.length);
 
       System.out.print(index);
    }
 
    public static int runBinarySearchRecursively(int[] sortedArray, int key, int low, int high) {
       int middle = (low + high) / 2;
 
       if (high < low) {
          return -1;
       }
 
       if (key == sortedArray[middle]) {
          return middle;
       } else if (key < sortedArray[middle]) {
          return runBinarySearchRecursively(sortedArray, key, low, middle - 1);
       } else {
          return runBinarySearchRecursively(sortedArray, key, middle + 1, high);
       }
    }
 }