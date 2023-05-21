import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Tooltip from '@mui/material/Tooltip'
import { twMerge } from 'tailwind-merge'

import { useCopyToClipboard } from '@/hooks'

export interface TextCopyProps {
  children: string
  className?: string
}

export default function TextCopy({ children, className = '' }: TextCopyProps) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [value, copy] = useCopyToClipboard()
  return (
    <div className="flex items-center">
      <p className={twMerge(className)}> {children}</p>

      <Tooltip title={'Copy to Clipboard'}>
        <ContentCopyIcon
          onClick={() => copy(children)}
          className="ml-4 transition-colors cursor-pointer text-gray-label-checkout hover:text-gray-600"
        />
      </Tooltip>
    </div>
  )
}
