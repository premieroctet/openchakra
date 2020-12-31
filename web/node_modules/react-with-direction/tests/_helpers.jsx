import React from 'react';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon-sandbox';
import chaiEnzyme from 'chai-enzyme';

import configure from 'enzyme-adapter-react-helper';

configure({ disableLifecycleMethods: true });

chai.use(sinonChai);
chai.use(chaiEnzyme());

afterEach(() => {
  sinon.restore();
});
