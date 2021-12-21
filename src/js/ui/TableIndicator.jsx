// @flow

import { cn } from "./utils/cn";

function getIncatorClassnames({
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isWaitingCurrentPlayer,
}) {
	if (isWaitingCurrentPlayer) {
		return "bg-bgaGreen animate-pulse-0.5";
	}

	if (isInvitePendingForCurrentPlayer) {
		return "bg-bgaOrange animate-pulse-0.5";
	}

	if (isOpenForPlayers) {
		return "bg-bgaOrange";
	}

	return "bg-bgaBlue-lighter";
}

type Props = {
	isInvitePendingForCurrentPlayer: boolean,
	isOpenForPlayers: boolean,
	isWaitingCurrentPlayer: boolean,
};

export function TableIndicator({
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isWaitingCurrentPlayer,
}: Props): React$Element<"div"> {
	return (
		<div
			className={cn([
				"absolute",
				getIncatorClassnames({
					isInvitePendingForCurrentPlayer,
					isOpenForPlayers,
					isWaitingCurrentPlayer,
				}),
				"h-full",
				"left-0",
				"right-0",
				"top-0",
				"transform",
				"w-2",
			])}
		/>
	);
}
