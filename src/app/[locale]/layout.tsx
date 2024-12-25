import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import SectionContainer from 'components/SectionContainer'
import TwSizeIndicator from 'components/helper/TwSizeIndicator'
import Footer from 'components/navigation/Footer'
import Header from 'components/navigation/Header'
import { SearchProvider } from 'components/search/SearchProvider'
import { maindescription, maintitle } from 'data/localeMetadata'
import siteMetadata from 'data/siteMetadata'
import { dir } from 'i18next'
import { Metadata } from 'next'
// import { ThemeProvider } from '@/components/theme/ThemeContext'
import { ThemeProvider } from 'next-themes'
import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { MetadataProps } from 'types/metaData'
import { LocaleTypes, locales } from './i18n/settings'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export async function generateMetadata(props: MetadataProps): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: maintitle[locale],
      template: `%s | ${maintitle[locale]}`,
    },
    description: maindescription[locale],
    openGraph: {
      title: maintitle[locale],
      description: maindescription[locale],
      url: './',
      siteName: maintitle[locale],
      images: [siteMetadata.socialBanner],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: maintitle[locale],
      description: maindescription[locale],
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: [siteMetadata.socialBanner],
    },
  }
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: LocaleTypes }>
}) {
  const params = await props.params

  const { locale } = params

  const { children } = props

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <TwSizeIndicator />
        <ThemeProvider>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              <SearchProvider>
                <Header />
                <main className="mb-auto">{children}</main>
              </SearchProvider>
              <Footer locale={locale} />
            </div>
          </SectionContainer>
        </ThemeProvider>
      </body>
    </html>
  )
}
