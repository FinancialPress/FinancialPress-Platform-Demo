
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Upload, 
  DollarSign, 
  Share2, 
  Video, 
  Image as ImageIcon, 
  Eye, 
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';

interface ContentCreatorProps {
  onNavigate?: (screen: number) => void;
  isDarkMode: boolean;
}

const ContentCreator = ({ onNavigate, isDarkMode }: ContentCreatorProps) => {
  const [contentType, setContentType] = useState('create-earn');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [commentary, setCommentary] = useState('');
  const [description, setDescription] = useState('');
  const [enableLiveChat, setEnableLiveChat] = useState(true);
  const [allowWatchLater, setAllowWatchLater] = useState(true);
  const [shareWith, setShareWith] = useState('public');

  const handlePublish = () => {
    onNavigate?.(3);
  };

  // Theme-aware classes
  const bgClasses = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const inputClasses = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const labelClasses = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const borderClasses = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  return (
    <div className={`min-h-screen ${bgClasses}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${textClasses}`}>Create Content</h1>
            <p className={`${mutedText} text-sm sm:text-base`}>Share your insights and earn FPT tokens</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="outline" className={`${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'} text-sm`}>
              Save as Draft
            </Button>
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-sm"
              onClick={handlePublish}
            >
              Publish Content
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={`text-lg sm:text-xl ${textClasses}`}>Content Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={contentType} onValueChange={setContentType} className="w-full">
                  <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 h-auto">
                    <TabsTrigger value="create-earn" className="flex items-center space-x-2 py-3 px-2 text-xs sm:text-sm">
                      <DollarSign className="w-4 h-4" />
                      <span>Create and Earn</span>
                    </TabsTrigger>
                    <TabsTrigger value="share-insight" className="flex items-center space-x-2 py-3 px-2 text-xs sm:text-sm">
                      <Share2 className="w-4 h-4" />
                      <span>Share with Insight</span>
                    </TabsTrigger>
                    <TabsTrigger value="live-session" className="flex items-center space-x-2 py-3 px-2 text-xs sm:text-sm">
                      <Video className="w-4 h-4" />
                      <span>Host a Live Session</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="create-earn" className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Label className={labelClasses}>Title</Label>
                        <Input 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter your content title..."
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <Label className={labelClasses}>Thumbnail Image</Label>
                        <div className={`border-2 border-dashed ${borderClasses} rounded-lg p-4 text-center`}>
                          <ImageIcon className={`w-8 h-8 ${mutedText} mx-auto mb-2`} />
                          <p className={`${labelClasses} text-sm mb-2`}>Upload thumbnail</p>
                          <Button size="sm" className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} text-xs`}>
                            Choose File
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className={labelClasses}>Upload Content</Label>
                        <div className={`border-2 border-dashed ${borderClasses} rounded-lg p-4 text-center`}>
                          <Upload className={`w-8 h-8 ${mutedText} mx-auto mb-2`} />
                          <p className={`${labelClasses} text-sm mb-2`}>Drag & drop or browse</p>
                          <Button size="sm" className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} text-xs`}>
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className={labelClasses}>Content</Label>
                      <Textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your insights, analysis, or thoughts... (supports basic formatting and links)"
                        className={`${inputClasses} min-h-[200px] sm:min-h-[300px]`}
                      />
                    </div>
                    <div>
                      <Label className={`${labelClasses} mb-2 block`}>Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-blue-600 text-white">Crypto</Badge>
                        <Badge className="bg-green-600 text-white">Bitcoin</Badge>
                        <Badge className="bg-purple-600 text-white">Analysis</Badge>
                      </div>
                      <Input 
                        placeholder="Add tags (comma separated)"
                        className={inputClasses}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="share-insight" className="space-y-4 sm:space-y-6">
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
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com/article"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <Label className={labelClasses}>Your Commentary</Label>
                      <Textarea 
                        value={commentary}
                        onChange={(e) => setCommentary(e.target.value)}
                        placeholder="Add your thoughts and analysis about this content..."
                        className={`${inputClasses} min-h-[150px] sm:min-h-[200px]`}
                      />
                    </div>
                    <div>
                      <Label className={`${labelClasses} mb-2 block`}>Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-blue-600 text-white">Stocks</Badge>
                        <Badge className="bg-red-600 text-white">News</Badge>
                        <Badge className="bg-orange-600 text-white">Commentary</Badge>
                      </div>
                      <Input 
                        placeholder="Add tags (comma separated)"
                        className={inputClasses}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="live-session" className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Label className={labelClasses}>Title</Label>
                        <Input 
                          placeholder="Enter session title..."
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <Label className={labelClasses}>Thumbnail</Label>
                        <div className={`border-2 border-dashed ${borderClasses} rounded-lg p-4 text-center`}>
                          <ImageIcon className={`w-8 h-8 ${mutedText} mx-auto mb-2`} />
                          <p className={`${labelClasses} text-sm mb-2`}>Upload thumbnail</p>
                          <Button size="sm" className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} text-xs`}>
                            Choose File
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className={labelClasses}>Date & Time</Label>
                          <Input 
                            type="datetime-local"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <Label className={labelClasses}>Timezone</Label>
                          <Input 
                            placeholder="UTC-5 (EST)"
                            className={inputClasses}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className={labelClasses}>Description</Label>
                      <Textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your live session..."
                        className={`${inputClasses} min-h-[100px] sm:min-h-[150px]`}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                          <Switch 
                          checked={enableLiveChat}
                          onCheckedChange={setEnableLiveChat}
                          className={`border ${borderClasses}`}
                        />
                        <Label className={labelClasses}>Enable live chat</Label>
                      </div>
                      <div className="flex items-center justify-between">
                        <Switch 
                          checked={allowWatchLater}
                          onCheckedChange={setAllowWatchLater}
                          className={`border ${borderClasses}`}
                        />
                        <Label className={labelClasses}>Let people watch later</Label>
                      </div>
                    </div>
                    <div>
                      <Label className={`${labelClasses} mb-2 block`}>Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-red-600 text-white">Live</Badge>
                        <Badge className="bg-blue-600 text-white">Trading</Badge>
                        <Badge className="bg-green-600 text-white">Market Analysis</Badge>
                      </div>
                      <Input 
                        placeholder="Add tags (comma separated)"
                        className={inputClasses}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Content Stats */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={`text-base sm:text-lg ${textClasses} flex items-center`}>
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
                  Content Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className={`${mutedText} text-sm`}>Estimated Reach</span>
                  <span className={`text-green-400 text-sm font-medium`}>2.5K - 5K</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${mutedText} text-sm`}>Estimated Earnings</span>
                  <span className="text-yellow-400 text-sm font-medium">15-30 FPT</span>
                </div>
              </CardContent>
            </Card>

            {/* Publishing Options */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={`text-base sm:text-lg ${textClasses} flex items-center`}>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
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
                
                <div className="space-y-3">
                  <Label className={labelClasses}>Share with:</Label>
                  <RadioGroup value={shareWith} onValueChange={setShareWith} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="paid" 
                        id="paid" 
                        className={`${isDarkMode ? 'border-gray-600 text-white' : 'border-gray-400 text-gray-900'}`}
                      />
                      <Label htmlFor="paid" className={`${labelClasses} text-sm cursor-pointer`}>
                        Paid subscribers
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="followers" 
                        id="followers"
                        className={`${isDarkMode ? 'border-gray-600 text-white' : 'border-gray-400 text-gray-900'}`}
                      />
                      <Label htmlFor="followers" className={`${labelClasses} text-sm cursor-pointer`}>
                        Followers
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="public" 
                        id="public"
                        className={`${isDarkMode ? 'border-gray-600 text-white' : 'border-gray-400 text-gray-900'}`}
                      />
                      <Label htmlFor="public" className={`${labelClasses} text-sm cursor-pointer`}>
                        Public
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className={labelClasses}>Auto-Share To:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Switch className={`border ${borderClasses}`} />
                      <Label className={`${labelClasses} text-sm`}>Twitter/X</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <Switch className={`border ${borderClasses}`} />
                      <Label className={`${labelClasses} text-sm`}>LinkedIn</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <Switch className={`border ${borderClasses}`} />
                      <Label className={`${labelClasses} text-sm`}>Telegram</Label>
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
