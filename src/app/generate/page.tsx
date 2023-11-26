import MainPage from "@/components/views/mainPage"
import { Image } from "@/lib/images";
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = searchParams.id
  
  if (!id) return {
    title: 'Bubu & Dudu Time',
    icons: {
      icon: '/images/bubu.png',
      apple: '/images/bubu.png',
      shortcut: '/images/bubu.png',
    },
    themeColor: '#121212',
    description: 'Get matching profile pictures for you and your partner(s) :D',
    keywords: 'bubu,bubuanddudu,dudu,budududu,matching,match,pfp,status,discord,discord pfp,matching pfp,cute,cutepfp,cute pfp,',
    robots: 'index',
    authors: [
      { name: 'fabra', url: 'https://github.com/ivanoliverfabra' },
      { name: 'yakisn0w', url: 'https://github.com/yakisn0w' },
      { name: 'AmorProject', url: 'https://github.com/amorproject' }
    ],
    openGraph: {
      type: 'website',
      title: 'Bubu & Dudu Time',
      description: 'Get matching profile pictures for you and your partner(s) :D',
      images: [
        {
          url: '/images/bubu.png',
          width: 512,
          height: 512,
          alt: 'Bubu & Dudu Time',
        }
      ],
      siteName: 'Bubu & Dudu Time',
      url: 'https://fabra.gay'
    },
    twitter: {
      card: 'summary_large_image',
      images: [
        '/images/bubu.png'
      ],
      title: 'Bubu & Dudu Time',
      description: 'Get matching profile pictures for you and your partner(s) :D'
    }
  }

  const product: Image = await fetch(`https://fabra.gay/api/post?id=${id}`).then((res) => res.json());

  if (!product) { 
    return {
      title: 'Bubu & Dudu Time',
      icons: {
        icon: '/images/bubu.png',
        apple: '/images/bubu.png',
        shortcut: '/images/bubu.png',
      },
      themeColor: '#121212',
      description: 'Get matching profile pictures for you and your partner(s) :D',
      keywords: 'bubu,bubuanddudu,dudu,budududu,matching,match,pfp,status,discord,discord pfp,matching pfp,cute,cutepfp,cute pfp,',
      robots: 'index',
      authors: [
        { name: 'fabra', url: 'https://github.com/ivanoliverfabra' },
        { name: 'yakisn0w', url: 'https://github.com/yakisn0w' },
        { name: 'AmorProject', url: 'https://github.com/amorproject' }
      ],
      openGraph: {
        type: 'website',
        title: 'Bubu & Dudu Time',
        description: 'Get matching profile pictures for you and your partner(s) :D',
        images: [
          {
            url: '/images/bubu.png',
            width: 512,
            height: 512,
            alt: 'Bubu & Dudu Time',
          }
        ],
        siteName: 'Bubu & Dudu Time',
        url: 'https://fabra.gay'
      },
      twitter: {
        card: 'summary_large_image',
        images: [
          '/images/bubu.png'
        ],
        title: 'Bubu & Dudu Time',
        description: 'Get matching profile pictures for you and your partner(s) :D'
      }
    }
  }

  return {
    title: `${product.name} - Bubu & Dudu Time`,
    icons: {
      icon: '/images/bubu.png',
      apple: '/images/bubu.png',
      shortcut: '/images/bubu.png',
    },
    themeColor: '#121212',
    description: `Get matching profile pictures for you and your partner(s) :D. Posted by ${product.uploader?.username || 'Anonymous'}. ${product.categories.join(', ')}`,
    keywords: 'bubu,bubuanddudu,dudu,budududu,matching,match,pfp,status,discord,discord pfp,matching pfp,cute,cutepfp,cute pfp,',
    robots: 'index',
    authors: [
      { name: product.uploader?.username || 'Anonymous', url: `https://fabra.gay/profile/${product.uploader?.id}` }
    ],
    openGraph: {
      type: 'website',
      title: `${product.name} - Bubu & Dudu Time`,
      description: `Get matching profile pictures for you and your partner(s) :D. Posted by ${product.uploader?.username || 'Anonymous'}. ${product.categories.join(', ')}`,
      images: product.images,
      siteName: 'Bubu & Dudu Time',
      url: 'https://fabra.gay'
    },
    twitter: {
      card: 'summary_large_image',
      images: product.images,
      title: `${product.name} - Bubu & Dudu Time`,
      description: `Get matching profile pictures for you and your partner(s) :D. Posted by ${product.uploader?.username || 'Anonymous'}. ${product.categories.join(', ')}`
    }
  }
}

export default function Page() {
  return (
    <>
      <MainPage />
    </>
  )
}