import React from 'react';
import {storiesOf} from '@storybook/react';

import FoodImage from '../../../../static/bleuclair.PNG';

storiesOf('PopularCategoriesCard', module).add('to Storybook', () => <PopularCategoriesCard img={FoodImage}
                                                                                            categorie="cuisine"
                                                                                            desc="Parce que quand on a faim, faut manger"/>);
