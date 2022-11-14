const { lowCoverage } = require('./lowCoverage');

describe('low copverage examples', function(){

    it('should be defined', function(){
        expect(lowCoverage).toBeInstanceOf(Function);
    });

    it('should return 0 when input is empty', function(){
        const result = lowCoverage();
        expect(result).toBe(0);
    });


});