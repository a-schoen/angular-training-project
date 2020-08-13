export interface Entry {
  id: string,
  type: '' | 'link' | 'rss' | 'image' | 'twitter',
  link?: string,
  title: string,
  subtitle?: string,
  imageUrl?: string,
  content?: string,
  published?: string
  username?: string
  count?: string
}