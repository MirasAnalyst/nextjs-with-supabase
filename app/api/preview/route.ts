import { NextRequest, NextResponse } from 'next/server'
import { PersonalizationPayload } from '@/lib/types/ecommerce'

// Book templates with 5 pages max for easier preview
const bookTemplates = {
  '1': {
    title: "It's Bedtime",
    subtitle: "A Soothing Bedtime Story",
    pages: [
      {
        pageNumber: 1,
        type: 'cover',
        content: {
          title: "It's Bedtime",
          subtitle: "A Special Story for",
          childName: true,
          illustration: "cozy-bedroom-night"
        }
      },
      {
        pageNumber: 2,
        type: 'story',
        content: {
          text: "Hello",
          childName: true,
          text2: "! It's time to get ready for bed. Let's brush our teeth and put on cozy pajamas.",
          illustration: "child-getting-ready-for-bed"
        }
      },
      {
        pageNumber: 3,
        type: 'story',
        content: {
          text: "Now",
          childName: true,
          text2: "climbs into the soft, warm bed. The moon is shining through the window, saying goodnight.",
          illustration: "child-in-bed-moonlight"
        }
      },
      {
        pageNumber: 4,
        type: 'story',
        content: {
          text: "As",
          childName: true,
          text2: "closes their eyes, they dream of magical adventures with friendly animals and colorful rainbows.",
          illustration: "child-dreaming-magical-scene"
        }
      },
      {
        pageNumber: 5,
        type: 'ending',
        content: {
          text: "Sweet dreams,",
          childName: true,
          text2: "! Sleep tight and have the most wonderful dreams. Good night! 🌙⭐",
          illustration: "peaceful-sleeping-child-stars"
        }
      }
    ]
  },
  '2': {
    title: "Little Princess Adventure",
    subtitle: "A Royal Tale",
    pages: [
      {
        pageNumber: 1,
        type: 'cover',
        content: {
          title: "Princess",
          childName: true,
          subtitle: "and the Magic Kingdom",
          illustration: "castle-with-princess"
        }
      },
      {
        pageNumber: 2,
        type: 'story',
        content: {
          text: "Princess",
          childName: true,
          text2: "lives in a beautiful castle with towers that touch the clouds and gardens full of colorful flowers.",
          illustration: "princess-in-castle-garden"
        }
      },
      {
        pageNumber: 3,
        type: 'story',
        content: {
          text: "One day, Princess",
          childName: true,
          text2: "discovers a magical door that leads to an enchanted forest filled with talking animals.",
          illustration: "princess-magical-forest-door"
        }
      },
      {
        pageNumber: 4,
        type: 'story',
        content: {
          text: "The wise owl tells Princess",
          childName: true,
          text2: "about a hidden treasure that can bring happiness to the whole kingdom.",
          illustration: "princess-talking-to-wise-owl"
        }
      },
      {
        pageNumber: 5,
        type: 'ending',
        content: {
          text: "Princess",
          childName: true,
          text2: "finds the treasure - it was kindness and friendship all along! The kingdom celebrates their brave princess.",
          illustration: "kingdom-celebration-princess"
        }
      }
    ]
  },
  '3': {
    title: "Dinosaur Explorer",
    subtitle: "A Prehistoric Adventure",
    pages: [
      {
        pageNumber: 1,
        type: 'cover',
        content: {
          title: "Explorer",
          childName: true,
          subtitle: "and the Land of Dinosaurs",
          illustration: "child-explorer-with-dinosaurs"
        }
      },
      {
        pageNumber: 2,
        type: 'story',
        content: {
          text: "Explorer",
          childName: true,
          text2: "puts on their adventure hat and grabs a magnifying glass to search for dinosaur fossils.",
          illustration: "child-with-explorer-gear"
        }
      },
      {
        pageNumber: 3,
        type: 'story',
        content: {
          text: "Suddenly,",
          childName: true,
          text2: "discovers a time portal that takes them back millions of years to when dinosaurs roamed the Earth!",
          illustration: "time-portal-prehistoric-world"
        }
      },
      {
        pageNumber: 4,
        type: 'story',
        content: {
          text: "Explorer",
          childName: true,
          text2: "meets friendly dinosaurs - a gentle Brontosaurus, a playful Triceratops, and a wise Pterodactyl.",
          illustration: "child-playing-with-friendly-dinosaurs"
        }
      },
      {
        pageNumber: 5,
        type: 'ending',
        content: {
          text: "After an amazing day,",
          childName: true,
          text2: "returns home with wonderful memories and becomes the world's youngest dinosaur expert!",
          illustration: "child-back-home-with-dinosaur-books"
        }
      }
    ]
  },
  '4': {
    title: "Space Adventure",
    subtitle: "A Cosmic Journey",
    pages: [
      {
        pageNumber: 1,
        type: 'cover',
        content: {
          title: "Captain",
          childName: true,
          subtitle: "Space Explorer",
          illustration: "child-astronaut-in-space"
        }
      },
      {
        pageNumber: 2,
        type: 'story',
        content: {
          text: "Captain",
          childName: true,
          text2: "puts on their shiny space suit and rocket boots, ready for an incredible journey to the stars!",
          illustration: "child-putting-on-space-suit"
        }
      },
      {
        pageNumber: 3,
        type: 'story',
        content: {
          text: "The rocket ship blasts off! Captain",
          childName: true,
          text2: "zooms past colorful planets, dancing comets, and twinkling star clusters.",
          illustration: "rocket-ship-flying-past-planets"
        }
      },
      {
        pageNumber: 4,
        type: 'story',
        content: {
          text: "On planet Zorb, Captain",
          childName: true,
          text2: "meets friendly alien creatures who love to play games and share cosmic cookies!",
          illustration: "child-playing-with-friendly-aliens"
        }
      },
      {
        pageNumber: 5,
        type: 'ending',
        content: {
          text: "Captain",
          childName: true,
          text2: "returns to Earth as a hero, with new alien friends and amazing stories to tell everyone!",
          illustration: "child-back-on-earth-with-alien-friends"
        }
      }
    ]
  },
  '5': {
    title: "Ocean Adventure",
    subtitle: "Under the Sea",
    pages: [
      {
        pageNumber: 1,
        type: 'cover',
        content: {
          title: "Mermaid",
          childName: true,
          subtitle: "Under the Sea",
          illustration: "child-mermaid-underwater"
        }
      },
      {
        pageNumber: 2,
        type: 'story',
        content: {
          text: "Mermaid",
          childName: true,
          text2: "discovers they can breathe underwater and swim with the beautiful fish in the coral reef.",
          illustration: "child-mermaid-swimming-with-fish"
        }
      },
      {
        pageNumber: 3,
        type: 'story',
        content: {
          text: "A wise sea turtle shows Mermaid",
          childName: true,
          text2: "the way to an underwater palace made of pearls and seashells.",
          illustration: "mermaid-following-sea-turtle-to-palace"
        }
      },
      {
        pageNumber: 4,
        type: 'story',
        content: {
          text: "In the palace, Mermaid",
          childName: true,
          text2: "meets the Ocean King who gifts them a magical conch shell that can call all sea creatures.",
          illustration: "mermaid-receiving-magical-conch-shell"
        }
      },
      {
        pageNumber: 5,
        type: 'ending',
        content: {
          text: "Mermaid",
          childName: true,
          text2: "becomes the protector of the ocean, keeping all sea life safe and happy forever!",
          illustration: "mermaid-protecting-ocean-creatures"
        }
      }
    ]
  }
}

// Color schemes for different cover colors
const colorSchemes = {
  blue: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA', background: '#EFF6FF' },
  pink: { primary: '#EC4899', secondary: '#BE185D', accent: '#F472B6', background: '#FDF2F8' },
  purple: { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#A78BFA', background: '#F3E8FF' },
  green: { primary: '#10B981', secondary: '#059669', accent: '#34D399', background: '#ECFDF5' },
  yellow: { primary: '#F59E0B', secondary: '#D97706', accent: '#FBBF24', background: '#FFFBEB' },
  red: { primary: '#EF4444', secondary: '#DC2626', accent: '#F87171', background: '#FEF2F2' },
  orange: { primary: '#F97316', secondary: '#EA580C', accent: '#FB923C', background: '#FFF7ED' },
  teal: { primary: '#14B8A6', secondary: '#0D9488', accent: '#5EEAD4', background: '#F0FDFA' }
}

export async function POST(request: NextRequest) {
  try {
    const payload: PersonalizationPayload = await request.json()
    
    // Validate the payload
    if (!payload.childName || !payload.coverColor || !payload.artTheme) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get the book template
    const template = bookTemplates[payload.artTheme as keyof typeof bookTemplates]
    if (!template) {
      return NextResponse.json(
        { error: 'Book template not found' },
        { status: 404 }
      )
    }

    // Generate preview pages
    const pages = await generatePreviewPages(template, payload)
    
    // Create response
    const response = {
      pages,
      assetId: `preview-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Preview generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    )
  }
}

interface BookTemplate {
  id: string
  title: string
  pages: PageTemplate[]
}

interface PageTemplate {
  pageNumber: number
  type: string
  content: {
    title?: string
    text: string
    illustration: string
  }
}

interface ColorScheme {
  primary: string
  background: string
}

async function generatePreviewPages(template: BookTemplate, payload: PersonalizationPayload) {
  const pages = []
  const colorScheme = colorSchemes[payload.coverColor]
  
  for (const pageTemplate of template.pages) {
    const pageData = {
      pageNumber: pageTemplate.pageNumber,
      imageUrl: await generatePageImage(pageTemplate, payload, colorScheme),
      thumbnailUrl: await generateThumbnailImage(pageTemplate, payload, colorScheme),
      width: 1100,
      height: 850,
    }
    pages.push(pageData)
  }
  
  return pages
}

async function generatePageImage(pageTemplate: PageTemplate, payload: PersonalizationPayload, colorScheme: ColorScheme) {
  const childName = payload.childName
  
  // Create page content based on the template
  let pageText = ""
  if (pageTemplate.content.text) {
    pageText = pageTemplate.content.text
    if (pageTemplate.content.childName) {
      pageText += ` ${childName}`
    }
    if (pageTemplate.content.text2) {
      pageText += ` ${pageTemplate.content.text2}`
    }
  }
  
  // For cover page
  if (pageTemplate.type === 'cover') {
    if (pageTemplate.content.title && pageTemplate.content.childName) {
      pageText = `${pageTemplate.content.title} ${childName}`
    } else {
      pageText = `${pageTemplate.content.title || ''} ${pageTemplate.content.subtitle || ''}`
    }
  }
  
  // Generate URL with improved text and styling
  const encodedText = encodeURIComponent(pageText.substring(0, 80))
  const colorHex = colorScheme.primary.replace('#', '')
  const bgColorHex = colorScheme.background.replace('#', '')
  
  return `https://via.placeholder.com/1100x850/${colorHex}/${bgColorHex.substring(0, 6)}?text=Page+${pageTemplate.pageNumber}%0A${encodedText}`
}

async function generateThumbnailImage(pageTemplate: PageTemplate, payload: PersonalizationPayload, colorScheme: ColorScheme) {
  const colorHex = colorScheme.primary.replace('#', '')
  const bgColorHex = colorScheme.background.replace('#', '')
  return `https://via.placeholder.com/150x200/${colorHex}/${bgColorHex.substring(0, 6)}?text=P${pageTemplate.pageNumber}`
}
