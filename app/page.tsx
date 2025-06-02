"use client"

import { useEffect, useRef, useState } from "react"
import StartScreen from "@/components/start-screen"
import MapScreen from "@/components/map-screen"
import QuizScreen from "@/components/quiz-screen"
import ScoreScreen from "@/components/score-screen"
import { usePreventContextMenu } from "@/hooks/use-prevent-context-menu"
import { quizData } from "@/db/quizData"
import CuriosidadesScreen from "@/components/curiosidades-screen"
import OnboardingScreen from "@/components/onboarding"


export default function Home() {
  const [gameState, setGameState] = useState<"start" | "map" | "quiz" | "score" | "curiosidades" | "onboarding">("start")
  const [currentStop, setCurrentStop] = useState(0)
  const [unlockedStops, setUnlockedStops] = useState([0])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  usePreventContextMenu()

  useEffect(() => {
    audioRef.current = new Audio("/sound/background-music.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 1

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])


  const handleStart = () => {
    setGameState("map")
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Não foi possível tocar o áudio:", err)
      })
    }
  }

  const handleSelectStop = (stopIndex: number) => {
    if (unlockedStops.includes(stopIndex)) {
      setCurrentStop(stopIndex)
      setGameState("quiz")
    }
  }

  const handleCompleteStop = () => {
    const nextStop = currentStop + 1

    if (nextStop >= quizData.length) {
      setGameState("score")
      return
    }

    if (!unlockedStops.includes(nextStop)) {
      setUnlockedStops([...unlockedStops, nextStop])
    }

    setGameState("map")
  }

  const handleQuit = () => {
    setCurrentStop(0)
    setUnlockedStops([0])
    setCorrectAnswers(0)
    setTotalAnswered(0)
    setGameState("start")
  }

  const handleCuriosity = () => {
    setGameState("curiosidades")
  }

  const handleOnboarding = () => {
    setGameState("onboarding")
  }

  const handleRestart = () => {
    setCurrentStop(0)
    setUnlockedStops([0])
    setCorrectAnswers(0)
    setTotalAnswered(0)
    setGameState("start")
  }

  const handleTryAgain = () => {
    setCurrentStop(0)
    setUnlockedStops([0])
    setCorrectAnswers(0)
    setTotalAnswered(0)
    setGameState("map")
  }

  const handleCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1)
    setTotalAnswered(totalAnswered + 1)
  }

  const handleIncorrectAnswer = () => {
    setTotalAnswered(totalAnswered + 1)
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
      {/* Container responsivo - TV em landscape ou mobile em portrait */}
      <div className="w-full h-screen mx-auto relative bg-white shadow-lg overflow-hidden
                      max-w-[1080px] max-h-[1920px] 
                      md:max-w-none md:max-h-none">
        {gameState === "start" && <StartScreen onStart={handleOnboarding} />}
        {gameState === "onboarding" && <OnboardingScreen onStart={handleStart} />}
        {gameState === "map" && <MapScreen unlockedStops={unlockedStops} onSelectStop={handleSelectStop} />}
        {gameState === "quiz" && (
          <QuizScreen
            stopData={quizData[currentStop]}
            correctAnswers={correctAnswers}
            onCorrectAnswer={handleCorrectAnswer}
            onIncorrectAnswer={handleIncorrectAnswer}
            onComplete={handleCompleteStop}
            onQuit={handleQuit}
          />
        )}
        {gameState === "score" && (
          <ScoreScreen
            correctAnswers={correctAnswers}
            totalQuestions={quizData.reduce((total, stop) => total + stop.questions.length, 0)}
            onRestart={handleRestart}
            onTryAgain={handleTryAgain}
            onCuriosity={handleCuriosity}
          />
        )}
        {gameState === "curiosidades" && (
          <CuriosidadesScreen comeBack={handleQuit} />
        )}
      </div>
    </main>
  )


}


