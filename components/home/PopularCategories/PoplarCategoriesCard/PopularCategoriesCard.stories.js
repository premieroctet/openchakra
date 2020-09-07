import React from 'react';
import {storiesOf} from '@storybook/react';
import PopularCategoriesCard from './PopularCategoriesCard';

import FoodImage from '../../../../static/monika-grabkowska-759473-unsplash.jpg';

storiesOf('PopularCategoriesCard', module).add('to Storybook', () => <PopularCategoriesCard img={FoodImage} categorie="cuisine" desc="Parce que quand on a faim, faut manger" />);
