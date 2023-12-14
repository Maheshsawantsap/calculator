using my.calculator as cal from '../db/data-model';

service CalculatorService {
     entity calculations as projection on cal.calculations;
}