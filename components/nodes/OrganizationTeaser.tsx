import { Link } from "@/components/navigation/Link"
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"
import { Field } from "@/components/drupal/Field"

export function OrganizationTeaser({ node }: any) {
  return (
    <article className="mb-6">
      <Link href={node.path.alias}>
        {(node.field_logo && node.field_logo.uri) && (
          <figure>
            <Image
              src={absoluteUrl(node.field_logo.uri.url)}
              width={472}
              height={200}
              alt={node.field_logo.resourceIdObjMeta.alt || ""}
              title={node.title}
              priority
            />
          </figure>
        )}
      </Link>
      <Field name="field_teaser" node={node} />
    </article>
  )
}
