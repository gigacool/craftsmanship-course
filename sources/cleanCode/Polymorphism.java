package sources.cleanCode;

public class Polymorphism {

    public void dontDo(String message, String details){

        if (details != null){
            System.out.println(message + "\n" + details);
        } else {
            System.out.println(message);
        }
    }

    public void doInstead(String message){
        System.out.println(message);
    }

    public void doInstead(String message, String details){
        doInstead(message);
        System.out.println(details);
    }

}
