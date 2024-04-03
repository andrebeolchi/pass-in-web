import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button"> {
	transparent?: boolean;
}

export function IconButton({ transparent, disabled, ...rest }: IconButtonProps) {
	return (
		<button
			className={twMerge(
				"border border-white/10 rounded-md p-1.5 transition-colors ease-out duration-200",
				transparent ? "bg-black/20 hover:bg-white/5" : "bg-white/10 hover:bg-white/15",
				disabled ? "opacity-50 cursor-default" : "cursor-pointer"
			)}
			{...rest}
		/>
	);
}
