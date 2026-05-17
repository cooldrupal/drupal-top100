import { Link } from "@/components/navigation/Link"

export function FieldWebsiteNodeOrganization({ value }: any) {
  return value && value.uri ? (
    <>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <div className="font-semibold">Website:</div>
        <Link href={value.uri} target="_blank" rel="noopener noreferrer" className="no-underline">
          <span className="text-blue-800 hover:text-orange-600 font-lg">{value.uri}</span>
        </Link>
      </div>
    </>
  ) : null
}
