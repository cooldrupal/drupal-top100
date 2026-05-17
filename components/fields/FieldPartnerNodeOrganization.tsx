import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"
import { Link } from "@/components/navigation/Link"

export function FieldPartnerNodeOrganization({ value }: any) {
  return value ? (
    <>
      <div className="font-semibold">Badge:</div>
      <Link href={value.path.alias}>
        <div className="relative w-[100px] h-[100px]">
          <Image
            src={absoluteUrl(value.field_logo.uri.url)}
            alt={value.name}
            title={value.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </>
  ) : null
}
