"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";

const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
}

const MemberModal = () => {
  const [loadingId, setLoadingId] = useState("");
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const { server } = data as { server: ServerWithMembersWithProfiles };
  const isModalOpen = isOpen && type === "member";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden px-6 pt-8">
        <DialogHeader className="">
          <DialogTitle className="text-2xl text-center font-bold">Manage Members</DialogTitle>
          <DialogDescription
            className="text-center text-zinc-500"
          >
            {
              server?.members?.length
            }
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {
            server?.members?.map((member) => (
              <div key={member.id} className="flex items-center mb-6 gap-x-2">
                <UserAvatar
                  src={member.profile.imageUrl}
                />
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-semibold flex items-center gap-x-1">
                    {member.profile.name}
                    {roleIconMap[member.role]}
                  </div>
                  <p className="text-xs text-zinc-500">
                    {member.profile.email}
                  </p>
                </div>
                {
                  server.profileId !== member.profileId && loadingId !== member.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-zinc-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <ShieldQuestion className="h-4 w-4 mr-2" />
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Guest
                                  {
                                    member.role === "GUEST" && (
                                      <Check className="h-4 w-4 ml-auto" />
                                    )
                                  }
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ShieldCheck className="h-4 w-4 mr-2" />
                                  Moderator
                                  {
                                    member.role === "MODERATOR" && (
                                      <Check className="h-4 w-4 ml-auto" />
                                    )
                                  }
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Gavel className="h-4 w-4 mr-2" />
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )
                }
                {
                  loadingId === member.id && (
                    <Loader2 
                      className="animate-spin text-zinc-500 ml-auto w-4 h-4"
                    />
                  )
                }
              </div>
            ))
          }
        </ScrollArea>
      </DialogContent>
    </Dialog>

  )
}

export default MemberModal