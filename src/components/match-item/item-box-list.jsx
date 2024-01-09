import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import { ItemBox } from 'src/components/match-history-icon';

export default function ItemBoxList({ items, width, height }) {
  return (
    <Stack direction="row" alignItems="center">
      {items?.map((item) => (
        <ItemBox
          key={`item-${item}-${Math.random()}`}
          itemId={item}
          width={width}
          height={height}
        />
      ))}
    </Stack>
  );
}

ItemBoxList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number,
  height: PropTypes.number,
};
