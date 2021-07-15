import React from "react";
import { Room } from "../models/Room";
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
}));

interface Props {
	room: Room;
}

const RoomItem: React.FC<Props> = ({ room }) => {
	const classes = useStyles();

	return (
		<Card className={classes.card} elevation={3}>
			<CardActionArea>
				<CardContent>
					<Typography variant="body1" color="secondary" gutterBottom>
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
