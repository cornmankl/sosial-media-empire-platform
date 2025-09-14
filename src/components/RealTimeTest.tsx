"use client"

import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send } from "lucide-react"

let socket: any = null

export function RealTimeTest() {
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<Array<{text: string, senderId: string, timestamp: string}>>([])
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize socket connection
    socket = io({
      path: "/api/socketio",
    })

    socket.on("connect", () => {
      setIsConnected(true)
      console.log("Connected to Socket.IO server")
      
      // Join a test room
      socket.emit("user:connect", {
        userId: "test-user-123",
        email: "test@example.com"
      })
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
      console.log("Disconnected from Socket.IO server")
    })

    // Listen for messages
    socket.on("message", (msg: {text: string, senderId: string, timestamp: string}) => {
      setMessages(prev => [...prev, msg])
    })

    // Clean up on unmount
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit("message", {
        text: newMessage,
        senderId: "test-user-123"
      })
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Communication Test</CardTitle>
        <CardDescription>
          Test Socket.IO real-time features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Status: {isConnected ? "Real-time connection active" : "Not connected"}
          </span>
        </div>

        <div className="border rounded-lg p-4">
          <ScrollArea className="h-48" ref={scrollAreaRef}>
            <div className="space-y-2">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No messages yet. Send a message to test real-time communication.
                </p>
              ) : (
                messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-md ${msg.senderId === "test-user-123" ? "bg-primary/10 ml-4" : "bg-muted mr-4"}`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            disabled={!isConnected}
          />
          <Button 
            onClick={sendMessage} 
            disabled={!newMessage.trim() || !isConnected}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}