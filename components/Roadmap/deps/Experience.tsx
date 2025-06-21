'use client'

import { BulletProps } from '@/app/about/about.types'
import { richTextOptions } from '@/components/RichTextOptions/RichTextOptions'
import { textVariant } from '@/lib/motion'
import { styles } from '@/utils/styles'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

interface Experience {
  title: string
  company_name: string
  date: string
  icon: string
  iconBg: string
  points: Document
}

const ExperienceCard: React.FC<Experience> = ({
  title,
  company_name,
  date,
  icon,
  iconBg,
  points,
}) => (
  <VerticalTimelineElement
    visible={true}
    contentStyle={{
      background: `${styles.timelineClr}`,
      color: `${styles.timelineBg}`,
    }} // Customize background color in the styles utility file
    contentArrowStyle={{ borderRight: `7px solid ${styles.timelineArrow}` }} // Customize arrow color in the styles utility file
    date={date}
    iconStyle={{ background: iconBg }}
    icon={
      <div className='flex h-full w-full items-center justify-center'>
        <Image
          src={icon}
          alt={company_name}
          width={100}
          height={100}
          className='h-[60%] w-[60%] object-contain'
        />
      </div>
    }
  >
    <div>
      <h3 className='text-primaryTextDark text-[24px] font-bold'>{title}</h3>
      <p
        style={{ margin: 0 }}
        className='text-secondaryTextDark text-[16px] font-semibold'
      >
        {company_name}
      </p>
    </div>

    <div className='mt-5 ml-5'>
      {documentToReactComponents(points, richTextOptions)}
    </div>
  </VerticalTimelineElement>
)

const Experience = ({ bullets }: { bullets: BulletProps[] }) => {
  /* const experiences = bullets.map(bullet => ({
    title: bullet.title,
    company_name: bullet.subTitle,
    date: bullet.dates,
    icon: bullet.sectionIcon.url,
    iconBg: `${styles.iconBg}`, // customize this based on customer preferences and spefications
    points: bullet.points.json,
  })) */
  const experiences = bullets
    .slice() // clone the array to avoid mutating the original
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) // sort oldest first (ascending order)
    .map(bullet => ({
      title: bullet.title,
      company_name: bullet.subTitle,
      date: bullet.dates,
      icon: bullet.sectionIcon.url,
      iconBg: `${styles.iconBg}`,
      points: bullet.points.json,
    }))
  return (
    <div className='relative'>
      <div className='absolute top-0 z-10 w-full overflow-hidden'>
        <Image
          src='/images/wave.png'
          alt='Background Image'
          width={1400}
          height={100}
          className='z-99 w-full translate-y-[-5%] rotate-180 object-cover'
          priority
        />
      </div>
      <div className='bg-accent-200 w-full px-8 py-64 md:px-16'>
        <motion.div variants={textVariant(0.5)}>
          <p className={`${styles.sectionSubText}`}>Roadmap över</p>
          <h2 className={`${styles.sectionHeadText}`}>Vår historia</h2>
        </motion.div>

        <div className='mt-20 flex flex-col'>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                title={experience.title}
                company_name={experience.company_name}
                date={experience.date ?? ''}
                icon={experience.icon}
                iconBg={experience.iconBg}
                points={experience.points}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
      <div className='absolute bottom-0 z-10 w-full overflow-hidden'>
        <Image
          src='/images/wave.png'
          alt='Background Image'
          width={1400}
          height={100}
          className='z-99 w-full translate-y-[5%] object-cover'
          priority
        />
      </div>
    </div>
  )
}

export default Experience
