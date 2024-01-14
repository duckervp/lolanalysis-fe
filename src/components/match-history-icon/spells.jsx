import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import { getSummonerImageUrl } from 'src/utils/riot-image-asset';

import ImageIcon from '../image-icon';

export default function Spells({ version, spellD, spellF, width, height, direction }) {
  const style = {
    width,
    height,
    flexShrink: 0,
  };
  return (
    <Stack sx={{ border: '1px solid SlateGrey', mt: 0.5 }} direction={direction}>
      <ImageIcon type="Spell D" id={spellD} version={version} getImageIconById={getSummonerImageUrl} sx={style} />
      <ImageIcon type="Spell F" id={spellF} version={version} getImageIconById={getSummonerImageUrl} sx={style} />
    </Stack>
  );
}

Spells.propTypes = {
  version: PropTypes.string,
  spellD: PropTypes.number,
  spellF: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  direction: PropTypes.string,
};
