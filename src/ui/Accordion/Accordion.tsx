import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

import { Typography } from '../Typography'

export interface AccordionProps {
  id: number
  defaultExpanded: boolean
  header: string
  children: React.ReactNode
  last?: boolean
}

export function Accordion({
  id,
  header,
  children,
  last,
  defaultExpanded,
}: AccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div key={id} className={classNames({ 'border-b': !last }, 'pb-3 pt-4')}>
      <motion.header
        initial={false}
        className="flex cursor-pointer items-center justify-between bg-white text-black"
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="subtitle-6">{header}</Typography>
        {expanded ? (
          <BiChevronUp className="text-black-60" size={24} />
        ) : (
          <BiChevronDown className="text-black-60" size={24} />
        )}
      </motion.header>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: {
                opacity: 0,
                height: 0,
              },
            }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

Accordion.defaultProps = {
  last: false,
}
