import type { DrupalNode } from "next-drupal"
import { Field } from "@/components/drupal/Field"

interface BasicPageProps {
  node: DrupalNode
}

export function BasicPage({ node, ...props }: BasicPageProps) {
  return (
    <article {...props}>
      <Field name="body" node={node} />
    </article>
  )
}
