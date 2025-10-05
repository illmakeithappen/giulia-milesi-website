/**
 * Example usage of the CustomText component
 *
 * This file demonstrates various ways to use the custom handwriting font.
 * You can copy these examples into your own pages.
 */

import CustomText from './CustomText';

export function CustomTextExamples() {
  return (
    <div className="space-y-12 p-8">
      {/* Example 1: Basic usage with cyan background (original look) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Original Design</h2>
        <div className="bg-[#00BFFF] p-8 rounded-lg flex gap-16 justify-center items-center">
          <CustomText text="insta" letterHeight={60} />
          <CustomText text="contact" letterHeight={60} />
        </div>
      </section>

      {/* Example 2: Different sizes */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Different Sizes</h2>
        <div className="bg-gray-900 p-8 rounded-lg space-y-4">
          <CustomText text="small" letterHeight={30} />
          <CustomText text="medium" letterHeight={50} />
          <CustomText text="large" letterHeight={70} />
        </div>
      </section>

      {/* Example 3: Custom colors */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Colors</h2>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg flex flex-col gap-4">
          <CustomText text="colorful" color="#FFD700" letterHeight={50} />
          <CustomText text="text" color="#00FF00" letterHeight={50} />
        </div>
      </section>

      {/* Example 4: Spacing variations */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Letter Spacing</h2>
        <div className="bg-slate-800 p-8 rounded-lg space-y-4">
          <CustomText text="tight" spacing={2} letterHeight={40} />
          <CustomText text="normal" spacing={8} letterHeight={40} />
          <CustomText text="loose" spacing={16} letterHeight={40} />
        </div>
      </section>

      {/* Example 5: Real-world usage */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Social Links Example</h2>
        <div className="bg-[#00BFFF] p-12 rounded-lg">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <CustomText text="insta" letterHeight={50} />
              <span className="text-white text-xl">@username</span>
            </div>
            <div className="flex items-center gap-4">
              <CustomText text="contact" letterHeight={50} />
              <span className="text-white text-xl">hello@example.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Example 6: Navigation menu */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Navigation Example</h2>
        <nav className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 rounded-lg">
          <div className="flex gap-8 justify-center">
            <CustomText text="sections" letterHeight={35} />
            <CustomText text="actions" letterHeight={35} />
            <CustomText text="contact" letterHeight={35} />
          </div>
        </nav>
      </section>

      {/* Example 7: Mixed with fallback */}
      <section>
        <h2 className="text-2xl font-bold mb-4">With Fallback Text</h2>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="mb-4 text-gray-600">
            Letters available in custom font will render in handwriting style,
            others will use regular font:
          </p>
          <CustomText
            text="custom font test"
            color="#000000"
            letterHeight={40}
            fallbackToRegular={true}
          />
        </div>
      </section>
    </div>
  );
}

// You can also create individual components for specific use cases
export function SocialMediaLink({ platform, handle }: { platform: string; handle: string }) {
  return (
    <div className="bg-[#00BFFF] p-6 rounded-lg flex items-center gap-4">
      <CustomText text={platform} letterHeight={40} />
      <span className="text-white text-lg">{handle}</span>
    </div>
  );
}

export default CustomTextExamples;
