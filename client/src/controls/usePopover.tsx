import React, { useState } from "react";

function usePopover() {
	const [anchor, setAnchor] = useState<any>(null);

	const handleAnchorOpen = (e: React.MouseEvent) => {
		setAnchor(e.currentTarget);
	};

	const handleAnchorClose = () => setAnchor(null);

	return {
		anchor,
		handleAnchorOpen,
		handleAnchorClose,
	};
}

export default usePopover;
