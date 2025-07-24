"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Edit2, Upload, Medal, Award, Lock, Unlock } from 'lucide-react'
import Image from "next/image"

interface Participant {
  id: string
  name: string
  points: number
  profileImage: string
}

export default function Leaderboard() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const correctPassword = "w@c35K9#9$1" // You can change this to your desired password
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "Participant", points: 0, profileImage: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Participant", points: 0, profileImage: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Participant", points: 0, profileImage: "/placeholder.svg?height=40&width=40" },
    { id: "4", name: "Participant", points: 0, profileImage: "/placeholder.svg?height=40&width=40" },
    { id: "5", name: "Participant", points: 0, profileImage: "/placeholder.svg?height=40&width=40" },
    { id: "6", name: "Participant", points: 0, profileImage: "/placeholder.svg?height=40&width=40" },
    { id: "7", name: "Participant", points: 0, profileImage: "/placeholder.svg?height=40&width=40" },
    { id: "8", name: "Participant", points: 0, profileImage: "/placeholder.svg?height=40&width=40" },
  ])

  const [editingName, setEditingName] = useState<string | null>(null)
  const [editingImage, setEditingImage] = useState<string | null>(null)
  const [projectImage, setProjectImage] = useState<string>("")
  const [projectName, setProjectName] = useState("Project Name")
  const [creatorName, setCreatorName] = useState("Name")
  const [editingPoints, setEditingPoints] = useState<string | null>(null)

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Medal className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <Award className="w-6 h-6 text-gray-600" />
    }
  }

  const updateParticipantName = (id: string, newName: string) => {
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, name: newName } : p)))
    setEditingName(null)
  }

  const updateParticipantPoints = (id: string, newPoints: string) => {
    const points = parseInt(newPoints) || 0
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, points } : p)))
    setEditingPoints(null)
  }

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, profileImage: result } : p)))
      }
      reader.readAsDataURL(file)
    }
    setEditingImage(null)
  }

  const handleProjectImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProjectImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordSubmit = () => {
    if (passwordInput === correctPassword) {
      setIsUnlocked(true)
      setShowPasswordDialog(false)
      setPasswordInput("")
    } else {
      alert("Incorrect password!")
      setPasswordInput("")
    }
  }

  return (
    <div
      className="min-h-screen text-white p-6 relative"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Rankings (now takes 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-200 mb-6">Builder Rankings</h1>

          <Card className="bg-gray-800 border-gray-700 p-4 space-y-3">
            {participants.map((participant, index) => (
              <div key={participant.id} className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                {/* Position Number */}
                <div className="text-2xl font-bold text-gray-300 w-8">{index + 1}</div>

                {/* Profile Picture */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                    <Image
                      src={participant.profileImage || "/placeholder.svg"}
                      alt={participant.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isUnlocked && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-gray-600 hover:bg-gray-500 rounded-full"
                      onClick={() => setEditingImage(participant.id)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                  )}
                  {editingImage === participant.id && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => isUnlocked && handleImageUpload(participant.id, e)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  )}
                </div>

                {/* Name and Points */}
                <div className="flex-1">
                  {editingName === participant.id ? (
                    <Input
                      defaultValue={participant.name}
                      onBlur={(e) => updateParticipantName(participant.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateParticipantName(participant.id, e.currentTarget.value)
                        }
                      }}
                      className="bg-gray-600 border-gray-500 text-orange-400 font-semibold"
                      autoFocus
                    />
                  ) : (
                    <div className="cursor-pointer group" onClick={() => isUnlocked && setEditingName(participant.id)}>
                      <div className="text-orange-400 font-semibold text-lg group-hover:text-orange-300">
                        {participant.name}
                        <Edit2 className="w-4 h-4 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  )}
                  <div className="text-gray-400 text-sm">
                    Points: {editingPoints === participant.id ? (
                      <Input
                        defaultValue={participant.points.toString()}
                        onBlur={(e) => updateParticipantPoints(participant.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateParticipantPoints(participant.id, e.currentTarget.value)
                          }
                        }}
                        className="inline-block bg-gray-600 border-gray-500 text-gray-400 text-sm w-16 h-6 px-1"
                        autoFocus
                        type="number"
                        min="0"
                      />
                    ) : (
                      <span
                        className="cursor-pointer hover:text-gray-300 transition-colors"
                        onClick={() => isUnlocked && setEditingPoints(participant.id)}
                      >
                        {participant.points}
                        {isUnlocked && <Edit2 className="w-3 h-3 inline ml-1 opacity-0 hover:opacity-100 transition-opacity" />}
                      </span>
                    )}
                  </div>
                </div>

                {/* Medal */}
                <div className="ml-auto">{getMedalIcon(index + 1)}</div>
              </div>
            ))}
          </Card>
        </div>

        {/* Right Side - Current Winner */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              Current Winner:
              <Input
                value={projectName}
                onChange={(e) => isUnlocked && setProjectName(e.target.value)}
                disabled={!isUnlocked}
                className="bg-transparent border-none text-lg font-bold text-gray-200 p-0 w-auto min-w-[150px] disabled:opacity-100"
              />
            </h2>

            <Card className="bg-gray-200 border-gray-300 w-full max-w-[640px] h-[480px] flex items-center justify-center relative overflow-hidden mx-auto">
              {projectImage ? (
                <Image src={projectImage || "/placeholder.svg"} alt="Project" fill className="object-cover" />
              ) : (
                <div className="text-center text-gray-600">
                  <Upload className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-lg">Upload Image Here</p>
                </div>
              )}
              {isUnlocked && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProjectImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
            </Card>
          </div>

          <div className="text-base text-gray-200 flex items-center gap-2">
            Created by:
            <Input
              value={creatorName}
              onChange={(e) => isUnlocked && setCreatorName(e.target.value)}
              disabled={!isUnlocked}
              className="bg-transparent border-none text-base text-gray-200 p-0 w-auto min-w-[100px] disabled:opacity-100"
            />
          </div>
        </div>
      </div>
      {/* Lock Icon */}
      <div className="fixed bottom-4 right-4">
        <Button
          size="sm"
          variant={isUnlocked ? "default" : "secondary"}
          className="rounded-full w-12 h-12 p-0"
          onClick={() => setShowPasswordDialog(true)}
        >
          {isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
        </Button>
      </div>

      {/* Password Dialog */}
      {showPasswordDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 p-6 w-80">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {isUnlocked ? "Lock Editing" : "Enter Password to Edit"}
            </h3>
            {!isUnlocked ? (
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <div className="flex gap-2">
                  <Button onClick={handlePasswordSubmit} className="flex-1">
                    Unlock
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPasswordDialog(false)
                      setPasswordInput("")
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-300">Click to lock all editing features</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setIsUnlocked(false)
                      setShowPasswordDialog(false)
                    }}
                    className="flex-1"
                  >
                    Lock
                  </Button>
                  <Button variant="outline" onClick={() => setShowPasswordDialog(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
