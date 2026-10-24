import { useRef, useState } from 'react'
import type { Article as ArticleData } from '../blog.ts'
import { MobileHeader } from './MobileHeader.tsx'
import { useMobileMotion } from './useMobileMotion.ts'
import { Hero } from './sections/Hero.tsx'
import { About } from './sections/About.tsx'
import { Power } from './sections/Power.tsx'
import { Experience } from './sections/Experience.tsx'
import { Books } from './sections/Books.tsx'
import { Audiobooks } from './sections/Audiobooks.tsx'
import { Talks } from './sections/Talks.tsx'
import { Article, Blog } from './sections/Blog.tsx'
import { Contact } from './sections/Contact.tsx'
import { Footer } from './sections/Footer.tsx'
import { WhatsApp } from './sections/WhatsApp.tsx'
import './mobile.css'

/**
 * Versión mobile y tablet (< 1024px). Todo su CSS vive bajo `.m-app`.
 * Con `article` muestra ese artículo del blog en lugar de la landing.
 */
export default function MobileApp({ article }: { article: ArticleData | null }) {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  useMobileMotion(root, article?.slug)

  return (
    <div className="m-app" ref={root}>
      <MobileHeader menuOpen={menuOpen} onMenuChange={setMenuOpen} />
      <div className="m-page" inert={menuOpen}>
        <main>
          {article ? (
            <Article key={article.slug} article={article} />
          ) : (
            <>
              <Hero />
              <About />
              <Power />
              <Experience />
              <Books />
              <Audiobooks />
              <Talks />
              <Blog />
            </>
          )}
          <Contact />
        </main>
        <Footer />
        <WhatsApp />
      </div>
    </div>
  )
}
