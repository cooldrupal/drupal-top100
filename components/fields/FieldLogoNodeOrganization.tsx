import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"

export function FieldLogoNodeOrganization({ value }: any) {
  return value ? (
    <figure className="flex justify-center">
      <Image
        src={absoluteUrl(value.uri.url)}
        width={768}
        height={400}
        alt={value.resourceIdObjMeta.alt || ""}
        priority
      />
    </figure>
  ) : null
}
