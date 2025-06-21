type Styles = {
  paddingX: string
  paddingY: string
  padding: string

  heroHeadText: string
  heroSubText: string

  sectionHeadText: string
  sectionSubText: string
  timelineBg: string
  timelineClr: string
  timelineArrow: string
  iconBg: string
}

const styles: Styles = {
  paddingX: 'sm:px-16 px-6',
  paddingY: 'sm:py-16 py-6',
  padding: 'sm:px-16 px-6 sm:py-16 py-10',

  heroHeadText:
    'font-black text-secondaryText lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2',
  heroSubText:
    'text-[#dfd9ff] text-primaryText font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]',

  sectionHeadText:
    'text-primaryText font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]',
  sectionSubText:
    'sm:text-[18px] text-[14px] text-secondaryText  uppercase tracking-wider',

  timelineBg: '#fff',
  timelineClr: '#161132',
  timelineArrow: '#17293f',
  iconBg: '#484064',
}

export { styles }
