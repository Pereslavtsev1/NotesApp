"use client";
import { usePaginatedQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/use-search";
import { api } from "../../../../convex/_generated/api";

const ITEMS = 10;

export default function SearchModal() {
	const { open, setOpen } = useSearch();
	const router = useRouter();

	const [searchInput, setSearchInput] = useState("");
	const [debouncedSearch] = useDebounce(searchInput, 300);

	const { ref, inView } = useInView({
		rootMargin: "200px",
	});

	const { results, status, loadMore, isLoading } = usePaginatedQuery(
		api.notes.findAllNotes,
		{ search: debouncedSearch, isDeleted: false },
		{ initialNumItems: ITEMS },
	);

	useEffect(() => {
		if (inView && status === "CanLoadMore") {
			loadMore(ITEMS);
		}
	}, [inView, status, loadMore]);

	const showEmpty =
		!isLoading && results.length === 0 && debouncedSearch.trim().length > 0;

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput
				className="font-medium text-muted-foreground"
				placeholder="Search notes..."
				value={searchInput}
				onValueChange={setSearchInput}
			/>

			<CommandList>
				{showEmpty && (
					<CommandEmpty className="py-6 text-center text-sm font-medium text-muted-foreground">
						No notes found for “{debouncedSearch}”
					</CommandEmpty>
				)}

				<CommandGroup>
					{results.map((note) => (
						<CommandItem
							key={note._id}
							value={note.title}
							onSelect={() => {
								router.push(`/notes/${note._id}`);
								setOpen(false);
							}}
						>
							<div className="flex w-full items-center justify-between gap-x-2">
								<div className="flex items-center gap-x-2">
									{note.icon ? (
										<span>{note.icon}</span>
									) : (
										<FileIcon className="h-4 w-4" />
									)}
									<p className="max-w-40 truncate font-semibold">
										{note.title}
									</p>
								</div>

								<span className="text-sm text-muted-foreground">
									{new Date(note._creationTime).toLocaleDateString()}
								</span>
							</div>
						</CommandItem>
					))}

					{isLoading &&
						Array.from({ length: ITEMS }).map((_, i) => (
							<CommandItemSkeleton key={i} />
						))}
				</CommandGroup>
				<div ref={ref} />
			</CommandList>
		</CommandDialog>
	);
}

function CommandItemSkeleton() {
	return (
		<CommandItem disabled className="pointer-events-none">
			<div className="flex w-full items-center justify-between gap-x-2">
				<div className="flex items-center gap-x-2">
					<Skeleton className="h-4 w-4 rounded" />
					<Skeleton className="h-4 w-32" />
				</div>
				<Skeleton className="h-3 w-20" />
			</div>
		</CommandItem>
	);
}
