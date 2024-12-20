'use client'

import Card from 'components/projectcard'
import projectsData from 'data/projectsData'
import { useParams } from 'next/navigation'
import { LocaleTypes } from '../i18n/settings'

const Project = () => {
  const locale = useParams()?.locale as LocaleTypes
  const projectArray = projectsData[locale]
  return (
    <>
      {projectArray.map((project) => (
        <Card
          key={project.title}
          title={project.title}
          description={project.description}
          imgSrc={project.imgSrc}
          href={project.href}
        />
      ))}
    </>
  )
}

export default Project
