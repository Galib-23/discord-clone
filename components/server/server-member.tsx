"use client"

import { Member, MemberRole, Profile, Server } from "@prisma/client"
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ServerMemberProps {
  member: Member & { profile: Profile};
  server: Server
}

const roleIconMap = { 
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-indigo-500" />,
}

const ServerMember = ({
  member, 
  server
}: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  return (
    <div>
      
    </div>
  )
}

export default ServerMember