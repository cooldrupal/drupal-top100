import { getBlocks } from "@/lib/decoupled_kit"
import { getMenus } from "@/lib/menu"
import { Header } from "@/components/drupal/Header"
import { Footer } from "@/components/drupal/Footer"
import { Block } from "@/components/drupal/Block"
import type { Metadata } from "next"

const slug = '/'

export const metadata: Metadata = {
  title: "Drupal Top 100 sites",
  description: "Drupal top 100 organizations from drupal.org",
}

export default async function Home() {
  const blocks = await getBlocks(slug, ['content_top', 'header', 'footer_top'])
  const menu = await getMenus(slug, ['primary_menu'])
  return (
    <>
    <Header blocks={blocks?.header} menus={menu?.primary_menu} />
    <main>
      {blocks?.content_top?.length &&
        blocks.content_top.map((block: any) => (
          <div key={block?.block_id}>
            <Block block={block} />
          </div>
        ))
      }
    </main>
    <Footer blocks={blocks?.footer_top} />
    </>
  )
}
