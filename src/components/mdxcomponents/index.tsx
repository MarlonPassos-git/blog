import type { MDXComponents } from 'mdx/types'
import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'
import BlogNewsletterForm from '../newletter/BlogNewsLetterForm'
import Audioplayer from './Audioplayer'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import WebsiteEmbed from './WebsiteEmbed'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Audioplayer,
  WebsiteEmbed,
}
