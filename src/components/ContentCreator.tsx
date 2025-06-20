
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
  isDarkMode: boolean;
}

const ContentCreator = ({ onNavigate, isDarkMode }: ContentCreatorProps) => {
  const [contentType, setContentType] = useState('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = () => {
    // Navigate back to feed after publishing
    onNavigate?.(3);
  };

  // Theme-aware classes
  const bgClasses = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const inputClasses = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const labelClasses = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className={`min-h-screen ${bgClasses}`}>
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${textClasses}`}>Create Content</h1>
            <p className={mutedText}>Share your insights and earn FPT tokens</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className={isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}>
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
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={`text-xl ${textClasses}`}>Choose Content Type</CardTitle>
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
                      <Label className={labelClasses}>Title</Label>
                      <Input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your content title..."
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <Label className={labelClasses}>Content</Label>
                      <Textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your insights, analysis, or thoughts..."
                        className={`${inputClasses} min-h-[300px]`}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="link" className="space-y-4">
                    <div>
                      <Label className={labelClasses}>Title</Label>
                      <Input 
                        placeholder="Enter content title..."
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <Label className={labelClasses}>Link URL</Label>
                      <Input 
                        placeholder="https://example.com/article"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <Label className={labelClasses}>Your Commentary</Label>
                      <Textarea 
                        placeholder="Add your thoughts and analysis about this content..."
                        className={`${inputClasses} min-h-[200px]`}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div className={`border-2 border-dashed ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-8 text-center`}>
                      <Upload className={`w-12 h-12 ${mutedText} mx-auto mb-4`} />
                      <p className={`${labelClasses} mb-2`}>Drag and drop files here, or click to browse</p>
                      <p className={`${mutedText} text-sm`}>Supports PDFs, images, documents</p>
                      <Button className={`mt-4 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>
                        Choose File
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="space-y-4">
                    <div>
                      <Label className={labelClasses}>Video Title</Label>
                      <Input 
                        placeholder="Enter video title..."
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <Label className={labelClasses}>Video URL or Upload</Label>
                      <Input 
                        placeholder="YouTube, Vimeo URL or upload video"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <Label className={labelClasses}>Video Description</Label>
                      <Textarea 
                        placeholder="Describe your video content..."
                        className={`${inputClasses} min-h-[150px]`}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Tags Section */}
                <div className="mt-6">
                  <Label className={`${labelClasses} mb-2 block`}>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-blue-600">Crypto</Badge>
                    <Badge className="bg-green-600">Bitcoin</Badge>
                    <Badge className="bg-purple-600">Analysis</Badge>
                  </div>
                  <Input 
                    placeholder="Add tags (comma separated)"
                    className={inputClasses}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Preview Stats */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={`text-lg ${textClasses} flex items-center`}>
                  <Eye className="w-5 h-5 mr-2 text-yellow-500" />
                  Content Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className={mutedText}>Word Count</span>
                  <span className={textClasses}>1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className={mutedText}>Read Time</span>
                  <span className={textClasses}>5 min</span>
                </div>
                <div className="flex justify-between">
                  <span className={mutedText}>Estimated Reach</span>
                  <span className="text-green-400">2.5K - 5K</span>
                </div>
                <div className="flex justify-between">
                  <span className={mutedText}>Tip Potential</span>
                  <span className="text-yellow-400">15-30 FPT</span>
                </div>
              </CardContent>
            </Card>

            {/* Smart URL */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={`text-lg ${textClasses}`}>Smart URL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${mutedText} text-sm mb-3`}>Generate trackable link</p>
                <Input 
                  value="fp.ly/btc-analysis"
                  className={inputClasses}
                  readOnly
                />
                <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                  Generate Link
                </Button>
              </CardContent>
            </Card>

            {/* Publishing Options */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={`text-lg ${textClasses} flex items-center`}>
                  <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
                  Publishing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className={labelClasses}>Publish Date</Label>
                  <Input 
                    type="datetime-local"
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={labelClasses}>Auto-Share To:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className={`${labelClasses} text-sm`}>Twitter/X</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className={`${labelClasses} text-sm`}>LinkedIn</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className={`${labelClasses} text-sm`}>Telegram</span>
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
