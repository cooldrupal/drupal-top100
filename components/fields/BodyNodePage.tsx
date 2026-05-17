export function BodyNodePage({ value }: any) {
  return value?.processed ? (
    <div
      dangerouslySetInnerHTML={{ __html: value.processed }}
      className="mt-6 font-serif text-xl leading-loose"
    />
  ) : null
}
