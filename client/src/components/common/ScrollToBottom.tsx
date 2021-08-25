import React, { useRef, useEffect } from "react";

interface Props {}

const ScrollToBottom: React.FC<Props> = () => {
	const element = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (element.current) {
			element.current.scrollIntoView();
		}
	});

	return <div ref={element} />;
};

export default ScrollToBottom;
