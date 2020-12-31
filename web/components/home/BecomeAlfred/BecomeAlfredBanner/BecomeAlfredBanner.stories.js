import React from 'react';
import {storiesOf} from '@storybook/react';
import BecomeAlfredBanner from './BecomeAlfredBanner';

import Image from '../../../../static/bailey-zindel-396398-unsplash.jpg';

storiesOf('BecomeAlfredBanner', module).add('to Storybook', () => <BecomeAlfredBanner img={Image}/>);
