import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';

import DirectionProvider from '../src/DirectionProvider';
import { DIRECTIONS } from '../src/constants';

describe('<DirectionProvider>', () => {
  let children;
  beforeEach(() => {
    children = <div>Foo</div>;
  });

  it('renders its children', () => {
    const wrapper = shallow(
      <DirectionProvider direction={DIRECTIONS.RTL}>{children}</DirectionProvider>,
    );
    expect(wrapper.contains(children)).to.eq(true);
  });

  it('renders a wrapping div with a dir attribute', () => {
    const direction = DIRECTIONS.RTL;
    const wrapper = shallow(
      <DirectionProvider direction={direction}>{children}</DirectionProvider>,
    );
    expect(wrapper).to.have.type('div');
    expect(wrapper).to.have.prop('dir', direction);
  });

  it('renders a wrapping span when the inline prop is true', () => {
    const direction = DIRECTIONS.RTL;
    const wrapper = shallow(
      <DirectionProvider direction={direction} inline>{children}</DirectionProvider>,
    );
    expect(wrapper).to.have.type('span');
    expect(wrapper).to.have.prop('dir', direction);
  });

  it('broadcasts the direction when the direction prop changes', () => {
    const direction = DIRECTIONS.LTR;
    const nextDirection = DIRECTIONS.RTL;
    const wrapper = shallow(
      <DirectionProvider direction={direction}>{children}</DirectionProvider>,
    );
    const broadcast = wrapper.instance().broadcast;
    const broadcastSpy = sinon.spy(broadcast, 'setState');
    wrapper.setProps({ direction: nextDirection });
    expect(broadcastSpy).to.have.callCount(1);
  });

  it('does not broadcast the direction when the direction prop stays the same', () => {
    const direction = DIRECTIONS.LTR;
    const nextDirection = DIRECTIONS.LTR;
    const wrapper = shallow(
      <DirectionProvider direction={direction}>{children}</DirectionProvider>,
    );
    const broadcast = wrapper.instance().broadcast;
    const broadcastSpy = sinon.spy(broadcast, 'setState');
    wrapper.setProps({ direction: nextDirection });
    expect(broadcastSpy).to.have.callCount(0);
  });
});
