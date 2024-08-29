import { currentProfile } from "@/lib/current-profile"
import { redirect } from "next/navigation";

interface ServerSidebarProps {
  serverId: string
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {

  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }

  return (
    <div>ServerSidebar</div>
  )
}

export default ServerSidebar