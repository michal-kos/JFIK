interface Animal {
    void animalSound();

    void run();
}

public class Dog {
    String breed;
    int age;
    String color;

    void barking() {
    }

    void hungry() {
    }

    void sleeping() {
    }
}

public class Puppy extends Dog {
    int puppyAge;
    String name;

    public Puppy(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        puppyAge = age;
    }

    public int getAge() {
        return puppyAge;
    }
}

class AnimalTest {
    public static void main(String[] args) {
        Dog puppy = new Puppy("Kajtek");

        puppy.barking();

        Puppy anotherPuppy = new Puppy("asd");
        anotherPuppy.setAge(10);
    }
}