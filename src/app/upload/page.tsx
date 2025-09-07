"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

interface AnalysisResult {
  exercise: string;
  score: number;
  feedback: string[];
  corrections: string[];
  timestamp: string;
}

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [selectedExercise, setSelectedExercise] = useState("squat");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exercises = [
    { id: "squat", name: "Squats" },
    { id: "pushup", name: "Push-ups" },
    { id: "plank", name: "Planks" },
    { id: "deadlift", name: "Deadlifts" },
    { id: "lunge", name: "Lunges" },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setAnalysisResult(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setAnalysisResult(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const analyzeVideo = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const mockResult: AnalysisResult = {
        exercise: selectedExercise,
        score: Math.floor(Math.random() * 40) + 60,
        feedback: [],
        corrections: [],
        timestamp: new Date().toISOString(),
      };

      if (selectedExercise === "squat") {
        if (mockResult.score >= 80) {
          mockResult.feedback.push("Excellent squat depth achieved!");
          mockResult.feedback.push(
            "Great knee alignment throughout the movement"
          );
        } else {
          mockResult.corrections.push(
            "Try to go deeper - aim for thighs parallel to ground"
          );
          mockResult.corrections.push("Keep your chest up and core engaged");
        }
      } else if (selectedExercise === "pushup") {
        if (mockResult.score >= 80) {
          mockResult.feedback.push("Perfect elbow angle maintained");
          mockResult.feedback.push("Excellent core stability");
        } else {
          mockResult.corrections.push(
            "Keep elbows closer to your body (45-degree angle)"
          );
          mockResult.corrections.push(
            "Maintain straight line from head to heels"
          );
        }
      }

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setVideoUrl("");
    setAnalysisResult(null);
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 py-8 relative overflow-hidden md:py-28 px-6 sm:px-10 lg:px-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upload Exercise Video
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Upload a 5-10 second video of your exercise for AI analysis
        </motion.p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedFile ? (
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">
                    Upload Video
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Drag and drop your exercise video or click to browse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Drop your video here
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      or click to browse files
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Supports MP4, MOV, AVI (max 50MB)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between dark:text-white">
                    Video Preview
                    <Button variant="outline" size="sm" onClick={resetUpload}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-auto"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />

                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                          <p>Analyzing your form...</p>
                          <p className="text-sm opacity-75">
                            This may take a few moments
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Button onClick={togglePlayPause} variant="outline">
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Play
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={analyzeVideo}
                      disabled={isAnalyzing}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Form"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Results */}
            {analysisResult && (
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    Analysis Results
                    <Badge
                      variant={
                        analysisResult.score >= 80
                          ? "default"
                          : analysisResult.score >= 60
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {analysisResult.score}/100
                    </Badge>
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Analysis completed for{" "}
                    {
                      exercises.find((e) => e.id === analysisResult.exercise)
                        ?.name
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Score Breakdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium dark:text-gray-200">
                        Overall Form Score
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        {analysisResult.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          analysisResult.score >= 80
                            ? "bg-green-500"
                            : analysisResult.score >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${analysisResult.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Feedback */}
                  {analysisResult.feedback.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        What You Did Well
                      </h4>
                      <div className="space-y-2">
                        {analysisResult.feedback.map((item, index) => (
                          <Alert
                            key={index}
                            className="border-green-200 bg-green-50 dark:bg-green-900 dark:border-green-700"
                          >
                            <AlertDescription className="text-green-800 dark:text-green-300">
                              {item}
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Corrections */}
                  {analysisResult.corrections.length > 0 && (
                    <div>
                      <h4 className="font-medium text-orange-700 dark:text-orange-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Areas for Improvement
                      </h4>
                      <div className="space-y-2">
                        {analysisResult.corrections.map((item, index) => (
                          <Alert
                            key={index}
                            className="border-orange-200 bg-orange-50 dark:bg-orange-900 dark:border-orange-700"
                          >
                            <AlertDescription className="text-orange-800 dark:text-orange-300">
                              {item}
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="flex-1">
                      <Link href="/progress">Save to Progress</Link>
                    </Button>
                    <Button variant="outline" onClick={resetUpload}>
                      Analyze Another Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exercise Selection */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Exercise Type</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Select the exercise in your video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedExercise === exercise.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedExercise(exercise.id)}
                  >
                    <span className="font-medium dark:text-white">
                      {exercise.name}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upload Guidelines */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• Video length: 5-10 seconds</p>
                <p>• Show full body in frame</p>
                <p>• Good lighting conditions</p>
                <p>• Stable camera position</p>
                <p>• Perform 2-3 repetitions</p>
                <p>• Wear fitted clothing</p>
              </CardContent>
            </Card>

            {/* Supported Formats */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Supported Formats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• MP4 (recommended)</p>
                <p>• MOV</p>
                <p>• AVI</p>
                <p>• Maximum size: 50MB</p>
                <p>• Resolution: 720p or higher</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
