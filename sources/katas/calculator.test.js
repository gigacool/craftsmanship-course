const { add } = require('./calculator');

describe('string calculator', function(){

    describe('add method', function(){

        it('should be defined', function(){
            expect(add).toBeInstanceOf(Function);
        });

    });


});