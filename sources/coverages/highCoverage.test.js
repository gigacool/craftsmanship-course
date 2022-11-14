const { highCoverage } = require('./highCoverage');

// in this example, we don't test function computeQuestions
// we don't test function(questions = [])
// what if some question does not have isCorrect or score attribute ? 
// what if some score is negative ? 
// 100% does not mean bugless or complete !!! 

describe('high copverage examples', function(){

    it('should be defined', function(){
        expect(highCoverage).toBeInstanceOf(Function);
    });

    it('should return 0 when input is empty', function(){
        const result = highCoverage(); 
        expect(result).toBe(0);
    });

    it('should return 20 when sum of question scores is 20', function(){
        const input = [
            {isCorrect:true, score:10},
            {isCorrect:true, score:5},
            {isCorrect:true, score:3},
            {isCorrect:true, score:2}
        ];
        const result = highCoverage(input);
        expect(result).toBe(20);
    });

    it('should return correct output when some questions are incorrects', function(){
        const input = [
            {isCorrect:true, score:3},
            {isCorrect:false, score:5},
            {isCorrect:true, score:3}
        ];
        const result = highCoverage(input);
        expect(result).toBe(6);
    });

});