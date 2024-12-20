import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from './icon'
import { useLangSwitch } from './useLangSwitch'

const LangSwitch = () => {
  const { menubarRef, isMenuOpen, setIsMenuOpen, currentLocale, locales, handleLinkClick } =
    useLangSwitch()

  return (
    <div ref={menubarRef} className="relative inline-block text-left">
      {/* https://github.com/tailwindlabs/headlessui/issues/3351#issuecomment-2443481916 */}
      <Menu as="div">
        {({ open }) => (
          <>
            <MenuButton
              className="inline-flex rounded-md px-1 py-2 font-bold leading-5 text-gray-700 shadow-sm dark:text-white"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {currentLocale}
              <ChevronDownIcon
                className={`ml-1 mt-1 transform transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
              />
            </MenuButton>
            <Transition
              show={open}
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-[-10px]"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-[10px]"
            >
              <MenuItems
                className="absolute right-0 z-50 mt-2 w-12 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                aria-orientation="vertical"
                onBlur={() => setIsMenuOpen(false)}
              >
                <RadioGroup>
                  <div className="py-1" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {locales.map((newLocale: string) => (
                      <Radio key={newLocale} value={newLocale}>
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={() => handleLinkClick(newLocale)}
                              className={`${
                                focus
                                  ? 'bg-gray-100 dark:bg-gray-600'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                              } rounded-md px-4 py-2 text-sm text-gray-700 hover:text-primary-500 dark:text-white dark:hover:text-primary-500`}
                              role="menuitem"
                              style={{ display: 'block', width: '100%', textDecoration: 'none' }}
                            >
                              {newLocale.charAt(0).toUpperCase() + newLocale.slice(1)}
                            </button>
                          )}
                        </MenuItem>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

export default LangSwitch
