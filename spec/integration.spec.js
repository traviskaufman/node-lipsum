import {CLI} from '../lib/cli';

describe('Integration tests', function() {
    beforeEach(function() {
      this.cli = new CLI();
    });

    
    it('when passed defaults, returns 5 random paragraphs', function(done) {
        this.cli.run(undefined, function(text){
          let arr = text.split(/\r?\n/);
          expect(arr.length).to.equal(5);
          done();
        });
    });

    it('when used with --what words , returns 5 words',function(done){
        this.cli.run(['--what', 'words'], function(text){
          let arr = text.split(" ");
          expect(arr.length).to.equal(5);
          done();
        });
    });

    it('when used with --amount 10, returns 10 random paragraphs',function(done){
       this.cli.run(['--amount','10'], function(text){
          let arr = text.split(/\r?\n/);
          expect(arr.length).to.equal(10);
          done();
        });
    });

    it('when used with -s, always starts with the same sentence',function(done){
       this.cli.run(['-s'], function(text){
          let arr = text.split(".");
          expect(arr[0]).to.equal("Lorem ipsum dolor sit amet, consectetur adipiscing elit");
          done();
        });
    });


});