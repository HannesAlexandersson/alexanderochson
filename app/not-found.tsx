import Button from '@/components/Button/Button'
import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import Typography from '@/components/Typography/Typography'
import { OctagonX } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <>
      <Menu />
      <main className='section-contain min-h-screen pt-20'>
        <section className='mx-auto flex max-w-[500px] flex-col items-center gap-4 py-8 md:py-12'>
          <PageTitle className='text-secondaryAccent font-bebas self-center text-center'>
            404
          </PageTitle>
          <OctagonX size={200} color='#4187C4' />
          <Typography variant='h3' className='font-bebas text-secondaryAccent'>
            Sidan kunde inte hittas
          </Typography>
          <Button className={'mt-8 w-full text-center'}>
            <Link href={'/'}>Gå tillbaka hem</Link>
          </Button>
        </section>
      </main>
    </>
  )
}

export default NotFound
