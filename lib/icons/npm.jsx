import React from 'react'
import { Image } from '@zeit-ui/react'

const NpmIcon = () => {
  return (
    <>
      <Image className="img" width={34} src="/assets/npm-logo.webp" />
      <style jsx>{`
        :global(.image.img) {
          margin-bottom: -2px;
        }
      `}</style>
    </>
  )
}

export default NpmIcon
