import { isEmpty } from "@/lib/utils"
import { BodyNodePage } from "@/components/fields/BodyNodePage"
import { FieldTeaserNodeOrganization } from "@/components/fields/FieldTeaserNodeOrganization"
import { FieldLogoNodeOrganization } from "@/components/fields/FieldLogoNodeOrganization"
import { FieldPartnerNodeOrganization } from "@/components/fields/FieldPartnerNodeOrganization"
import { FieldCountriesNodeOrganization } from "@/components/fields/FieldCountriesNodeOrganization"
import { FieldCountriesNodeOrganizationCareer } from "@/components/fields/FieldCountriesNodeOrganizationCareer"
import { FieldWebsiteNodeOrganization } from "@/components/fields/FieldWebsiteNodeOrganization"
import { FieldCareerNodeOrganization } from "@/components/fields/FieldCareerNodeOrganization"

interface FieldProps {
  name: string;
  node: any;
  view?: string;
}

const componentsMap: Record<string, any> = {
  "node--page--body": BodyNodePage,
  "node--organization--field-teaser": FieldTeaserNodeOrganization,
  "node--organization--field-logo": FieldLogoNodeOrganization,
  "node--organization--field-partner": FieldPartnerNodeOrganization,
  "node--organization--field-countries": FieldCountriesNodeOrganization,
  "node--organization--field-countries--career": FieldCountriesNodeOrganizationCareer,
  "node--organization--field-website": FieldWebsiteNodeOrganization,
  "node--organization--field-career": FieldCareerNodeOrganization,
};

export function Field({ name, node, view }: FieldProps) {
  const data = node.attributes ?? node;
  let field = `${node.type}--${name.replaceAll("_", "-") }`
  if (view) {
    field = `${field}--${view.replaceAll("_", "-")}`
  }

  const Component = componentsMap[field]
  return Component && !isEmpty(data[name]) ? <Component value={data[name]} /> : null;
}
