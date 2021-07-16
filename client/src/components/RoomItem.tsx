import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Room } from "../models/Room";
import { useAuth } from "../contexts/authContext";
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	card: {
		backgroundColor: "#27262C",
	},
	title: {
		color: "#ffffff",
	},
	admin: {
		fontWeight: "bold",
	},
}));

interface Props {
	room: Room;
}

const RoomItem: React.FC<Props> = ({ room }) => {
	const classes = useStyles();
	const history = useHistory();
	const { isAuthenticated } = useAuth();

	const handleRoomRoute = () => {
		history.push(`/room/${room.slug}`);
	};

	return (
		<Card className={classes.card} elevation={3} onClick={handleRoomRoute}>
			<CardActionArea>
				<CardContent>
					<Typography
						className={classes.admin}
						variant="body1"
						color="secondary"
						gutterBottom
					>
						Admin: {room.admin}
					</Typography>
					<Typography className={classes.title} variant="h5" gutterBottom>
						{room.name}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default RoomItem;
