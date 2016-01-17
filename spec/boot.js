'use strict';

import * as sinon from 'sinon';
import * as chai from 'chai';

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
global.sinon = sinon;
global.expect = chai.expect;
