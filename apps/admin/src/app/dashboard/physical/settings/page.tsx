import { redirect } from "next/navigation";

export default function PhysicalSettingsRedirectPage() {
  redirect("/dashboard/settings");
}
