'use strict';

import {Parser, Format} from '../lib/parser';

describe('The Lipsum Parser', function() {
  beforeEach(function() {
    this.xmlParser = sinon.stub({
      parseString: () => {}
    });
    this.jsonParser = sinon.stub({
      parse: () => {}
    });
    this.parser = new Parser(this.xmlParser, this.jsonParser);
  });

  describe('#parse', function() {
    describe('when given JSON', function() {
      beforeEach(function() {
        this.json = {
          test: 'this is a test'
        };
        this.payload = JSON.stringify(this.json);
      });

      it('parses valid JSON successfully', function() {
        this.jsonParser.parse.returns(this.json);
        const p = this.parser.parse(Format.JSON, this.payload);
        return expect(p).to.eventually.deep.equal(this.json);
      });

      it('fails with invalid JSON', function() {
        this.jsonParser.parse.throws(
          new SyntaxError('Unexpected Token!')
        );
        const p = this.parser.parse(Format.JSON, this.payload);
        return expect(p).to.be.rejectedWith(SyntaxError);
      });
    });

    describe('when given XML', function() {
      beforeEach(function() {
        this.payload = `
          <thing>
            <foo>Bar</foo>
            <baz>Bing</baz>
          </thing>
        `;
      });

      it('parses valid XML successfully', function() {
        const result = { parsed: true };
        this.xmlParser.parseString.yields(null, result);

        const p = this.parser.parse(Format.XML, this.payload);
        return expect(p).to.eventually.deep.equal(result);
      });

      it('fails with invalid XML', function() {
        this.xmlParser.parseString.yields(new Error('Your XML sux'));
        const p = this.parser.parse(Format.XML, this.payload);
        return expect(p).to.be.rejectedWith(Error);
      });
    });
  });

  describe('#parseJSON', function() {
    beforeEach(function() {
      this.json = {
        test: 'this is a test'
      };
      this.payload = JSON.stringify(this.json);
    });

    it('parses valid JSON successfully', function() {
      this.jsonParser.parse.returns(this.json);
      const p = this.parser.parse(Format.JSON, this.payload);
      return expect(p).to.eventually.deep.equal(this.json);
    });

    it('fails with invalid JSON', function() {
      this.jsonParser.parse.throws(
        new SyntaxError('Unexpected Token!')
      );
      const p = this.parser.parse(Format.JSON, this.payload);
      return expect(p).to.be.rejectedWith(SyntaxError);
    });
  });

  describe('#parseXML', function() {
    beforeEach(function() {
      this.payload = `
        <thing>
          <foo>Bar</foo>
          <baz>Bing</baz>
        </thing>
      `;
    });

    it('parses valid XML successfully', function() {
      const result = { parsed: true };
      this.xmlParser.parseString.yields(null, result);

      const p = this.parser.parse(Format.XML, this.payload);
      return expect(p).to.eventually.deep.equal(result);
    });

    it('fails with invalid XML', function() {
      this.xmlParser.parseString.yields(new Error('Your XML sux'));
      const p = this.parser.parse(Format.XML, this.payload);
      return expect(p).to.be.rejectedWith(Error);
    });
  });
});
