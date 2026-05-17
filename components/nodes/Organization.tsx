import type { DrupalNode } from "next-drupal"
import { Field } from "@/components/drupal/Field"

interface OrganizationProps {
  node: DrupalNode
}

export function Organization({ node, ...props }: OrganizationProps) {
  const fields = [
    "field_logo",
    "field_teaser",
    "field_partner",
    "field_countries",
    "field_website",
    "field_career",
  ];

  return (
    <article {...props} className="mb-6">
      {fields.map((name) => (
        <Field key={name} name={name} node={node} />
      ))}
    </article>
  )
}
