"use client"

import { Medal, Award } from 'lucide-react'
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface Participant {
  id: string
  name: string
  points: number
  profileImage: string
  website: string
}

export default function StaticLeaderboard() {
  // EDIT THESE VALUES TO CUSTOMIZE YOUR LEADERBOARD
  // To add your own images:
  // 1. Place participant images in: public/images/participants/
  // 2. Place project images in: public/images/projects/
  // 3. Update the paths below (remove "/placeholder.svg?height=40&width=40" and use "/images/participants/your-image.jpg")
  const participants: Participant[] = [
    { 
      id: "1", 
      name: "Micheal Jackson", 
      points: 420, 
      profileImage: "/images/participants/nopfp.png", // Replace with your image
      website: "https://google.com"
    },
    { 
      id: "2", 
      name: "Jechtt", 
      points: 0, 
      profileImage: "/images/participants/Jechtt.webp", // Replace with your image
      website: "https://example.com"
    },
    { 
      id: "3", 
      name: "Participant 3", 
      points: 0, 
      profileImage: "/images/participants/abi.webp", // Replace with your image
      website: "https://example.com"
    },
    { 
      id: "4", 
      name: "Participant 4", 
      points: 0, 
      profileImage: "/images/participants/nopfp.png", // Replace with your image
      website: "https://example.com"
    },
    { 
      id: "5", 
      name: "Participant 5", 
      points: 0, 
      profileImage: "/images/participants/Felipe.webp", // Replace with your image
      website: "https://example.com"
    },
    { 
      id: "6", 
      name: "Participant 6", 
      points: 0, 
      profileImage: "/images/participants/Shushama.webp", // Replace with your image
      website: "https://example.com"
    },
    { 
      id: "7", 
      name: "Participant 7", 
      points: 0, 
      profileImage: "/images/participants/nopfp.png", // Replace with your image
      website: "https://example.com"
    },
    { 
      id: "8", 
      name: "Participant 8", 
      points: 0, 
      profileImage: "/images/participants/nopfp.png", // Replace with your image
      website: "https://example.com"
    },
    { 
      id: "9", 
      name: "Participant 9", 
      points: 0, 
      profileImage: "/images/participants/nopfp.png", // Replace with your image
      website: "https://example.com"
    },
    { 
      id: "10", 
      name: "Participant 10", 
      points: 0, 
      profileImage: "/images/participants/nopfp.png", // Replace with your image
      website: "https://example.com"
    },
    { 
      id: "11", 
      name: "Participant 11", 
      points: 0, 
      profileImage: "/images/participants/nopfp.png", // Replace with your image
      website: "https://example.com"
    },
  ]

  // EDIT THESE VALUES FOR THE PROJECT SECTION
  const projectName = "Project Name"
  const creatorName = "Name"
  const projectImage = "/images/projects/winner-project.jpg" // Replace with your project image

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

  return (
    <div
      className="min-h-screen text-white p-6 relative"
      style={{
        backgroundImage: "url('/images/background/Grainy Curves on Dark Canvas.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Rankings (takes 2 columns) */}
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
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                      }}
                    />
                  </div>
                </div>

                {/* Name and Points */}
                <div className="flex-1">
                  <a 
                    href={participant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 font-semibold text-lg hover:text-orange-300 transition-colors cursor-pointer underline decoration-transparent hover:decoration-orange-300"
                  >
                    {participant.name}
                  </a>
                  <div className="text-gray-400 text-sm">
                    Points: {participant.points}
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
              Current Winner: {projectName}
            </h2>

            <Card className="bg-gray-200 border-gray-300 w-full max-w-[640px] h-[480px] flex items-center justify-center relative overflow-hidden mx-auto">
              <Image 
                src={projectImage || "/placeholder.svg"} 
                alt="Project" 
                fill 
                className="object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = "/placeholder.svg?height=480&width=640"
                }}
              />
            </Card>
          </div>

          <div className="text-base text-gray-200 flex items-center gap-2">
            Created by: {creatorName}
          </div>
        </div>
      </div>
    </div>
  )
}
