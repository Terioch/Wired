import React, { useState } from "react";
import { useScreenSize } from "../../../contexts/screenSizeContext";
import { Popover, List, ListItem, makeStyles } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	dottedMenu: {
		borderRadius: "25px",
		padding: theme.spacing(0.5),
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#dddddd",
		},
	},
	dottedMenuList: {
		backgroundColor: "#f6f6f6",
	},
}));

interface Props {
	getLeaveRoomText: () => {};
	handleLeaveRequest: () => void;
	roomMembers: Array<string>;
}

const DottedMenu: React.FC<Props> = ({
	getLeaveRoomText,
	handleLeaveRequest,
	roomMembers,
}) => {
	const classes = useStyles();
	const { screenWidth } = useScreenSize();

	const [menuAnchor, setMenuAnchor] = useState<any>(null);
	const [membersAnchor, setMembersAnchor] = useState<any>(null);

	return (
		<>
			<MoreVert
				className={classes.dottedMenu}
				style={{ justifySelf: "right" }}
				onClick={(e: React.MouseEvent) => setMenuAnchor(e.currentTarget)}
			/>
			<Popover
				open={Boolean(menuAnchor)}
				anchorEl={menuAnchor}
				onClose={() => setMenuAnchor(null)}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<List className={classes.dottedMenuList}>
					<ListItem
						button
						onClick={(e: React.MouseEvent) =>
							setMembersAnchor(e.currentTarget)
						}
					>
						View Members
					</ListItem>
					{screenWidth < 568 && (
						<ListItem button onClick={handleLeaveRequest}>
							{getLeaveRoomText()}
						</ListItem>
					)}
				</List>
			</Popover>
			<Popover
				open={Boolean(membersAnchor)}
				anchorEl={membersAnchor}
				onClose={() => setMembersAnchor(null)}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<List>
					{roomMembers.map((member, idx) => (
						<ListItem key={idx}>{member}</ListItem>
					))}
				</List>
			</Popover>
		</>
	);
};

export default DottedMenu;
