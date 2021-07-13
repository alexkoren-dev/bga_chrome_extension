import { bgaUrl, bgaExtensionUrlSignature } from "../constants";
import { isPlayerActiveOnTableFromGlobalUserInfos } from "../isPlayerActiveOnTableFromGlobalUserInfos";

export function transformTable({
  currentPlayerId,
  globalUserInfos,
  translations,
  assetsUrl,
  table,
  tableInfos,
}) {
  const {
    id: tableId,
    players,
    game_name: gameNameKey,
    gameserver: gameServer,
    table_creator: tableCreator,
  } = table;
  const {
    gameversion: gameVersion,
    status,
    max_player: nbMaxPlayers,
  } = tableInfos;

  return {
    acceptInviteLink: `${bgaUrl}/table/table/joingame.html?table=${tableId}&${bgaExtensionUrlSignature}`,
    declineInviteLink: `${bgaUrl}/table/table/refuseInvitation.html?table=${tableId}&${bgaExtensionUrlSignature}`,
    gameName: translations[`${gameNameKey}_displayed`],
    isOpenForPlayers: status === "asyncopen",
    link: `${bgaUrl}/${gameServer}/${gameNameKey}?table=${tableId}`,
    nbMaxPlayers,
    tableCreatorName: players[tableCreator].fullname,
    tableId,
    tableImg: `${assetsUrl}games/${gameNameKey}/${gameVersion}/img/game_icon.png`,
    players: Object.keys(players).map((playerKey) => {
      const { fullname: playerName, id: playerId, table_status } = players[
        playerKey
      ];
      const isCurrentPlayer = currentPlayerId === playerId;
      const isActivePlayer = isPlayerActiveOnTableFromGlobalUserInfos({
        playerId,
        tableId,
        globalUserInfos,
      });
      const isInvitePending = table_status === "expected";

      // Player
      return {
        playerId,
        playerName,
        isActivePlayer,
        isCurrentPlayer,
        isInvitePending,
      };
    }),
  };
}

export function transformTables({
  currentPlayerId,
  globalUserInfos,
  translations,
  assetsUrl,
  tables,
  tablesInfos,
}) {
  return tables.map((table) =>
    transformTable({
      currentPlayerId,
      globalUserInfos,
      translations,
      assetsUrl,
      table,
      tableInfos: tablesInfos[tableId],
    })
  );
}
