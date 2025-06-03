"use client"
import { Button } from "@/components/ui/button"
import { preventWidows } from "@/lib/utils"
import { Trophy, RotateCcw, Home } from "lucide-react"

interface ScoreScreenProps {
  correctAnswers: number
  totalQuestions: number
  onRestart: () => void
  onTryAgain: () => void
  onCuriosity: () => void
}

export default function ScoreScreen({ correctAnswers, totalQuestions, onRestart, onTryAgain, onCuriosity }: ScoreScreenProps) {

  let message = ""
  let color = ""

  if (correctAnswers >= 8) {
    message = "Você brilhou mais que fogueira em noite de forró!"
    color = "text-green-600"
  } else if (correctAnswers >= 4 && correctAnswers <= 7) {
    message = "Tu tá no caminho, visse? Já pode subir no caminhão do forró!"
    color = "text-blue-600"
  } else {
    message = "Tu tá mais perdido que sanfoneiro sem fole! Joga mais uma vez!"
    color = "text-yellow-600"
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[url('/bg.png')] bg-cover bg-center text-white p-6">
      <div className=" flex flex-col items-center">
        <img src="/elbaFinal.png" alt="Elba Logo" className="mb-4 w-40" />
        <h1 className="text-3xl sm:text-[70px] font-bold mb-2 font-heading text-center">{correctAnswers} / {totalQuestions}</h1>
        {/* <p className={`text-2xl font-bold mb-4 ${color}`}>
          {correctAnswers} de {totalQuestions} ({percentage}%)
        </p> */}
        <p className="text-xl mb-4 text-center font-heading p-8">{preventWidows(message)}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center items-center">

        <img onClick={onRestart} src="/restart.png" alt="Recomeçar" className="w-40" />
        <img onClick={onCuriosity} src="/btnCuriosidades.png" alt="Curiosidades" className="w-40" />




      </div>
    </div>
  )
}
