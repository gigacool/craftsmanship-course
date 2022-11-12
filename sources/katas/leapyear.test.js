const { leapYear } = require('./leapYear');

describe('leap year kata', function(){

    it('should be defined', function(){
        expect(leapYear).toBeInstanceOf(Function);
    });

});