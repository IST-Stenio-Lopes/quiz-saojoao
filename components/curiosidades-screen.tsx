"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"


interface ScoreScreenProps {
  comeBack: () => void
}

interface Curiosidade {
  id: number
  title: string
  description: string
  image: string
}

const curiosidades: Curiosidade[] = [
  {
    id: 1,
    title: "Infância em Bodocongó",
    description:
      "Elba morou no Bodocongó quando criança, onde viveu histórias e memórias que marcaram sua trajetória.",
    image: "/images/curi1.svg",
  },
  {
    id: 2,
    title: "Palco com nome de Elba",
    description:
      "O palco principal do São João de Campina Grande já levou o nome de Elba Ramalho em sua homenagem.",
    image: "/images/curi2.svg",
  },
  {
    id: 3,
    title: "Abertura tradicional com Elba",
    description:
      "Os shows de abertura com Elba Ramalho no Parque do Povo são tradição e celebram o orgulho nordestino.",
    image: "/images/curi3.svg",
  },
]


export default function CuriosidadesScreen({ comeBack }: ScoreScreenProps) {
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({})

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[url('/bg.png')] bg-cover bg-center text-white p-6">
      <div className="flex flex-col items-center gap-4">

        {curiosidades.map((curi) => (
          <div
            key={curi.id}
            onClick={() => toggleFlip(curi.id)}
            className="w-[180px] h-[180px] perspective-1000 cursor-pointer"
          >
            <div
              className={cn(
                "relative w-full h-full transition-transform duration-700 transform-style-preserve-3d",
                flipped[curi.id] ? "rotate-y-180" : ""
              )}
            >

              <div className="absolute w-full h-full backface-hidden bg-zinc-200 border-[3px] border-b-[6px] border-zinc-300  rounded-lg flex items-center justify-center p-4">
                <img
                  src={curi.image}
                  alt={`Curiosidade ${curi.id}`}

                />
              </div>


              <div className="absolute w-full h-full backface-hidden bg-zinc-200 border-[3px] border-b-[6px] border-zinc-300 rounded-lg text-center p-4 transform rotate-y-180 flex flex-col items-center justify-center">
                <h1 className="text-[14px] font-bold mb-2 text-zinc-800">{curi.title}</h1>
                <p className="text-[12px] text-zinc-800">{curi.description}</p>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" onClick={comeBack} className="rounded-full font-heading text-zinc-50 border-b-[3px] border-zinc-300 text-lg bg-[#008AD1] p-6
          ">
          <img src="/ArrowLeft.svg" alt="Voltar para página inicial" />
          Voltar
        </Button>
      </div>

    </div>
  )
}
