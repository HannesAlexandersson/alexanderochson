export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode
}

export type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode
}

export type SectionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export type FooterData = {
  logo: {
    footerLogo: { url: string }
  }[]
  sections: {
    sectionTitle: string
    linkTexts: string[]
  }[]
  partners: {
    partnerName: string
    partnerLogo: { url: string }
  }[]
  socialMedia: {
    socialMediaTitle: string
    socialMediaIcon: { url: string }
    linkToSocialmedia: string
  }[]
  backgroundText: string
}

export type FooterProps = {
  footerData: FooterData
}

export type TextSection = {
  sectionTitle: string
  linkTexts: string[]
}
export type SocialMediaSection = {
  socialMediaTitle: string
  socialMediaIcon: {
    url: string
  }
  linkToSocialmedia: string
}
