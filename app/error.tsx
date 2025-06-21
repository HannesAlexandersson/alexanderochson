'use client'

import Button from '@/components/Button/Button'
import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import Typography from '@/components/Typography/Typography'
import { OctagonX } from 'lucide-react'
import Link from 'next/link'

type ErrorProps = {
  error: Error
  reset: () => void
}
export default function Error({ error, reset }: ErrorProps) {
  console.error('An error occurred:', error)
  if (error instanceof Error) {
    console.error('Error message:', error.message)
  }
  return (
    <>
      <Menu />
      <main className='section-contain min-h-screen'>
        <section className='mx-auto my-12 flex max-w-[500px] flex-col items-center gap-2 text-center md:mt-16'>
          <PageTitle className='text-secondaryAccent font-bebas self-center text-center'>
            FEL
          </PageTitle>
          <OctagonX size={200} color='#4187C4' />
          <Typography variant='h3' className='font-bebas text-primaryAccent'>
            Sidan kunde inte laddas
          </Typography>
          <Typography
            className={'font-inria-sherif text-secondaryAccent text-center'}
          >
            Ett fel uppstod och sidan laddades inte ordentligt. Testa att ladda
            om sidan med knappen eller återgå till startsidan.
          </Typography>
          <div className='mt-8 flex w-full flex-col gap-4 sm:flex-row'>
            <Button variant='primary' className={'grow text-center'}>
              <Link href={'/'}>Gå tillbaka hem</Link>
            </Button>
            <Button
              variant='secondary'
              className={'grow'}
              onClick={() => reset()}
            >
              Ladda om sidan
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
