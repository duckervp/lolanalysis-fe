export const convertMatch = (matchData) => {
  if (!matchData) return {};
  const participantDetails = matchData.info.participants.map((participant) => ({
    win: participant.win,
    kills: participant.kills,
    deaths: participant.deaths,
    assists: participant.assists,
    championName: participant.championName,
    championLevel: participant.champLevel,
    goldEarned: participant.goldEarned,
    totalMinionsKilled: participant.totalMinionsKilled,
    items: [
      participant.item0,
      participant.item1,
      participant.item2,
      participant.item3,
      participant.item4,
      participant.item5,
      participant.item6,
    ],
    spellD: participant.summoner1Id,
    spellF: participant.summoner2Id,
    riotIdGameName:
      participant.riotIdGameName || participant.riotIdName || participant.summonerName,
    riotIdTagline: participant.riotIdTagline,
    puuid: participant.puuid,
    teamId: participant.teamId,
    primaryRuneId: getParticipantRuneId(participant),
  }));

  return {
    matchId: matchData.metadata.matchId,
    gameCreation: matchData.info.gameCreation,
    gameDuration: matchData.info.gameDuration,
    gameMode: matchData.info.gameMode,
    mapId: matchData.info.mapId,
    participantDetails,
  };
};

const getParticipantRuneId = (participant) => {
  const styles = participant?.perks?.styles;
  let runeId = 0;
  styles?.forEach((element) => {
    if (element.description === 'primaryStyle') {
      runeId = element.selections[0]?.perk;
    }
  });

  return runeId;
};
