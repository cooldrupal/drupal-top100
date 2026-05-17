import { Link } from "@/components/navigation/Link"

export function FieldCountriesNodeOrganizationCareer({ value }: any) {
  return value ? (
    <>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {value.map((country: any) => (
          <span key={country.id}>
            <Link href={country.path.alias}>
              <span className="mb-2 font-light hover:underline text-gray-600 hover:text-orange-600">{country.name}</span>
            </Link>
          </span>
        ))}
      </div>
    </>
  ) : null
}
