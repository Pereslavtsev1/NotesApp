"use client";

import {
	ChevronRight,
	Copy,
	MoreHorizontal,
	Plus,
	Star,
	StarOff,
	Trash2,
} from "lucide-react";
import {
	handleAddChildren,
	handleDelete,
	handleDuplicate,
	handleFavorite,
} from "@/lib/actions";
import { cn } from "@/lib/utils";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type NoteButtonProps = {
	note: Doc<"notes">;
	expanded?: boolean;
	onExpand?: () => void;
	style?: React.CSSProperties;
};

const getActionsList = (note: Doc<"notes">, onExpand?: () => void) => [
	{
		label: "Add children",
		icon: Plus,
		className: "hover:text-green-500",
		onClick: () => handleAddChildren(note._id).then(onExpand),
	},
	{
		label: note.isFavorite ? "Remove from favorite" : "Mark as favorite",
		icon: note.isFavorite ? StarOff : Star,
		className: "hover:text-yellow-500",
		onClick: () => {
			handleFavorite({
				id: note._id,
				isFavorite: !note.isFavorite,
				recursive: true,
			});
		},
	},
	{
		label: "Duplicate",
		icon: Copy,
		className: "hover:text-blue-500",
		onClick: () => handleDuplicate(note._id),
	},
	{
		label: "Delete",
		icon: Trash2,
		className: "hover:text-destructive",
		onClick: () => handleDelete(note._id),
	},
];

export default function NoteButton({
	note,
	expanded,
	onExpand,
	style,
	...props
}: NoteButtonProps & React.ComponentProps<"button">) {
	return (
		<DropdownMenu>
			<Button
				className="flex w-full items-center justify-between px-2 text-sm font-medium text-muted-foreground"
				variant="ghost"
				style={style}
				{...props}
			>
				<div className="flex items-center gap-2">
					<div
						onClick={(e) => {
							e.stopPropagation();
							onExpand?.();
						}}
						className="flex size-6 shrink-0 items-center justify-center rounded transition hover:bg-accent/20"
					>
						<ChevronRight
							className={cn(
								"size-4 text-muted-foreground duration-300 transition-transform",
								expanded && "rotate-90",
							)}
						/>
					</div>
					<span className="truncate">{note.title}</span>
				</div>

				<DropdownMenuTrigger asChild>
					<div className="flex h-6 w-6 items-center justify-center rounded p-1 transition hover:bg-sidebar-accent/20">
						<MoreHorizontal className="h-4 w-4" />
					</div>
				</DropdownMenuTrigger>
			</Button>

			<DropdownMenuContent align="start" className="flex flex-col">
				{getActionsList(note, onExpand).map(
					({ label, icon: Icon, className, onClick }) => (
						<Button
							key={label}
							variant="ghost"
							className={`${className} justify-start text-sm font-medium text-muted-foreground`}
							onClick={onClick}
						>
							<Icon className="size-4" />
							{label}
						</Button>
					),
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
