export const appThemes = {
  light: {
    dark: false, skyTop: '#F7DDBD', skyBottom: '#F2B98F', surface: '#FBF4EC', card: '#FFFFFF',
    ink: '#55361C', muted: '#795A43', border: '#AD8668', divider: '#E9DCCB',
    soft: '#F7D9BC', active: '#F5E7D8', primary: '#55361C', primaryText: '#FFFFFF', accentText: '#55361C',
    accent: '#E5A335', error: '#A52C2C',
  },
  dark: {
    dark: true, skyTop: '#291B31', skyBottom: '#402940', surface: '#24192B', card: '#35213E',
    ink: '#FBF4EC', muted: '#D3BAC9', border: '#A18B9F', divider: '#4A3452',
    soft: '#624054', active: '#45334C', primary: '#F7D9BC', primaryText: '#35213E', accentText: '#35213E',
    accent: '#E5A335', error: '#FFB4AC',
  },
}
export type AppTheme = typeof appThemes.light
export type Appearance = 'system' | 'light' | 'dark'
