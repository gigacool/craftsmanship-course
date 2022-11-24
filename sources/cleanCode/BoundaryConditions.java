package sources.cleanCode;

public class BoundaryConditions {
    
    public void dontDo(int value, int length){
        if (value + 1 < length){
            System.out.println(value+1);
        }
    }

    public void doInsteald(int value, int length){
        int nextValue = value+1;
        if (nextValue < length){
            System.out.println(nextValue);
        }
    }
}
