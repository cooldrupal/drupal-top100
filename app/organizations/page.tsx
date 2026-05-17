import { getCollection } from "@/lib/collection"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { getMenus } from "@/lib/menu"
import { getPagerLinks } from "@/lib/pager"
import type { Metadata } from "next"
import { PagerMini } from "@/components/drupal/Pager"
import { isEmpty, filterParams, pageParam } from "@/lib/utils"
import { getTaxonomyTermsCollection } from "@/lib/taxonomy"
import { FilterSelectedForm } from "@/components/forms/FilterSelectedForm"
import { LoadingOverlay } from "@/components/LoadingOverlay"
import { Node } from "@/components/drupal/Node"
import { Title } from '@/components/drupal/Title'

const slug = 'organizations'
const title = 'Organizations'

type ViewPageParams = {
  slug: string[]
}

type ViewPageProps = {
  params: Promise<ViewPageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
    description: 'Drupal organizations',
  }
}

export default async function Organizations(props: ViewPageProps) {
  const searchParams = await props.searchParams
  const page = pageParam(searchParams)
  const fields = filterParams(searchParams)

  const view = await getCollection('view', 'organizations--page_1', {
    params: {
      include: 'field_logo',
      page: page,
      'views-filter': fields,
    }
  })
  const pagerLinks = getPagerLinks(slug, searchParams, view.meta.count, 20)

  const blocks = await getBlocks(slug, ['header', 'footer_top'])
  const menu = await getMenus(slug, ['primary_menu'])
  const breadcrumb = await getBreadcrumb(slug, 'page_header', title)

  const selects = [
    {
      name: 'field_countries_target_id',
      optionsKey: 'countries',
      placeholder: 'Select a country',
    },
    {
      name: 'field_partner_target_id',
      optionsKey: 'partner',
      placeholder: 'Select a badge',
    },
  ];
  const vocabularies = selects.map(select => select.optionsKey);
  const selectOptions = await getTaxonomyTermsCollection(vocabularies)

  return (
    <>
    <Header blocks={blocks.header} menus={menu?.primary_menu} />
    <div className="flex flex-col md:flex-row gap-6">
      <main className="w-full">
        <Title title={title} />
        <Breadcrumb breadcrumb={breadcrumb} />
        <FilterSelectedForm slug={slug} fields={fields} options={selectOptions} selects={selects} />
        {!isEmpty(view.results) && (
          <>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
              {view.results.map((row: any) => (
                <li key={row.id}>
                  <Node node={row} view='teaser' />
                </li>
              ))}
            </ul>
            {pagerLinks && (<PagerMini links={pagerLinks} page={page} />)}
          </>
        )}
      </main>
    </div>
    <Footer blocks={blocks.footer_top} />
    {!isEmpty(searchParams) && <LoadingOverlay />}
    </>
  );
}
