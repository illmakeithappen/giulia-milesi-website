# CustomText Component

A React component that renders text using a custom handwritten-style font extracted from design assets.

## Features

- ✨ Renders text with custom handwritten SVG letters
- 🎨 Customizable color and sizing
- 📏 Adjustable letter spacing
- 🔄 Fallback to regular text for unavailable characters
- 🎯 TypeScript support

## Available Characters

Currently supports: **a, c, i, n, o, s, t**

Perfect for rendering words like: "insta", "contact", "action", "notions", "coast", etc.

## Installation

The component is already set up in your project at:
```
app/components/CustomText/
```

## Basic Usage

```tsx
import CustomText from '@/app/components/CustomText';

export default function MyPage() {
  return (
    <div className="bg-cyan-500 p-8">
      <CustomText text="insta" />
      <CustomText text="contact" />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | The text to render |
| `className` | `string` | `''` | Additional CSS classes |
| `color` | `string` | `'#FFFFFF'` | Text color (CSS color value) |
| `spacing` | `number` | `8` | Space between letters (px) |
| `letterHeight` | `number` | `40` | Height of each letter (px) |
| `fallbackToRegular` | `boolean` | `true` | Show regular text for unavailable characters |

## Examples

### Basic Example with Cyan Background
```tsx
<div className="bg-[#00BFFF] p-8">
  <CustomText text="insta" letterHeight={60} />
</div>
```

### Custom Colors
```tsx
<CustomText
  text="contact"
  color="#FF6B6B"
  letterHeight={50}
/>
```

### Custom Spacing
```tsx
<CustomText
  text="action"
  spacing={12}
  letterHeight={40}
/>
```

### Large Text
```tsx
<CustomText
  text="insta"
  letterHeight={80}
  spacing={16}
  className="my-custom-class"
/>
```

### With Fallback Text
```tsx
{/* "hello" will show 'h', 'e', 'l', 'l' in regular font, 'o' in custom font */}
<CustomText
  text="hello"
  fallbackToRegular={true}
/>
```

### Without Fallback (Only Show Available Characters)
```tsx
{/* "hello" will only show 'o' */}
<CustomText
  text="hello"
  fallbackToRegular={false}
/>
```

### Full Page Example
```tsx
import CustomText from '@/app/components/CustomText';

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-[#00BFFF] flex items-center justify-center gap-8">
      <CustomText
        text="insta"
        letterHeight={80}
        spacing={10}
      />
      <CustomText
        text="contact"
        letterHeight={80}
        spacing={10}
      />
    </div>
  );
}
```

## Adding More Characters

To add more letters to the font:

1. Create SVG file in `/public/fonts/custom-handwriting/[letter].svg`
2. Update `/public/fonts/custom-handwriting/letters.json`:
   ```json
   {
     "availableCharacters": ["a", "c", "i", "n", "o", "s", "t", "x"],
     "letterMapping": {
       // ... existing mappings
       "x": "/fonts/custom-handwriting/x.svg"
     }
   }
   ```

## File Structure

```
app/components/CustomText/
├── CustomText.tsx          # Main component
├── CustomText.module.css   # Styles
├── index.ts               # Export
└── README.md              # This file

public/fonts/custom-handwriting/
├── a.svg
├── c.svg
├── i.svg
├── n.svg
├── o.svg
├── s.svg
├── t.svg
└── letters.json           # Configuration
```

## Styling Tips

- Use on cyan background (#00BFFF) for the original look
- White text works best with the cyan background
- Adjust `letterHeight` between 40-100px for optimal display
- Use `spacing` prop to fine-tune letter spacing based on your design

## Browser Compatibility

Works in all modern browsers that support:
- SVG
- React 18+
- CSS filters

## Performance

- SVG files are lightweight (~1KB each)
- Images are cached by the browser
- Component uses React.memo internally for optimization
