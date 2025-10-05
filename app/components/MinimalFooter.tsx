export default function MinimalFooter() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="font-cormorant text-sm text-gray-600">
              © {new Date().getFullYear()} Giulia Milesi. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            <a
              href="/privacy"
              className="font-cormorant text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="font-cormorant text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="/impressum"
              className="font-cormorant text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}