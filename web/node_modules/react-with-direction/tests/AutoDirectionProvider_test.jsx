import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AutoDirectionProvider from '../src/AutoDirectionProvider';
import DirectionProvider from '../src/DirectionProvider';
import { DIRECTIONS, CHANNEL } from '../src/constants';
import mockBrcast from './mocks/brcast_mock';

describe('<AutoDirectionProvider>', () => {
  it('renders a DirectionProvider', () => {
    const wrapper = shallow((
      <AutoDirectionProvider text="a">
        <div />
      </AutoDirectionProvider>
    )).dive();

    expect(wrapper).to.have.exactly(1).descendants(DirectionProvider);
  });

  describe('direction prop', () => {
    it('is LTR correct for LTR strings', () => {
      const wrapper = shallow((
        <AutoDirectionProvider text="a">
          <div />
        </AutoDirectionProvider>
      )).dive();

      expect(wrapper.find(DirectionProvider)).to.have.prop('direction', DIRECTIONS.LTR);
    });

    it('is RTL correct for RTL strings', () => {
      const wrapper = shallow((
        <AutoDirectionProvider text="א">
          <div />
        </AutoDirectionProvider>
      )).dive();

      expect(wrapper.find(DirectionProvider)).to.have.prop('direction', DIRECTIONS.RTL);
    });

    it('is inherited from context for neutral strings', () => {
      const wrapper = shallow(
        (
          <AutoDirectionProvider text="1">
            <div />
          </AutoDirectionProvider>
        ), {
          context: {
            [CHANNEL]: mockBrcast({
              data: DIRECTIONS.RTL,
            }),
          },
        },
      ).dive();

      expect(wrapper.find(DirectionProvider)).to.have.prop('direction', DIRECTIONS.RTL);
    });
  });

  it('renders its children', () => {
    const children = <div>Foo</div>;

    const wrapper = shallow((
      <AutoDirectionProvider text="a">
        {children}
      </AutoDirectionProvider>
    )).dive();

    expect(wrapper).to.contain(children);
  });

  it('passes the inline prop to DirectionProvider', () => {
    let wrapper = shallow((
      <AutoDirectionProvider text="a">
        <div />
      </AutoDirectionProvider>
    )).dive();

    expect(wrapper.find(DirectionProvider)).to.have.prop('inline', false);

    wrapper = shallow((
      <AutoDirectionProvider text="a" inline>
        <div />
      </AutoDirectionProvider>
    )).dive();

    expect(wrapper.find(DirectionProvider)).to.have.prop('inline', true);
  });
});
