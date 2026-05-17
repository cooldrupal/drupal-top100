import { nodesMap } from '@/params/nodes'
import { Organization } from "@/components/nodes/Organization";
import { OrganizationTeaser } from "@/components/nodes/OrganizationTeaser";
import { OrganizationCareer } from "@/components/nodes/OrganizationCareer";
import { BasicPage } from "@/components/nodes/BasicPage";

interface NodeProps {
  node: any;
  view?: string;
}

const componentsMap: Record<string, any> = {
  "node--page": BasicPage,
  "node--organization": Organization,
  "node--organization--teaser": OrganizationTeaser,
  "node--organization--career": OrganizationCareer,
};

export function Node({ node, view }: NodeProps) {
  const data = node.attributes ?? node
  let node_type = node.type
  if (view) {
    node_type = `${node_type}--${view.replaceAll("_", "-")}`
  }

  const Component = componentsMap[node_type]
  return Component ? <Component node={data} /> : null
}

export function getNodeTypes(): string[] {
  return Object.keys(nodesMap())
}

