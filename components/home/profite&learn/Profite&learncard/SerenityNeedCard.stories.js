import React from 'react';
import {storiesOf} from '@storybook/react';
import SerenityNeedCard from './SerenityNeedCard';

import LandscapeImage from '../../../../static/bailey-zindel-396398-unsplash.jpg';

storiesOf('SerenityNeedCard', module).add('to Storybook', () => <SerenityNeedCard img={LandscapeImage} />);
