import { BLOG, articleHref, type Article as ArticleData } from '../../blog.ts'
import { useArticles } from '../../bravo.ts'
import { RichText } from '../../shared/RichText.tsx'
import { ShareMenu } from '../../shared/ShareMenu.tsx'
import { IconArrowRight } from '../icons.tsx'
import '../blog.css'
import '../../shared/tint.css'

/** Fecha · minutos de lectura, en dorado. */
function Meta({ article }: { article: ArticleData }) {
  return (
    <p className="m-post-meta">
      <time>{article.date}</time>
      <span aria-hidden="true">·</span>
      <span>{article.minutes} MIN DE LECTURA</span>
    </p>
  )
}

/** Sección Blog de la landing, como en el XD de escritorio, a una columna. */
export function Blog() {
  const articles = useArticles()
  return (
    <section className="m-blog m-section" id="blog">
      <div className="m-wrap">
        <p className="m-label" data-reveal>
          {BLOG.label}
        </p>
        <h2 className="m-h2 m-blog__heading" data-reveal>
          <span>{BLOG.titleGold}</span> {BLOG.title}
        </h2>
        <p className="m-text" data-reveal>
          {BLOG.text}
        </p>
        <ul className="m-blog__list">
          {articles.map((article) => {
            const href = articleHref(article.slug)
            return (
              <li key={article.slug} className="m-blog__card" data-reveal>
                <a href={href} className="m-blog__img" data-tint={article.tint} tabIndex={-1} aria-hidden="true">
                  <img
                    src={article.card ?? article.imageMobile}
                    alt=""
                    loading="lazy"
                    style={article.frame?.card ? { objectPosition: article.frame.card } : undefined}
                  />
                </a>
                <p className="m-blog__day">{article.day}</p>
                <h3 className="m-blog__title">
                  <a href={href}>{article.title.filter(Boolean).join(' ')}</a>
                </h3>
                <p className="m-blog__lead">{article.excerpt}</p>
                <div className="m-blog__foot">
                  <span className="m-blog__date">{article.dateLong}</span>
                  <ShareMenu article={article} className="m-blog__share" />
                  <a href={href} className="m-blog__more">
                    {BLOG.cta}
                    <IconArrowRight size={18} />
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/** Página de artículo en mobile: misma estructura que blog.xd, a una columna. */
export function Article({ article }: { article: ArticleData }) {
  return (
    <article className="m-post">
      <header className="m-post__head">
        <div className="m-wrap">
          <h1 className="m-post__title">
            {article.title.filter(Boolean).join(' ')}
          </h1>
          <Meta article={article} />
        </div>
      </header>
      <div className="m-post__hero" data-tint={article.tint}>
        <img
          src={article.imageMobile}
          alt=""
          style={article.frame?.cover ? { objectPosition: article.frame.cover } : undefined}
        />
      </div>
      <div className="m-wrap m-post__body">
        <p className="m-post__lead">{article.lead}</p>
        {article.html !== undefined ? (
          <div className="m-post__html" dangerouslySetInnerHTML={{ __html: article.html }} />
        ) : null}
        {article.blocks.map((block, i) =>
          block.type === 'h2' ? (
            <h2 key={i} className="m-post__h2">
              {block.text}
            </h2>
          ) : (
            <p key={i} className="m-post__p">
              <RichText text={block.text} />
            </p>
          ),
        )}
        <a className="m-blog__more m-post__back" href="#blog">
          VOLVER AL BLOG
          <IconArrowRight size={18} />
        </a>
      </div>
    </article>
  )
}
