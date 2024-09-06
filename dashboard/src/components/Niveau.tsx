import { useEffect, useState } from 'react'
import PageHeader from './PageHeader'
import { Link } from 'react-router-dom'
export interface Niveaux {
  id: number
  libelle: string
  classes_count: number
}
export default function Niveau() {

  const [niveaux, setNiveaux] = useState<Niveaux[] | undefined>(undefined)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/niveaux')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setNiveaux(data.niveaux)
      }).catch(error => {
        console.log('=======================error===================')
        console.log(error)
      })
  }, [])

  return (
    <div className='flex item-center flex-col h-full overflow-y-scrol'>
      <PageHeader breadcumb={[{ text: 'Niveaux', link: "/dashboard/niveau" }]} />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {niveaux?.map((niveau) => <Link
          className='rounded-lg shadow-sm aspect-[1/1] text-2xl font-semibold w-full hover:bg-slate-100 p-8 mx-auto bg-white grid place-content-center'
          to={`/dashboard/niveau/${niveau?.id}`}>
          <span className='mx-auto'>{niveau?.libelle}</span>
          <span className='text-gray-500 text-lg  pt-4'>{niveau?.classes_count} classe{niveau?.classes_count > 1 && 's'}</span>
        </Link>)}
      </div>
    </div>
  )
}
