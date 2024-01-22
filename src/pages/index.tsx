/* eslint-disable no-nested-ternary */
import React from 'react'

import { Widget } from '../components/widget'

export default function TestWidget() {
  return (
    <div className="grid min-h-screen grid-cols-2 gap-4 bg-[#505050]">
      <div className="text-white">
        <p className="mb-5 pl-5 pt-10 text-5xl text-white">
          User Content Title!
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
      </div>

      <div className="flex justify-end bg-[#505050]">
        <Widget
          title="Swap Staking Pool 1"
          poolId={69}
          blockPeriod={1705888440}
          maxStakingAmount={1000}
        />
      </div>
    </div>
  )
}
