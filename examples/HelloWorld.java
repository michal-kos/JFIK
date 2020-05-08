
interface Animal {
   void animalSound();

   void run();
}

public class Dog {
   String breed;
   int age;
   String color;

   public void barking() {
   }

   public void hungry() {
   }

   public void sleeping() {
   }
}

public class Puppy extends Dog {
   int puppyAge;
   String name;

   public Puppy(String name) {
      this.name = name;
   }

   static private int getIndex() {
      return 1;
   }

   private void digest() {

   }

   public void setAge(int age) {
      puppyAge = age;
   }

   public int getAge() {
      return puppyAge;
   }
}

class HelloWorld {
   static final int K = 100;

   public static void main(String[] args) {
      int[] array = { 1, 2, 3, 5, 6, 7, 8, 9 };

      int index = runBinarySearchRecursively(array, 5, 0, 8);

      Dog puppy = new Puppy("Kajtek");

      puppy.barking();

      Puppy anotherPuppy = new Puppy("asd");
      anotherPuppy.setAge(10);

      int[] marks = { 125, 132, 95, 116, 110 };

      int highest_marks = maximum(marks);
   }

   public static int maximum(int[] numbers) {
      int maxSoFar = numbers[0];

      // for each loop
      for (int num : numbers) {
         if (num > maxSoFar) {
            maxSoFar = num;
         }
      }

      for (int i = 0; i < 5; i++) {
         int a = i;
      }

      return maxSoFar;
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

   public static void exceptions() throws IOException, ExportException {
      
   }
}
