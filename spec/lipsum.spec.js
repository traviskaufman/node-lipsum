'use strict';

import {Format} from '../lib/parser';
import {Lipsum} from '../lib/lipsum';

describe('Lipsum', function() {
  beforeEach(function() {
    this.parser = sinon.stub({
      parse: () => {}
    });

    this.service = sinon.stub({
      get: () => {}
    });

    this.lipsum = new Lipsum(this.parser, this.service);
  });

  describe('#getText', function() {
    beforeEach(function() {
      this.response = {
        feed: {
          lipsum: 'Dummy text.'
        }
      };
      this.service.get.returns(Promise.resolve(JSON.stringify(this.response)));
      this.parser.parse.returns(Promise.resolve(this.response));
    });

    it('retrieves text using sensible defaults', function() {
      return this.lipsum.getText().then(() => {
        expect(this.service.get).to.have.been.calledWith(Format.JSON, {
          amount: 5,
          what: 'paras',
          start: 'no'
        });
        expect(this.parser.parse).to.have.been.calledWith(Format.JSON, JSON.stringify(this.response));
      });
    });

    it('honors options', function() {
      const amount = 6, what = 'bytes';
      this.lipsum.getText({amount, what, startWithLoremIpsum: true});
      expect(this.service.get).to.have.been.calledWith(Format.JSON, {
        amount, what, start: 'yes'
      });
    });

    describe('when all things go right', function() {
      it('returns the "feed.lipsum" property of the response', function() {
        return expect(this.lipsum.getText()).to.eventually.deep.equal(
          this.response.feed.lipsum
        );
      });
    });

    describe('when the parser fails', function() {
      beforeEach(function() {
        this.parser.parse.returns(Promise.reject(new Error()));
      });

      it('fails with the error', function() {
        return expect(this.lipsum.getText()).to.be.rejectedWith(Error);
      });
    });

    describe('when the service fails', function() {
      beforeEach(function() {
        this.service.get.returns(Promise.reject(new Error()));
      });

      it('fails with the error', function() {
        return expect(this.lipsum.getText()).to.be.rejectedWith(Error);
      });
    });
  });
});
