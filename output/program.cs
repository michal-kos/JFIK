using System;

interface Animal {
   void AnimalSound();

   void Run();
}

public class Dog {
   String breed;
   int age;
   String color;

   public void Barking() {
   }

   public void Hungry() {
   }

   public void Sleeping() {
   }
}

public class Puppy : Dog {
   int puppyAge;
   String name;

   public Puppy(String name) {
      this.name = name;
   }

   static private int GetIndex() {
      return 1;
   }

   private void Digest() {

   }

   public void SetAge(int age) {
      puppyAge = age;
   }

   public int GetAge() {
      return puppyAge;
   }
}

class HelloWorld {
   static readonly int K = 100;

   public static void Main(String[] args) {
      int[] array = { 1, 2, 3, 5, 6, 7, 8, 9 };

      int index = RunBinarySearchRecursively(array, 5, 0, 8);

      Dog puppy = new Puppy("Kajtek");

      puppy.Barking();

      Puppy anotherPuppy = new Puppy("asd");
      anotherPuppy.SetAge(10);

      int[] marks = { 125, 132, 95, 116, 110 };

      int highest_marks = Maximum(marks);
   }

   public static int Maximum(int[] numbers) {
      int maxSoFar = numbers[0];

      // for each loop
      foreach (int num in numbers) {
         if (num > maxSoFar) {
            maxSoFar = num;
         }
      }

      for (int i = 0; i < 5; i++) {
         int a = i;
      }

      return maxSoFar;
   }

   public static int RunBinarySearchRecursively(int[] sortedArray, int key, int low, int high) {
      int middle = (low + high) / 2;

      if (high < low) {
         return -1;
      }

      if (key == sortedArray[middle]) {
         return middle;
      } else if (key < sortedArray[middle]) {
         return RunBinarySearchRecursively(sortedArray, key, low, middle - 1);
      } else {
         return RunBinarySearchRecursively(sortedArray, key, middle + 1, high);
      }
   }

   public static void Exceptions() {
      
   }
}
