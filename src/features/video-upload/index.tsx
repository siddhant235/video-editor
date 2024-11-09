'use client'

import { useState, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, Play, Upload as UploadIcon } from "lucide-react"
interface VideoUploadCardProps {
    handleUploadedVideoCallback: (videoURL: string) => void
    handleVideoDurationCallback: (duration: number) => void
}
const VideoUploadCard = (props: VideoUploadCardProps) => {
    const { handleUploadedVideoCallback, handleVideoDurationCallback } = props
    const [video, setVideo] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFile = (file: File) => {
        if (file && file.type.startsWith('video/')) {
            setVideo(file)
            setError(null)
        } else {
            setError('Please upload a valid video file.')
        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        handleFile(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'video/*': [] },
        multiple: false,
        noClick: true // Disable click behavior from react-dropzone
    })

    const handleUpload = () => {
        if (video) {
            // Implement your upload logic here
            console.log("video", video)
            const blobUrl = URL.createObjectURL(video);
            const videoElement = document.createElement('video');
            videoElement.src = blobUrl;

            // When the video metadata is loaded, we can access the duration
            videoElement.onloadedmetadata = () => {
                const duration = videoElement.duration; // Video duration in seconds
                handleVideoDurationCallback(duration)
            };
            handleUploadedVideoCallback(blobUrl)
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            handleFile(file)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Upload Video</CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
                        }`}
                    onClick={handleClick}
                >
                    <input {...getInputProps()} />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        accept="video/*"
                        className="hidden"
                    />
                    {video ? (
                        <div className="space-y-2">
                            <video className="w-full rounded-lg" controls>
                                <source src={URL.createObjectURL(video)} type={video.type} />
                                Your browser does not support the video tag.
                            </video>
                            <p className="text-sm text-gray-500">{video.name}</p>
                            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setVideo(null); }}>
                                <X className="w-4 h-4 mr-2" />
                                Remove
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Upload className="w-12 h-12 mx-auto text-gray-400" />
                            <p className="text-lg font-semibold">
                                {isDragActive ? 'Drop the video here' : 'Drag & drop a video file here'}
                            </p>
                            <p className="text-sm text-gray-500">Or click to select a file</p>
                        </div>
                    )}
                </div>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter className="justify-end">
                <Button onClick={handleUpload} disabled={!video}>
                    <Play className="w-4 h-4 mr-2" />
                    Upload Video
                </Button>
            </CardFooter>
        </Card>
    )
}

export default VideoUploadCard