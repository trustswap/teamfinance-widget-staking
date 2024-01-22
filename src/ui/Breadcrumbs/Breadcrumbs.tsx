import Link from 'next/link'

export interface BreadcrumbsProps {
  paths: Array<{
    label: string
    to?: string
  }>
}

export function Breadcrumbs({ paths }: BreadcrumbsProps) {
  if (!paths.length) {
    return null
  }

  return (
    <h2 className="flex text-left text-base font-medium leading-[18px] text-zinc-800">
      {paths
        .slice(0, paths.length !== 1 ? paths.length - 1 : 1)
        .map((path, index) => (
          <Link key={path.label} href={path.to || '/'}>
            <>
              <span className="text-zinc-800">{path.label}</span>
              {paths.length - 2 !== index && paths.length !== 1 && (
                <span className="text-zinc-800">&nbsp;/&nbsp;</span>
              )}
            </>
          </Link>
        ))}
      {paths.length - 1 > 0 && (
        <>
          <span className="text-zinc-800">&nbsp;/</span>
          <span className="text-zinc-500">
            &nbsp;{paths[paths.length - 1].label}
          </span>
        </>
      )}
    </h2>
  )
}
