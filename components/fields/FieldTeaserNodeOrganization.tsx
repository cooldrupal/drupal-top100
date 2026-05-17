export function FieldTeaserNodeOrganization({ value }: any) {
  return value ? (
    <div
      dangerouslySetInnerHTML={{ __html: value }}
      className="mt-4 font-serif text-xl leading-loose prose"
    />
  ) : null
}
