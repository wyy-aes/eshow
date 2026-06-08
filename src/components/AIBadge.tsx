import { Sparkles } from 'lucide-react'

interface Props {
  text?: string
}

export default function AIBadge({ text = 'AI 洞察' }: Props) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-sigo-primary to-sigo-blue text-white">
      <Sparkles size={12} />
      {text}
    </span>
  )
}
