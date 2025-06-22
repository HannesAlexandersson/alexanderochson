import Menu from '@/components/Navbar/Menu'
import { PageTitleSkeleton } from '@/components/PageTitle/PageTitle'
import Skeleton from '@/components/Skeleton/Skeleton'
import TextBlock, {
  TextBlockSkeleton,
} from '@/components/TextSections/TextSections'

const loading = () => {
  return (
    <>
      <Menu />
      <main className='section-contain min-h-screen pt-20'>
        <PageTitleSkeleton />
        <TextBlock.Section className={'my-16 md:my-32'}>
          {Array.from({ length: 4 }).map((_, i) => (
            <TextBlockSkeleton key={i} />
          ))}
        </TextBlock.Section>
        <section className='flex flex-col gap-16'>
          <Skeleton className={'h-32'} />
          <Skeleton className={'h-32'} />
          <Skeleton className={'h-32'} />
          <Skeleton className={'h-32'} />
        </section>
      </main>
    </>
  )
}

export default loading
