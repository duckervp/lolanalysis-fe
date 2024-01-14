import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import { ItemBox } from 'src/components/match-history-icon';

export default function ItemBoxList({ items, version, width, height }) {
  return (
    <Stack direction="row" alignItems="center">
      {items?.map((item) => (
        <ItemBox
          key={`item-${item}-${Math.random()}`}
          itemId={item}
          version={version}
          width={width}
          height={height}
        />
      ))}
    </Stack>
  );
}

ItemBoxList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number),
  version: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
