import { TFunction } from 'i18next'

interface ThemeButtonProps {
  t: TFunction<'common', undefined>
  handleThemeChange: (theme: string) => void
  theme: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ t, handleThemeChange, theme, Icon }) => (
  <button
    className="flex flex-row py-2 hover:bg-primary-600 hover:text-white"
    onClick={() => handleThemeChange(theme)}
  >
    <span className="ml-4 mr-2">
      <Icon className="h-6 w-6" />
    </span>
    <div>{t(theme as any)}</div>
  </button>
)

export default ThemeButton
