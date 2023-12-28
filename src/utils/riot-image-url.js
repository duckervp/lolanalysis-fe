import mapAsset from "src/assets/map.json";
import itemAsset from "src/assets/item.json";
import championAsset from "src/assets/champion.json";
import summonerAsset from "src/assets/summoner.json";
import profileIconAsset from "src/assets/profileicon.json";
import { DDRAGON_URL, LOL_CURRENT_VERSION } from "src/app-config"

export const getChampionImageUrl = (champion) => {
    if (championAsset.data[champion]) {
        const {full, group} = championAsset.data[champion].image;
        return `${DDRAGON_URL}/${LOL_CURRENT_VERSION}/img/${group}/${full}`
    }
    return undefined;
} 

export const getItemImageUrl = (item) => {
    if (itemAsset.data[item]) {
        const {full, group} = itemAsset.data[item].image;
        console.log(full, group);
        return `${DDRAGON_URL}/${LOL_CURRENT_VERSION}/img/${group}/${full}`
    }
    return undefined;
} 

export const getSummonerImageUrl = (summonerId) => {
    const summoners = summonerAsset.data;

    const selectedSummoner = Object.values(summoners).filter(summoner => parseInt(summoner.key, 10) === summonerId)[0];

    if (selectedSummoner) {
        const {full, group} = selectedSummoner.image;
        return `${DDRAGON_URL}/${LOL_CURRENT_VERSION}/img/${group}/${full}`
    }
    return undefined;
} 

export const getProfileIconImageUrl = (profileIconId) => {
    const profileIcon = `${profileIconId}`;

    if (profileIconAsset.data[profileIcon]) {
        const {full, group} = profileIconAsset.data[profileIcon].image;
        return `${DDRAGON_URL}/${LOL_CURRENT_VERSION}/img/${group}/${full}`
    }
    return undefined;
} 

export const getMapName = (mapId) => {
    if (mapAsset.data[mapId]) {
        return mapAsset.data[mapId].MapName;
    }
    return undefined;
}

