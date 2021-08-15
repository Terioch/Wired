import React from "react";
import Spinner from "../common/Spinner";
import { Modal } from "@material-ui/core";

interface Props {}

const LoadingScreen: React.FC<Props> = () => {
	return (
		<Modal open hideBackdrop>
			<Spinner />
		</Modal>
	);
};

export default LoadingScreen;
