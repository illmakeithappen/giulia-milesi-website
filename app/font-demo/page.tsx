import CustomText from '@/app/components/CustomText';

export default function FontDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          Custom Handwriting Font Demo
        </h1>

        <div className="space-y-16">
          {/* Original Design Recreation */}
          <section className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Original Design</h2>
            <div className="bg-[#00BFFF] rounded-xl p-12 flex gap-16 justify-center items-center flex-wrap">
              <CustomText text="insta" letterHeight={80} spacing={12} />
              <CustomText text="contact" letterHeight={80} spacing={12} />
            </div>
          </section>

          {/* Size Variations */}
          <section className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Size Variations</h2>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-12 space-y-8">
              <div className="text-center">
                <CustomText text="action" letterHeight={40} />
                <p className="text-white/60 text-sm mt-2">Small (40px)</p>
              </div>
              <div className="text-center">
                <CustomText text="notion" letterHeight={60} />
                <p className="text-white/60 text-sm mt-2">Medium (60px)</p>
              </div>
              <div className="text-center">
                <CustomText text="coast" letterHeight={90} />
                <p className="text-white/60 text-sm mt-2">Large (90px)</p>
              </div>
            </div>
          </section>

          {/* Spacing Variations */}
          <section className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Letter Spacing</h2>
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-12 space-y-8">
              <div className="text-center">
                <CustomText text="notions" spacing={2} letterHeight={50} />
                <p className="text-white/60 text-sm mt-2">Tight (2px)</p>
              </div>
              <div className="text-center">
                <CustomText text="notions" spacing={8} letterHeight={50} />
                <p className="text-white/60 text-sm mt-2">Normal (8px)</p>
              </div>
              <div className="text-center">
                <CustomText text="notions" spacing={20} letterHeight={50} />
                <p className="text-white/60 text-sm mt-2">Loose (20px)</p>
              </div>
            </div>
          </section>

          {/* All Available Words */}
          <section className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Example Words (a, c, i, n, o, s, t)
            </h2>
            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-xl p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CustomText text="insta" letterHeight={50} />
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CustomText text="contact" letterHeight={50} />
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CustomText text="action" letterHeight={50} />
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CustomText text="notions" letterHeight={50} />
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CustomText text="coast" letterHeight={50} />
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CustomText text="icons" letterHeight={50} />
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CustomText text="saints" letterHeight={50} />
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CustomText text="station" letterHeight={50} />
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Example */}
          <section className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Social Links Example</h2>
            <div className="bg-[#00BFFF] rounded-xl p-12">
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center gap-6 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer">
                  <CustomText text="insta" letterHeight={50} />
                  <span className="text-white text-2xl font-medium">@yourusername</span>
                </div>
                <div className="flex items-center gap-6 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer">
                  <CustomText text="contact" letterHeight={50} />
                  <span className="text-white text-2xl font-medium">hello@example.com</span>
                </div>
              </div>
            </div>
          </section>

          {/* Info Box */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <div className="space-y-3 font-mono text-sm bg-black/20 p-6 rounded-lg">
              <p>import CustomText from '@/app/components/CustomText';</p>
              <p className="text-yellow-300">{'<CustomText text="insta" letterHeight={60} />'}</p>
            </div>
            <p className="mt-6 text-blue-100">
              📖 See CUSTOM_FONT_GUIDE.md in the project root for full documentation
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-white/60">
          <p>Custom Handwriting Font Component</p>
          <p className="text-sm mt-2">Available letters: a, c, i, n, o, s, t</p>
        </div>
      </div>
    </main>
  );
}
