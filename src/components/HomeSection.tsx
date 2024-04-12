import * as React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  sectionName: string
  childrenRoutes: `/${string}`[]
  children?: React.ReactNode
}

export function HomeSection(props: Props) {
  const { sectionName, childrenRoutes } = props

  return (
    <section className={sectionName}>
      <h2>{sectionName}</h2>
      <div className="flex wrap box-wrapper">
        {
          childrenRoutes.map((link) => {
            return (
              <div key={link} className="box flex center">
                <Link to={link}>{link.indexOf('-') > 0 ? link.split('-')[1] : link}</Link>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}
