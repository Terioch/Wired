import React, { useState } from "react";
import { useScreenSize } from "../../contexts/screenSizeContext";
import usePopover from "../../controls/usePopover";
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
}

const DottedMenu: React.FC<Props> = ({
	getLeaveRoomText,
	handleLeaveRequest,
}) => {
	const classes = useStyles();
	const { screenWidth } = useScreenSize();
	const { anchor, handleAnchorOpen, handleAnchorClose } = usePopover();

	const [displayMembers, setDisplayMembers] = useState(false);

	return (
		<>
			<MoreVert
				className={classes.dottedMenu}
				style={{ justifySelf: "right" }}
				onClick={handleAnchorOpen}
			/>
			<Popover
				open={Boolean(anchor)}
				anchorEl={anchor}
				onClose={handleAnchorClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<List className={classes.dottedMenuList}>
					<ListItem onClick={() => setDisplayMembers(true)}>
						View Members
					</ListItem>
					{screenWidth < 568 && (
						<ListItem button onClick={handleLeaveRequest}>
							{getLeaveRoomText()}
						</ListItem>
					)}
				</List>
			</Popover>
		</>
	);
};

export default DottedMenu;
