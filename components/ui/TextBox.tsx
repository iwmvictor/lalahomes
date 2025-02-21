"use client";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type React from "react";
import type { FC } from "react";
import type { Control } from "react-hook-form";

interface ITextBox {
	type: string;
	control: Control<any, any>;
	name: string;
	placeholder: string;
	label?: string;
	// eslint-disable-next-line no-unused-vars
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextBox: FC<ITextBox> = ({
	control,
	name,
	type,
	placeholder,
	...props
}) => {
	return (
		<>
			<FormField
				control={control}
				name={name}
				render={({ field: { onChange, ...rest }, fieldState }) => (
					<FormItem>
						{props.label && (
							<FormLabel className="text-gray-500 text-xs">
								{props.label}
							</FormLabel>
						)}
						<FormControl>
							{type === "file" ? (
								<input
									onChange={(e) => {
										props.onChange?.(e);
									}}
									className={cn(
										`flex  w-full rounded-md border  ${
											fieldState?.invalid
												? "border-destructive"
												: "border-input"
										} bg-background px-3 py-3 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50`,
									)}
									type="file"
								/>
							) : (
								<Input
									onChange={(e) => {
										onChange(e);
										props.onChange?.(e);
									}}
									type={type}
									placeholder={placeholder}
									fieldstate={fieldState}
									{...rest}
								/>
							)}
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};

export default TextBox;
