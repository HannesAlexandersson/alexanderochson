import Menu from '@/components/Navbar/Menu'
import { PageTitleSkeleton } from '@/components/PageTitle/PageTitle'
import Skeleton from '@/components/Skeleton/Skeleton'

const loading = ({}) => {
  return (
    <>
      <Menu />
      <main className='section-contain mt-20 min-h-screen max-w-[1024px]'>
        <PageTitleSkeleton />
        <article className='flex flex-col gap-4'>
          <Skeleton className={'h-10'} />
          <Skeleton className={'h-10'} />
          <Skeleton className={'h-10 w-1/2'} />
        </article>
      </main>
    </>
  )
}

export default loading
