import { StorefrontSettingsPage } from "@/components/StorefrontSettingsPage";

export default function SettingsPage() {
  return (
    <StorefrontSettingsPage
      storefronts={[
        {
          id: "digital",
          name: "Raketech",
          previewHref:
            process.env.NEXT_PUBLIC_DIGITAL_STOREFRONT_URL ?? "http://127.0.0.1:3000",
        },
        {
          id: "physical",
          name: "Raketech 3D",
          previewHref:
            process.env.NEXT_PUBLIC_PHYSICAL_STOREFRONT_URL ?? "http://127.0.0.1:3001",
        },
      ]}
    />
  );
}
