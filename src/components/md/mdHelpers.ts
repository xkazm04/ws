export interface ParsedElement {
  type: 'header' | 'paragraph' | 'code' | 'list' | 'checkbox' | 'bold' | 'link' | 'inline-code' | 'aside' | 'divider' | 'image' | 'component'
  content: string
  level?: number
  language?: string
  checked?: boolean
  id?: string
  href?: string
  alt?: string
  componentName?: string
}

export function generateContentHash(content: string): string {
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

export function parseMarkdownContent(content: string): ParsedElement[] {
  const contentHash = generateContentHash(content)
  const lines = content.split('\n')
  const elements: ParsedElement[] = []
  let currentList: string[] = []
  let checkboxCounter = 0

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push({
        type: 'list',
        content: currentList.join('\n')
      })
      currentList = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line) {
      flushList()
      continue
    }

    // Divider
    if (line === '---') {
      flushList()
      elements.push({
        type: 'divider',
        content: ''
      })
    }
    // Aside blocks (tip boxes)
    else if (line === '<aside>') {
      flushList()
      let asideContent = ''
      i++
      
      while (i < lines.length && lines[i].trim() !== '</aside>') {
        asideContent += lines[i] + '\n'
        i++
      }
      
      elements.push({
        type: 'aside',
        content: asideContent.trim()
      })
    }
    // Headers
    else if (line.startsWith('###')) {
      flushList()
      elements.push({
        type: 'header',
        level: 3,
        content: line.replace(/^### /, '').replace(/^\*\*(.*?)\*\*$/, '$1') // Remove bold markers from headers
      })
    } else if (line.startsWith('##')) {
      flushList()
      elements.push({
        type: 'header',
        level: 2,
        content: line.replace(/^## /, '').replace(/^\*\*(.*?)\*\*$/, '$1') // Remove bold markers from headers
      })
    } else if (line.startsWith('#')) {
      flushList()
      elements.push({
        type: 'header',
        level: 1,
        content: line.replace(/^# /, '').replace(/^\*\*(.*?)\*\*$/, '$1') // Remove bold markers from headers
      })
    }
    // Code blocks
    else if (line.startsWith('```')) {
      flushList()
      const language = line.replace('```', '') || 'javascript'
      let codeContent = ''
      i++
      
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeContent += lines[i] + '\n'
        i++
      }
      
      elements.push({
        type: 'code',
        language,
        content: codeContent.replace(/\n$/, '') // Remove trailing newline
      })
    }
    // Checkboxes
    else if (line.match(/^- \[(x| )\]/)) {
      flushList()
      const checked = line.includes('[x]')
      const text = line.replace(/^- \[(x| )\] /, '')
      const id = `checkbox-${contentHash}-${checkboxCounter++}`
      
      elements.push({
        type: 'checkbox',
        content: text,
        checked,
        id
      })
    }
    // Regular list items
    else if (line.startsWith('- ')) {
      currentList.push(line.replace(/^- /, ''))
    }
    // Numbered list items
    else if (line.match(/^\d+\. /)) {
      currentList.push(line.replace(/^\d+\. /, ''))
    }
    // Images - standalone images on their own line (with optional whitespace)
    else if (line.match(/^\s*\[([^\]]*)\]\(([^)]+)\)\s*$/)) {
      flushList()
      const match = line.match(/^\s*\[([^\]]*)\]\(([^)]+)\)\s*$/)
      if (match) {
        elements.push({
          type: 'image',
          content: match[2].trim(), // URL
          alt: match[1].trim() // Alt text
        })
      }
    }
    // React components - <component>ComponentName</component>
    else if (line.match(/^\s*<component>([^<]+)<\/component>\s*$/)) {
      flushList()
      const match = line.match(/^\s*<component>([^<]+)<\/component>\s*$/)
      if (match) {
        elements.push({
          type: 'component',
          content: match[1].trim(),
          componentName: match[1].trim()
        })
      }
    }
    // Regular paragraphs
    else {
      flushList()
      elements.push({
        type: 'paragraph',
        content: line
      })
    }
  }
  
  flushList()
  return elements
} 