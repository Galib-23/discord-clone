"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Label } from "../ui/label";


const InviteModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "invite";



  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden px-6 pt-8">
        <DialogHeader className="">
          <DialogTitle className="text-2xl text-center font-bold">Invite friends</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label>
            Server Invite Link
          </Label>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default InviteModal