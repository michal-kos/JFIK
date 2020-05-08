using System;
interface Animal {
    void AnimalSound();

    void Run();
}

public class Dog: Animal {
    String breed;
    int age;
    String color;

    void Animal.AnimalSound() {
        Barking();
    }

    void Animal.Run() {

    }

    void Barking() {
    }

    void Hungry() {
    }

    void Sleeping() {
    }
}

public class Puppy : Dog {
    int puppyAge;
    String name;

    public Puppy(String name) {
        this.name = name;
    }

    public void SetAge(int age) {
        puppyAge = age;
    }

    public int GetAge() {
        return puppyAge;
    }
}

class AnimalTest {
    public static void Main(String[] args) {
        Animal dog = new Dog();
        Dog puppy = new Puppy("Kajtek");

        puppy.AnimalSound();

        Puppy anotherPuppy = new Puppy("asd");
        anotherPuppy.SetAge(10);
    }
}