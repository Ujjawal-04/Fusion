"use client"

import { Popover } from "@headlessui/react"
import { Cart } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { useParams, usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { formatAmount } from "@lib/util/prices"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: Omit<Cart, "beforeInsert" | "afterLoad"> | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const { countryCode } = useParams()

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
  }, [totalItems, pathname])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <Popover.Button className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              {`Cart (${totalItems})`}
            </motion.span>
          </LocalizedClientLink>
        </Popover.Button>
        <AnimatePresence>
          {cartDropdownOpen && (
            <Popover.Panel
              static
              className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-gray-200 w-[420px] text-ui-fg-base rounded-lg overflow-hidden"
              data-testid="nav-cart-dropdown"
            >
              <motion.div
                className="rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 flex items-center justify-center">
                  <h3 className="text-large-semi">Cart</h3>
                </div>
                {cartState && cartState.items?.length ? (
                  <>
                    <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
                      {cartState.items
                        .sort((a, b) => {
                          return a.created_at > b.created_at ? -1 : 1
                        })
                        .map((item) => (
                          <motion.div
                            key={item.id}
                            className="grid grid-cols-[122px_1fr] gap-x-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <LocalizedClientLink
                              href={`/products/${item.variant.product.handle}`}
                              className="w-24"
                            >
                              <Thumbnail thumbnail={item.thumbnail} size="square" />
                            </LocalizedClientLink>
                            <div className="flex flex-col justify-between flex-1">
                              <div className="flex flex-col flex-1">
                                <div className="flex items-start justify-between">
                                  <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                    <h3 className="text-base-regular overflow-hidden text-ellipsis">
                                      <LocalizedClientLink
                                        href={`/products/${item.variant.product.handle}`}
                                        data-testid="product-link"
                                      >
                                        {item.title}
                                      </LocalizedClientLink>
                                    </h3>
                                    <LineItemOptions
                                      variant={item.variant}
                                      data-testid="cart-item-variant"
                                      data-value={item.variant}
                                    />
                                    <span
                                      data-testid="cart-item-quantity"
                                      data-value={item.quantity}
                                    >
                                      Quantity: {item.quantity}
                                    </span>
                                  </div>
                                  <div className="flex justify-end">
                                    <LineItemPrice
                                      region={cartState.region}
                                      item={item}
                                      style="tight"
                                    />
                                  </div>
                                </div>
                              </div>
                              <DeleteButton
                                id={item.id}
                                className="mt-1"
                                data-testid="cart-item-remove-button"
                              >
                                Remove
                              </DeleteButton>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                    <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                      <div className="flex items-center justify-between">
                        <span className="text-ui-fg-base font-semibold">
                          Subtotal{" "}
                          <span className="font-normal">(excl. taxes)</span>
                        </span>
                        <span
                          className="text-large-semi"
                          data-testid="cart-subtotal"
                          data-value={cartState.subtotal || 0}
                        >
                          {formatAmount({
                            amount: cartState.subtotal || 0,
                            region: cartState.region,
                            includeTaxes: false,
                          })}
                        </span>
                      </div>
                      <LocalizedClientLink href="/cart" passHref>
                        <Button
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          size="large"
                          data-testid="go-to-cart-button"
                        >
                          Go to cart
                        </Button>
                      </LocalizedClientLink>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                      <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                        <span>0</span>
                      </div>
                      <span>Your shopping bag is empty.</span>
                      <div>
                        <LocalizedClientLink href="/store">
                          <>
                            <span className="sr-only">Go to all products page</span>
                            <Button onClick={close} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                              Explore products
                            </Button>
                          </>
                        </LocalizedClientLink>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </Popover.Panel>
          )}
        </AnimatePresence>
      </Popover>
    </div>
  )
}

export default CartDropdown

