import React from 'react';
import {storiesOf} from '@storybook/react';
import RecommandationsCard from './RecommandationsCard';

import LandscapeImage from '../../../../static/bailey-zindel-396398-unsplash.jpg';

storiesOf('RecommandationsCard', module).add('to Storybook', () => <RecommandationsCard img={LandscapeImage} />);
