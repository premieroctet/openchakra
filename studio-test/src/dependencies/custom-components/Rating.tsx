import React, { useState, useEffect } from "react";
import lodash from 'lodash'
import { Box, Icon, Stack } from '@chakra-ui/react'
import * as icons from 'lucide-react'


const Rating = React.forwardRef(
  ({
    value = 2,
    size = 20,
    illu = 'Star',
    scale = 5,
    fillColor = 'gold',
    strokeColor = 'gray',
    onChange,
    readOnly,
    ...props
  }: {
    value: number
    size: number
    illu: string
    scale: number
    fillColor: string
    strokeColor: string,
    onChange: any,
    readOnly: boolean,
  }, ref) => {

    const [rating, setRating] = useState(value);

    useEffect(()=> {
      if (onChange) {
        const event={target:{value: rating}}
        onChange(event)
      }
    }, [rating])

    const onClick = (idx:number) => {
      if (readOnly) {
        return
      }
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0);
        } else {
          setRating(idx);
        }
      }
    };

    const RatingIcon = ({ fill }:{fill:boolean}) => {
      return (
       <Icon
          as={lodash.get(icons, illu)}
          name={illu}
          boxSize={`${size}px`}
          stroke={strokeColor}
          fillOpacity={fill ? "100%" : "0"}
          fill={fillColor}
        />
      );
    };

    const RatingButton = ({ idx, fill }: {idx: number, fill:boolean}) => {
      return (
        <Box
          as="button"
          aria-label={`Notez ${idx}`}
          height={`${size}px`}
          width={`${size}px`}
          mx={1}
          onClick={() => onClick(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} />
        </Box>
      );
    };

    return (
      <Stack isInline justify="center" {...props} >
        {/* @ts-ignore */}
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {lodash.range(1, scale+1).map(i => (
          <RatingButton key={i} idx={i} fill={i <= rating} />
        ))}
      </Stack>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;
