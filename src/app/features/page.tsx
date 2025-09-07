import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera, CheckCircle, MessageSquare } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className=" min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">  
      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Record or Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Use your camera for real-time analysis or upload a 5-10 second exercise video
                </CardDescription>
              </CardContent>
            </Card>
    
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced pose estimation analyzes your joint positions and movement patterns
                </CardDescription>
              </CardContent>
            </Card>
    
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Get Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive instant feedback with corrections and tips to improve your form
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}

export default page