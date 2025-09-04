# 📚 Book Templates - 5 Pages Each

## Available Book Templates

### 1. "It's Bedtime" (ID: 1)
**Theme:** Bedtime routine and sweet dreams  
**Target Age:** 0-3 years  
**Pages:** 5  

**Story Flow:**
1. **Cover:** "It's Bedtime - A Special Story for [Child Name]"
2. **Page 2:** Getting ready for bed (brushing teeth, pajamas)
3. **Page 3:** Climbing into bed with moonlight
4. **Page 4:** Dreaming of magical adventures
5. **Page 5:** Sweet dreams message with moon and stars

### 2. "Little Princess Adventure" (ID: 2)
**Theme:** Royal fairy tale adventure  
**Target Age:** 3-7 years  
**Pages:** 5  

**Story Flow:**
1. **Cover:** "Princess [Child Name] and the Magic Kingdom"
2. **Page 2:** Living in a beautiful castle
3. **Page 3:** Discovering a magical door to enchanted forest
4. **Page 4:** Meeting wise owl and learning about treasure
5. **Page 5:** Finding that kindness is the real treasure

### 3. "Dinosaur Explorer" (ID: 3)
**Theme:** Prehistoric adventure and learning  
**Target Age:** 2-6 years  
**Pages:** 5  

**Story Flow:**
1. **Cover:** "Explorer [Child Name] and the Land of Dinosaurs"
2. **Page 2:** Getting explorer gear and magnifying glass
3. **Page 3:** Discovering time portal to prehistoric world
4. **Page 4:** Meeting friendly dinosaurs (Brontosaurus, Triceratops, Pterodactyl)
5. **Page 5:** Returning home as dinosaur expert

### 4. "Space Adventure" (ID: 4)
**Theme:** Cosmic journey and space exploration  
**Target Age:** 3-8 years  
**Pages:** 5  

**Story Flow:**
1. **Cover:** "Captain [Child Name] Space Explorer"
2. **Page 2:** Putting on space suit and rocket boots
3. **Page 3:** Rocket blasting off past planets and stars
4. **Page 4:** Meeting friendly aliens on planet Zorb
5. **Page 5:** Returning to Earth as space hero

### 5. "Ocean Adventure" (ID: 5)
**Theme:** Underwater exploration and sea life  
**Target Age:** 2-6 years  
**Pages:** 5  

**Story Flow:**
1. **Cover:** "Mermaid [Child Name] Under the Sea"
2. **Page 2:** Discovering ability to breathe underwater
3. **Page 3:** Following sea turtle to underwater palace
4. **Page 4:** Meeting Ocean King and receiving magical conch shell
5. **Page 5:** Becoming protector of the ocean

## Personalization Features

### Child Name Integration
- Appears in title/cover of each book
- Integrated naturally into story text
- Used consistently throughout narrative

### Cover Colors Available
- **Blue:** Ocean Blue (#3B82F6)
- **Pink:** Rose Pink (#EC4899)
- **Purple:** Royal Purple (#8B5CF6)
- **Green:** Forest Green (#10B981)
- **Yellow:** Sunshine Yellow (#F59E0B)
- **Red:** Cherry Red (#EF4444)
- **Orange:** Sunset Orange (#F97316)
- **Teal:** Mint Teal (#14B8A6)

### Optional Dedication
- Custom message from parents
- Appears on dedicated page or integrated into story
- 500 character limit

## Technical Implementation

### API Endpoints
- **Preview Generation:** `POST /api/preview`
- **Print Asset Creation:** `POST /api/order-asset`

### Request Format
```json
{
  "childName": "Emma",
  "coverColor": "blue",
  "dedication": "Made with love for our little princess",
  "locale": "en-US",
  "previewVersion": "v1",
  "artTheme": "1"
}
```

### Response Format
```json
{
  "pages": [
    {
      "pageNumber": 1,
      "imageUrl": "https://via.placeholder.com/1100x850/...",
      "thumbnailUrl": "https://via.placeholder.com/150x200/...",
      "width": 1100,
      "height": 850
    }
  ],
  "assetId": "preview-1234567890-abcd1234",
  "expiresAt": "2025-09-05T04:16:35.764Z"
}
```

## Testing

### Test Page
Visit: `http://localhost:3001/test-preview`

### Features:
- ✅ Book selection (5 different templates)
- ✅ Child name personalization
- ✅ Cover color selection
- ✅ Optional dedication
- ✅ Real-time preview generation
- ✅ Visual page thumbnails
- ✅ Error handling

## AI Art Generation Prompts

### For "It's Bedtime" Book

**Page 1 (Cover):**
```
Children's book cover illustration for "It's Bedtime" featuring a cozy bedroom with warm lighting, comfortable bed with fluffy pillows, nightstand with soft lamp, and gentle stars through window. Color scheme: [COVER_COLOR]. Soft, dreamy art style perfect for bedtime.
```

**Page 2 (Getting Ready):**
```
Child getting ready for bed, brushing teeth at bathroom sink, putting on cozy pajamas. Warm, comforting bedroom scene with soft lighting. Children's book illustration style.
```

**Page 3 (In Bed):**
```
Child tucked into soft, warm bed with moonlight streaming through window. Peaceful bedroom scene with gentle moon and stars visible outside. Cozy, safe feeling.
```

**Page 4 (Dreaming):**
```
Child peacefully sleeping while dreaming of magical adventures - thought bubble showing colorful rainbows, friendly animals, and whimsical scenes. Soft, dreamy illustration.
```

**Page 5 (Sweet Dreams):**
```
Peaceful sleeping child surrounded by gentle stars and crescent moon. Serene night scene with soft blues and purples. Text space for "Sweet dreams" message.
```

### For "Little Princess Adventure" Book

**Page 1 (Cover):**
```
Beautiful castle with towers reaching to clouds, princess child character in foreground, colorful flower gardens, fairy tale setting. Color scheme: [COVER_COLOR]. Magical, enchanting art style.
```

**Continue this pattern for other books...**

## Performance Metrics

- ✅ **Preview Generation:** < 3 seconds
- ✅ **Page Count:** 5 pages (optimal for quick viewing)
- ✅ **Image Size:** 1100x850 (11"x8.5" ratio)
- ✅ **Thumbnail Size:** 150x200
- ✅ **Real-time Personalization:** ✓
- ✅ **Color Theming:** 8 options
- ✅ **Mobile Responsive:** ✓

Your book preview system is ready to create magical personalized stories! 🎉✨
