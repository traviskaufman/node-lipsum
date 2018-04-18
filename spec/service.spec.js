import {EventEmitter} from 'events';

import MemoryStream from 'memorystream';

import {Format} from '../lib/parser';
import {Service} from '../lib/service';

describe('Service', function() {
  beforeEach(function() {
    this.httpClient = sinon.stub({
      get: () => {}
    });
    this.service = new Service(this.httpClient);
  });

  describe('#get', function() {
    beforeEach(function() {
      this.request = new EventEmitter();
      this.httpClient.get.returns(this.request);
    });

    it('requests a lipsum JSON feed when given JSON format', function() {
      this.service.get(Format.JSON);
      expect(this.httpClient.get).to.have.been.calledWith(
        'https://lipsum.com/feed/json'
      );
    });

    it('requests a lipsum XML feed when given XML format', function() {
      this.service.get(Format.XML);
      expect(this.httpClient.get).to.have.been.calledWith(
        'https://lipsum.com/feed/xml'
      );
    });

    it('allows for custom query parameters to be passed in', function() {
      this.service.get(Format.JSON, { foo: 'bar', baz: 'bing' });
      expect(this.httpClient.get).to.have.been.calledWith(
        'https://lipsum.com/feed/json?foo=bar&baz=bing'
      );
    });

    describe('when the request is successful', function() {
      beforeEach(function() {
        this.response = new MemoryStream();
        this.httpClient.get.yields(this.response);
      });

      describe('when the response is successfully received', function() {
        beforeEach(function() {
          this.data = JSON.stringify({yodawg: 'sup'});
        });

        it('resolves with the response data', function() {
          const p = this.service.get(Format.JSON);
          this.response.write(this.data, 'utf8');
          this.response.end();
          return expect(p).to.eventually.equal(this.data);
        });
      });

      describe('when there is a problem retrieving the response', function() {
        beforeEach(function() {
          this.error = new Error('yikes');
        });

        it('fails with the emitted error', function() {
          const p = this.service.get(Format.JSON);
          this.response.emit('error', this.error);
          return expect(p).to.be.rejectedWith(this.error);
        });
      });
    });

    describe('when the request fails', function() {
      beforeEach(function() {
        this.httpClient.get.resetHistory();
        this.error = new Error('ruh roh');
      });

      it('fails with the emitted error', function() {
        const p = this.service.get(Format.JSON);
        this.request.emit('error', this.error);
        expect(p).to.be.rejectedWith(this.error);
      });
    });
  });
});
