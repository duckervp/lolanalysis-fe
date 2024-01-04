export const convertMatch = (matchData) => {
    const participantDetails = matchData.info.participants.map((participant) => ({
      win: participant.win,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      championName: participant.championName,
      championLevel: participant.champLevel,
      goldEarned: participant.goldEarned,
      totalMinionsKilled: participant.totalMinionsKilled,
      item0: participant.item0,
      item1: participant.item1,
      item2: participant.item2,
      item3: participant.item3,
      item4: participant.item4,
      item5: participant.item5,
      item6: participant.item6,
      spellD: participant.summoner1Id,
      spellF: participant.summoner2Id,
      riotIdGameName:
        participant.riotIdGameName || participant.riotIdName || participant.summonerName,
      riotIdTagline: participant.riotIdTagline,
      puuid: participant.puuid,
      teamId: participant.teamId,
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