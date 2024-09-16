"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import queryString from "query-string";


const DeleteMessageModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModal();
  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === "deleteMessage";

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = queryString.stringifyUrl({
        url: apiUrl || "",
        query
      })
      await axios.delete(url);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden px-6 pt-8">
        <DialogHeader className="">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            <span className="font-semibold">Are you sure you want to delete?</span> <br />
            The message will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="primary"
              onClick={onClick}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default DeleteMessageModal