package sources.cleanCode;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;

class Name {
    private String value;
    
    public Name(String value) {
        this.value = value;
    }
    
    public String getName(){
        return value;
    }
}

class Age {

    private LocalDate birthDate;

    public Age(Date birthDate){
        this.birthDate = birthDate.toInstant()
        .atZone(ZoneId.systemDefault())
        .toLocalDate();
    }

    public int getAge(){
        LocalDate now = new Date().toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate();;
        Period period = Period.between(this.birthDate, now);
        return Math.abs(period.getYears());
    }

} 
