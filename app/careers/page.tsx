import { getCollection } from "@/lib/collection"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { getBreadcrumb } from "@/lib/breadcrumb"
import { Breadcrumb } from "@/components/drupal/Breadcrumb"
import { getBlocks } from "@/lib/decoupled_kit"
import { getMenus } from "@/lib/menu"
import type { Metadata } from "next"
import { isEmpty } from "@/lib/utils"
import { Node } from "@/components/drupal/Node"
import { Title } from '@/components/drupal/Title'

const slug = 'careers'
const title = 'Careers'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
    description: 'Careers page list',
  }
}

export default async function Careers(props: any) {
  const blocks = await getBlocks(slug, ['header', 'footer_top'])
  const menu = await getMenus(slug, ['primary_menu'])
  const view = await getCollection('view', "organizations--page_2", {
    params: { include: "field_countries" }
  })
  const breadcrumb = await getBreadcrumb(slug, 'page_header', title);

  return (
    <>
    <Header blocks={blocks.header} menus={menu?.primary_menu} />
    <div className="flex flex-col md:flex-row gap-6">
      <main className="w-full">
        <Title title={title} />
        <Breadcrumb breadcrumb={breadcrumb} />
        {!isEmpty(view.results) &&
          <ul className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
          {view.results.map((row: any) => (
            <li key={row.id}>
              <Node node={row} view='career' />
            </li>
          ))}
          </ul>
        }
      </main>
    </div>
    <Footer blocks={blocks.footer_top} />
    </>
  );
}
