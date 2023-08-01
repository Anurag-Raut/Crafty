import Image from 'next/image'
import { Inter } from 'next/font/google'
import Categorize from '../components/card/categorize'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen min-w-200 flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Categorize />
    </main>
  )
}
