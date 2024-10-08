import { cookies } from "next/headers";
import { headers } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TaskContent } from "@/components/TaskContent/TaskContent";

async function getTasks() {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = headers().get("host") || "localhost:3000";
  const baseUrl = `${protocol}://${host}`;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const res = await fetch(`${baseUrl}/api/tasks`, {
    cache: "no-store",
    headers: {
      Cookie: cookies().toString(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}

export default async function InboxPage() {
  const initialTasks = await getTasks();
  return <TaskContent initialTasks={initialTasks} />;
}
