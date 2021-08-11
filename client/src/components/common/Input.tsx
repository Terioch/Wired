import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";

const Input: React.FC<TextFieldProps> = ({
	className,
	label,
	variant,
	size,
	name,
	value,
	onChange,
	error,
	helperText,
	InputProps,
}) => {
	return (
		<TextField
			className={className}
			label={label}
			variant={variant || "standard"}
			color="secondary"
			size={size || "medium"}
			name={name}
			value={value}
			onChange={onChange}
			error={error}
			helperText={helperText}
			InputProps={InputProps}
		/>
	);
};

export default Input;
