using System;
class For_Each      
{ 
    public static void Main(String[] arg) 
    { 
        { 
            int[] marks = { 125, 132, 95, 116, 110 }; 
              
            int highest_marks = Maximum(marks); 
            System.out.Println("The highest score is " + highest_marks); 
        } 
    } 
    public static int Maximum(int[] numbers) 
    {  
        int maxSoFar = numbers[0]; 
          
        // for each loop 
        for (int num : numbers){ 
            if (num > maxSoFar) { 
                maxSoFar = num; 
            } 
        }

        for (int i=0; i<5; i++){
           int a = i;
        }
    return maxSoFar; 
    } 
} 