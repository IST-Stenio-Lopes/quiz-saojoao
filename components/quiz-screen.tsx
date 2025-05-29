"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, CheckCircle, X, XCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { preventWidows } from "@/lib/utils"


interface Question {
  question: string
  options: string[]
  correctAnswer: number
  images?: string[]
  imageQuestion?: string
  imagesInline?: string[]
}

interface StopData {
  name: string
  questions: Question[]
  logo: string
  bgQuiz: string
}

interface QuizScreenProps {
  stopData: StopData
  correctAnswers: number
  onCorrectAnswer: () => void
  onIncorrectAnswer: () => void
  onComplete: () => void
  onQuit: () => void
}

export default function QuizScreen({
  stopData,
  correctAnswers,
  onCorrectAnswer,
  onIncorrectAnswer,
  onComplete,
  onQuit,
}: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const currentQuestion = stopData.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === stopData.questions.length - 1

  const handleSelectOption = (optionIndex: number) => {
    if (selectedOption !== null) return // Prevent changing answer after selection

    setSelectedOption(optionIndex)
    setShowFeedback(true)

    if (optionIndex === currentQuestion.correctAnswer) {
      onCorrectAnswer()
    } else {
      onIncorrectAnswer()
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete()
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    }
  }

  const backgroundStyle = {
    backgroundImage: `url('/images/${stopData.bgQuiz}.svg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className="relative flex flex-col h-full w-full"
      style={backgroundStyle}>
      {/* Header */}
      <header className="flex justify-between items-center p-16 text-white">
        <div className="flex items-center">
          <Image src="/logoHeader.png" alt="Logo" width={180} height={180} className="mr-2" />
        </div>
        <div className={`flex items-center border rounded-md bg-zinc-200 ${correctAnswers ? "border-green-500" : "border-zinc-400"} border-2 py-2 gap-2 px-6 w-20"`}>
          <Check className={`${correctAnswers ? "text-green-500" : "text-zinc-400"}`} />
          <span className={`font-bold text-3xl ${correctAnswers ? "text-green-500" : "text-zinc-400"}`}>{correctAnswers}</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-16 flex flex-col">
        <div className="mb-8">

          <div className="px-16">

            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">{preventWidows(currentQuestion.question)}</h2>
          </div>



          <AnimatePresence mode="wait">
            {currentQuestion.imageQuestion && (
              <AnimatePresence mode="wait">
                <motion.div key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}>
                  <img src={`/images/${currentQuestion.imageQuestion}.png`} alt="Imagem da questão" className="mb-12" />
                </motion.div>
              </AnimatePresence>
            )}
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-4"
            >
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={selectedOption !== null}
                  className={`flex-col bg-zinc-200 border-b-[6px] ${currentQuestion.imageQuestion ? "p-10" : "p-20"}
           rounded-lg border-[3px] flex items-center justify-center min-h-[100px] text-center font-bold
          transition-colors duration-200 max-h-[280px] z-10
          ${selectedOption === null
                      ? "border-gray-300"
                      : selectedOption === index
                        ? index === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-100"
                          : "border-red-500 bg-red-100"
                        : index === currentQuestion.correctAnswer && showFeedback
                          ? "border-green-500 bg-green-100"
                          : "border-gray-300 opacity-70"
                    }
        `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center">
                    {currentQuestion.images && currentQuestion.images[index] && (
                      <img
                        src={`/images/${currentQuestion.images[index]}.png`}
                        alt={`Imagem da opção ${index + 1}`}
                        className="flex-1"
                      />
                    )}
                    <div className="flex flex-row gap-8 items-center">
                      {currentQuestion.imagesInline && currentQuestion.imagesInline[index] && (
                        <img
                          src={`/images/${currentQuestion.imagesInline[index]}.png`}
                          alt={`Imagem da opção ${index + 1}`}
                          className="flex-1"
                        />
                      )}

                      <span className={`${currentQuestion.images ? "text-2xl" : "text-3xl"} text-zinc-800`}>
                        {preventWidows(option)}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>


        </div>

        <div className="absolute inset-x-0 -bottom-28 bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none z-0">
          <Image alt="Parada" src={`${stopData.logo}.svg`} width={1200} height={440} className="object-contain" />
        </div>


        <div className="fixed bottom-24 left-0 right-0 flex justify-between items-center gap-10 p-16 z-50">
          <Button variant="outline" onClick={onQuit} className=" rounded-full font-heading text-zinc-50 border-b-[3px] border-zinc-500 text-2xl bg-[#BF4513] p-6
          ">
            <img src="/close.svg" alt="Desitir" className="w-6" />
            DESISTIR
          </Button>


          {selectedOption !== null ? (
            <button onClick={handleNext}><Image src="/skip_active.svg" alt="active button" width={60} height={60} /></button>
          ) : (
            <Image src="skip.svg" alt="button" width={60} height={60} />
          )}

        </div>
      </div>

    </div>
  )
}
