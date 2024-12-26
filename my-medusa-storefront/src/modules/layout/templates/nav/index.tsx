import { Suspense } from 'react'
import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import dynamic from 'next/dynamic'

const CartButton = dynamic(() => import("@modules/layout/components/cart-button"), { ssr: false })
const SideMenu = dynamic(() => import("@modules/layout/components/side-menu"), { ssr: false })

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b duration-200 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 border-ui-border-base transition-all">
        <nav className="content-container txt-small-plus text-gray-800 flex items-center justify-between w-full h-full text-base">
          <div className="flex-1 basis-0 h-full flex ">
            <Suspense fallback={<div>Loading...</div>}>
              <SideMenu regions={regions} />
            </Suspense>
          </div>

          <div className="flex items-center h-96 transition-transform duration-300 hover:scale-110">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-600 uppercase transition-all duration-300"
              data-testid="nav-store-link"
            >
             Fusion
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden md:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <NavLink href="/search" testId="nav-search-link">
                  Search
                </NavLink>
              )}
              <NavLink href="/" testId="nav-home-link">
                Home
              </NavLink>
              <NavLink href="/account" testId="nav-account-link">
                Account
              </NavLink>
            </div>
            <div className="transition-transform duration-200 hover:scale-110">
              <Suspense fallback={<div>Loading...</div>}>
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

function NavLink({ href, testId, children }) {
  return (
    <LocalizedClientLink
      className="relative px-4 py-2 text-lg font-medium text-gray-600 transition-all duration-300 ease-in-out hover:text-gray-900 hover:bg-gray-100 rounded-md"
      href={href}
      data-testid={testId}
    >
      {children}
    </LocalizedClientLink>
  )
}