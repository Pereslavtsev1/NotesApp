"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { ChevronsDown, LogOut } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import UserItem from "../user-item/user-item";

export default function AppSidebarNavUser({
  preloadedUserQuery,
}: {
  preloadedUserQuery: Preloaded<typeof api.user.getCurrentUser>;
}) {
  const user = usePreloadedQuery(preloadedUserQuery);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative flex w-full items-center justify-start gap-x-2 px-2 font-semibold text-muted-foreground"
          variant="ghost"
          size="lg"
        >
          <UserItem
            src={user.image || ""}
            alt={user.username || user.displayUsername || ""}
          />
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-xs text-muted-foreground">
              {user.name}
            </span>
          </div>
          <div className="absolute right-3">
            <ChevronsDown className="size-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-72 p-2`}
        side="bottom"
        align="start"
        sideOffset={8}
      >
        <div className="mb-2 flex items-center gap-3 rounded-md">
          <UserItem
            src={user.image || ""}
            alt={user.username || user.displayUsername || ""}
          />
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-xs font-semibold text-muted-foreground">
              {user.name}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <Button
          variant="ghost"
          className="w-full justify-start text-xs font-semibold text-muted-foreground transition-colors duration-300 hover:text-destructive"
        >
          <LogOut className="size-4" />
          Sign Out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
