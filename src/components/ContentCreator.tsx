
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Link, 
  Type, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Eye, 
  Share2, 
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';

interface ContentCreatorProps {
  onNavigate?: (screen: number) => void;
}

const ContentCreator = ({ onNavigate }: ContentCreatorProps) => {
  const [contentType, setContentType] = useState('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = () => {
    // Navigate back to feed after publishing
    onNavigate?.(3);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Create Content</h1>
            <p className="text-gray-400">Share your insights and earn FPT tokens</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-gray-600 text-gray-300">
              Save as Draft
            </Button>
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              onClick={handlePublish}
            >
              Publish Content
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="col-span-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Choose Content Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={contentType} onValueChange={setContentType} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="text" className="flex items-center space-x-2">
                      <Type className="w-4 h-4" />
                      <span>Text Post</span>
                    </TabsTrigger>
                    <TabsTrigger value="link" className="flex items-center space-x-2">
                      <Link className="w-4 h-4" />
                      <span>Link Sharing</span>
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload Content</span>
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>Video Content</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Title</Label>
                      <Input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your content title..."
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Content</Label>
                      <Textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your insights, analysis, or thoughts..."
                        className="bg-gray-800 border-gray-700 text-white min-h-[300px]"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="link" className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Title</Label>
                      <Input 
                        placeholder="Enter content title..."
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Link URL</Label>
                      <Input 
                        placeholder="https://example.com/article"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Your Commentary</Label>
                      <Textarea 
                        placeholder="Add your thoughts and analysis about this content..."
                        className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Drag and drop files here, or click to browse</p>
                      <p className="text-gray-500 text-sm">Supports PDFs, images, documents</p>
                      <Button className="mt-4 bg-gray-700 hover:bg-gray-600">
                        Choose File
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Video Title</Label>
                      <Input 
                        placeholder="Enter video title..."
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Video URL or Upload</Label>
                      <Input 
                        placeholder="YouTube, Vimeo URL or upload video"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Video Description</Label>
                      <Textarea 
                        placeholder="Describe your video content..."
                        className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Tags Section */}
                <div className="mt-6">
                  <Label className="text-gray-300 mb-2 block">Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-blue-600">Crypto</Badge>
                    <Badge className="bg-green-600">Bitcoin</Badge>
                    <Badge className="bg-purple-600">Analysis</Badge>
                  </div>
                  <Input 
                    placeholder="Add tags (comma separated)"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Preview Stats */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-yellow-500" />
                  Content Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Word Count</span>
                  <span className="text-white">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Read Time</span>
                  <span className="text-white">5 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Reach</span>
                  <span className="text-green-400">2.5K - 5K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tip Potential</span>
                  <span className="text-yellow-400">15-30 FPT</span>
                </div>
              </CardContent>
            </Card>

            {/* Smart URL */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Smart URL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">Generate trackable link</p>
                <Input 
                  value="fp.ly/btc-analysis"
                  className="bg-gray-800 border-gray-700 text-white"
                  readOnly
                />
                <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                  Generate Link
                </Button>
              </CardContent>
            </Card>

            {/* Publishing Options */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
                  Publishing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Publish Date</Label>
                  <Input 
                    type="datetime-local"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Auto-Share To:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-300 text-sm">Twitter/X</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-300 text-sm">LinkedIn</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-300 text-sm">Telegram</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;
