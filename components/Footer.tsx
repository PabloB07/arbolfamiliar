export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Árbol Familiar
            </h3>
            <p className="text-gray-600 text-sm">
              Preserva y comparte tu historia familiar con las generaciones futuras.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900">
              Enlaces
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Acerca de
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Términos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900">
              Contacto
            </h4>
            <p className="text-gray-600 text-sm">
              ¿Necesitas ayuda? Contáctanos en:
            </p>
            <a
              href="mailto:info@arbolfamiliar.com"
              className="text-emerald-600 hover:underline text-sm"
            >
              info@arbolfamiliar.com
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Árbol Familiar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

