"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import FileUpload from "../file-upload"
import axios from 'axios';
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal-store"
import queryString from "query-string"

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is requierd"
  })
})

const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { apiUrl, query } = data;

  const isModalOpen = isOpen && type === "messageFile";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  }

  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = queryString.stringifyUrl({
        url: apiUrl || "",
        query
      })
      await axios.post(url, {
        ...values,
        content: values.fileUrl
      });
      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden px-6 pt-8">
        <DialogHeader className="">
          <DialogTitle className="text-2xl text-center font-bold">Add an attachment</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a file as a message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="messageFile"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="py-4">
              <Button variant="primary" disabled={isLoading} type="submit">Send</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  )
}

export default MessageFileModal