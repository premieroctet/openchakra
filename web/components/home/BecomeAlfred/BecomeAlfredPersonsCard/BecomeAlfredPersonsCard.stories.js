import React from 'react';
import {storiesOf} from '@storybook/react';
import BecomeAlfredPersonsCard from './BecomeAlfredPersonsCard';

import Avatar from '../../../../static/johndoe.jpg';

storiesOf('BecomeAlfredPersonsCard', module).add('to Storybook', () => <BecomeAlfredPersonsCard alt="John Doe"
                                                                                                avatar={Avatar}/>);
