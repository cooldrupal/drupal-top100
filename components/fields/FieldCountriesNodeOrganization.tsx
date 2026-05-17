import { Link } from "@/components/navigation/Link"

export function FieldCountriesNodeOrganization({ value }: any) {
  return value ? (
    <>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <div className="font-semibold">Countries:</div>
        {value.map((country: any) => (
          <span key={country.id}>
            <Link href={country.path.alias} className="no-underline">
              <span className="text-blue-800 hover:text-orange-600 font-lg">{country.name}</span>
            </Link>
          </span>
        ))}
      </div>
    </>
  ) : null
}
