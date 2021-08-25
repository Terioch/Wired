import React, { useEffect, useRef } from "react";

interface Props {
	dependencies: any[];
}

const ScrollToBottom: React.FC<Props> = ({ dependencies }) => {
	const element = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (element.current) {
			element.current.scrollIntoView({
				block: "end",
				behavior: "smooth",
			});
		}
	}, dependencies || []);

	return <div ref={element} />;
};

export default ScrollToBottom;
