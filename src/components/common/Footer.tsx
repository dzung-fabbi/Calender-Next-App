import { AppConfig } from '@/utils/AppConfig'

export default function Footer() {
  return (
    <div className="py-8 mt-5 text-sm text-center border-t border-gray-300">
      © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
      <span role="img" aria-label="Love">
        ♥
      </span>{' '}
      by <a href="https://fabbi.com.vn">Fabbi Team</a>
    </div>
  )
}
