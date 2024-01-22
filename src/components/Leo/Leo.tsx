import classNames from 'classnames'

import { Typography } from '../../ui'

export default function Leo() {
  return (
    <div
      className={classNames(
        'container m-2 inline-block max-w-prose rounded-xl bg-[#F6F6FA] p-5 text-left shadow-xl'
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Typography className="" variant="title-4">
            Leo
          </Typography>
        </div>
        <div>
          <Typography className="" variant="title-4">
            Leo2
          </Typography>
        </div>
      </div>
    </div>
  )
}
