"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { FileIcon, MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleDeleteNotePermanently, handleRestoreNote } from "@/lib/actions";
import type { Doc } from "../../../../convex/_generated/dataModel";

function getTrashActions(note: Doc<"notes">) {
	return [
		{
			label: "Restore",
			icon: RotateCcw,
			className: "hover:text-green-400",
			onClick: () => handleRestoreNote(note._id),
		},
		{
			label: "Delete permanently",
			icon: Trash2,
			className: "hover:text-destructive",
			onClick: () => handleDeleteNotePermanently([note._id]),
		},
	];
}

export const columns: ColumnDef<Doc<"notes">>[] = [
	{
		id: "select",
		maxSize: 50,
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: "title",
		header: "Title",
		size: 200,
		cell: ({ row }) => {
			const icon = row.original.icon;

			return (
				<span className="flex items-center gap-2 min-w-0">
					{icon ? (
						<span className="text-lg leading-none shrink-0">{icon}</span>
					) : (
						<FileIcon className="size-4 text-muted-foreground shrink-0" />
					)}

					<span className="truncate min-w-0">{row.original.title}</span>
				</span>
			);
		},
	},

	{
		accessorKey: "deletedAt",
		header: "Deleted",
		cell: ({ row }) => {
			const deletedAt = row.getValue<number>("deletedAt");
			if (!deletedAt) return "—";

			const now = Date.now();
			const diff = now - deletedAt;

			const MS_IN_MINUTE = 1000 * 60;
			const MS_IN_HOUR = MS_IN_MINUTE * 60;
			const MS_IN_DAY = MS_IN_HOUR * 24;

			if (diff >= MS_IN_DAY) {
				const days = Math.floor(diff / MS_IN_DAY);
				return `${days} day${days > 1 ? "s" : ""} ago`;
			}

			if (diff >= MS_IN_HOUR) {
				const hours = Math.floor(diff / MS_IN_HOUR);
				return `${hours} hour${hours > 1 ? "s" : ""} ago`;
			}

			const minutes = Math.floor(diff / MS_IN_MINUTE);
			return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
		},
	},

	{
		header: "Days left",
		cell: ({ row }) => {
			const deletedAt = row.getValue<number>("deletedAt");
			if (!deletedAt) return "—";

			const DAYS_TO_DELETE = 30;
			const MS_IN_DAY = 1000 * 60 * 60 * 24;

			const deleteAt = deletedAt + DAYS_TO_DELETE * MS_IN_DAY;
			const diff = deleteAt - Date.now();

			const daysLeft = diff <= 0 ? 0 : Math.ceil(diff / MS_IN_DAY);

			return <span>{daysLeft} days</span>;
		},
	},

	{
		id: "actions",
		cell: ({ row }) => {
			const note = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="size-8 p-0">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="start" className="flex flex-col">
						{getTrashActions(note).map(
							({ label, icon: Icon, onClick, className }) => (
								<Button
									variant="ghost"
									key={label}
									onClick={onClick}
									className={`${className} justify-start text-sm font-medium text-muted-foreground `}
								>
									<Icon className="size-4" />
									{label}
								</Button>
							),
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
