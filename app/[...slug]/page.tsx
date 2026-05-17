import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import { drupal } from "@/lib/drupal"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { getMenus } from "@/lib/menu"
import { Block } from "@/components/drupal/Block"
import { Node, getNodeTypes } from "@/components/drupal/Node"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { entityInfo } from "@/lib/utils"
import { getMetatag } from "@/lib/metatag"
import { nodesMap } from "@/params/nodes"
import { getEntityByPath } from "@/lib/entity"
import { getCollection } from "@/lib/collection"
import { Title } from '@/components/drupal/Title'

type PageParams = {
  slug: string[]
}
type PageProps = {
  params: Promise<PageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params
  const { slug } = params

  const entity = await getEntityByPath(slug)
  if (!entity) {
    return {}
  }

  const metatag = getMetatag(entity)
  if (metatag) {
    return metatag
  }

  return {
    title: entity.label,
  }
}

const RESOURCE_TYPES = getNodeTypes()

export async function generateStaticParams(): Promise<PageParams[]> {
  const resources = await drupal.getResourceCollectionPathSegments(
    RESOURCE_TYPES, {}
  )

  return resources.map((resource) => {
    return {
      slug: resource.segments
    }
  })
}

export default async function NodePage(props: PageProps) {
  const params = await props.params
  const { slug } = params

  const entity = await getEntityByPath(slug)
  if (!entity) {
    notFound()
  }

  const breadcrumb = await getBreadcrumb(slug, 'page_header')

  let view,blocks
  const entity_info = entityInfo(entity.type)
  const is_taxonomy = entity_info.entity_type == 'taxonomy_term'
  if (is_taxonomy) {
    const options = {
      params: {
        'views-argument': [entity.drupal_internal__tid],
        include: "field_logo"
      }
    }
    view = await getCollection('view', "taxonomy_term--page_1", options)

    if (view?.results?.length) {
      const node_options = nodesMap(view.results[0].type)
      if (node_options) {
        breadcrumb?.push({
          text: node_options.collection.title,
          url: node_options.collection.path,
        })
      }
    }
    blocks = await getBlocks(slug, ['header', 'footer_top'])
  }
  else {
    blocks = await getBlocks(slug, ['sidebar_second', 'header', 'footer_top'],
      ['block_content', 'views'], { 'current_id': entity.drupal_internal__nid }
    )
  }

  breadcrumb?.push({ text: entity.label, url: '' })
  const menu = await getMenus(slug, ['primary_menu'])

  return (
    <>
    <Header blocks={blocks?.header} menus={menu?.primary_menu} />
    <Title title={entity.label} />
    <Breadcrumb breadcrumb={breadcrumb} />
    {is_taxonomy ? (
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
        {view?.results.map((row: any) => (
          <li key={row.id}>
            <Node node={row} view='teaser' />
          </li>
        ))}
      </ul>
    ) : (
      (() => {
        const hasSidebar = (blocks?.sidebar_second as any[])?.some(
          (block) => block?.results?.length > 0
        ) ?? false;
        return (
          <div className={hasSidebar ? 'flex flex-col md:flex-row gap-12' : ''}>
            <main className={hasSidebar ? 'w-full md:w-2/3' : 'w-full'}>
              <Node node={entity} />
            </main>

            {hasSidebar && (
              <aside className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
                {blocks.sidebar_second.map((block: any) => (
                  <div key={block?.block_id}>
                    <Block block={block} />
                  </div>
                ))}
              </aside>
            )}
          </div>
        )
      })()
    )}
    <Footer blocks={blocks.footer_top} />
    </>
  )
}
