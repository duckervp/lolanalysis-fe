// import axios from 'axios';

import { DDRAGON_URL } from 'src/app-config';

import { getData } from './cache';

const fetchAsset = async (asset, version) => {
  if (!asset || !version) return undefined;
  const url = `${DDRAGON_URL}/${version}/data/en_US/${asset}.json`;
  // const { data } = await axios.get(url);
  const data = await getData(url);
  return data;
};

export const fetchVersion = async () => {
  const url = `https://ddragon.leagueoflegends.com/api/versions.json`;
  const data = await getData(url);
  return data;
};

export const getChampionImageUrl = async (champion, version) => {
  if (!champion || !version) return undefined;
  
  const asset = await fetchAsset('champion', version);
  if (!asset) return undefined;
  
  if (champion === 'FiddleSticks') {
    champion = 'Fiddlesticks';
  }
  
  if (asset.data[champion]) {
    const { full, group } = asset.data[champion].image;
    return `${DDRAGON_URL}/${version}/img/${group}/${full}`;
  }

  return undefined;
};

export const getChampionNameByChampionId = async (championId, version) => {
  if (!championId || !version) return undefined;

  const asset = await fetchAsset('champion', version);
  if (!asset) return undefined;

  let name1 = '';
  Object.values(asset.data).forEach((champion) => {
    if (champion.key === `${championId}`) {
      const { name } = champion;
      name1 = name;
    }
  });
  return name1 === '' ? undefined : name1;
};

export const getChampionImageByChampionId = async (championId, version) => {
  if (!championId || !version) return undefined;
  
  const asset = await fetchAsset('champion', version);
  if (!asset) return undefined;

  let url = '';
  Object.values(asset.data).forEach((champion) => {
    if (champion.key === `${championId}`) {
      const { full, group } = champion.image;
      url = `${DDRAGON_URL}/${version}/img/${group}/${full}`;
    }
  });

  return url === '' ? undefined : url;
};

export const getItemImageUrl = async (item, version) => {
  if (!item || !version) return undefined;

  const asset = await fetchAsset('item', version);
  if (!asset) return undefined;

  if (asset.data[item]) {
    const { full, group } = asset.data[item].image;
    return `${DDRAGON_URL}/${version}/img/${group}/${full}`;
  }

  return undefined;
};

export const getSummonerImageUrl = async (summonerId, version) => {
  if (!summonerId || !version) return undefined;
  
  const asset = await fetchAsset('summoner', version);
  if (!asset) return undefined;
  
  const summoners = asset.data;
  const selectedSummoner = Object.values(summoners).filter(
    (summoner) => parseInt(summoner.key, 10) === summonerId
  )[0];

  if (selectedSummoner) {
    const { full, group } = selectedSummoner.image;
    return `${DDRAGON_URL}/${version}/img/${group}/${full}`;
  }

  return undefined;
};

export const getProfileIconImageUrl = async (profileIconId, version) => {
  if (!profileIconId || !version) return undefined;
  
  const asset = await fetchAsset('profileicon', version);
  if (!asset) return undefined;
  
  const profileIcon = `${profileIconId}`;
  if (asset.data[profileIcon]) {
    const { full, group } = asset.data[profileIcon].image;
    return `${DDRAGON_URL}/${version}/img/${group}/${full}`;
  }

  return undefined;
};

export const getMapName = async (mapId, version) => {
  if (!mapId || !version) return undefined;

  const asset = await fetchAsset('map', version);
  if (!asset) return undefined;

  if (asset.data[mapId]) {
    return asset.data[mapId].MapName;
  }

  return undefined;
};

export const getMapIconUrl = async (mapId, version) => {
  if (mapId === 11) {
    return "src/assets/icon_summoner's_rift.png";
  }

  if (mapId === 12) {
    return 'src/assets/icon_howling_abyss.png';
  }

  return 'src/assets/icon_featured_game_mode.png';
};

export const getRunesIconImageUrl = async (runeId, version) => {
  if (!runeId || !version) return undefined;

  const asset = await fetchAsset('runesReforged', version);
  if (!asset) return undefined;

  let iconImageUrl = '';

  asset?.forEach((item) => {
    item.slots[0]?.runes?.forEach((rune) => {
      if (rune?.id === runeId) {
        iconImageUrl = `${DDRAGON_URL}/img/${rune?.icon}`;
      }
    });
  });

  return iconImageUrl === '' ? undefined : iconImageUrl;
};
