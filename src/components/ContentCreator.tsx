import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImagePlus, Link, Plus, X, Loader2 } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { uploadContentImage } from '@/utils/imageUpload';
import { useToast } from '@/hooks/use-toast';

interface ContentCreatorProps {
  onNavigate?: (screen: number) => void;
  isDarkMode: boolean;
}

const ContentCreator = ({ onNavigate, isDarkMode }: ContentCreatorProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createEarnPost, shareInsightPost } = usePosts();

  // Create & Earn form state
  const [createTitle, setCreateTitle] = useState('');
  const [createBody, setCreateBody] = useState('');
  const [createImageFile, setCreateImageFile] = useState<File | null>(null);
  const [createImagePreview, setCreateImagePreview] = useState<string>('');
  const [createTags, setCreateTags] = useState<string[]>([]);
  const [createTagInput, setCreateTagInput] = useState('');
  const [createSection, setCreateSection] = useState<'stock' | 'crypto'>('stock');

  // Share Insight form state
  const [shareTitle, setShareTitle] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [shareCommentary, setShareCommentary] = useState('');
  const [shareImageFile, setShareImageFile] = useState<File | null>(null);
  const [shareImagePreview, setShareImagePreview] = useState<string>('');
  const [shareTags, setShareTags] = useState<string[]>([]);
  const [shareTagInput, setShareTagInput] = useState('');

  // Loading states
  const [isCreating, setIsCreating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const bgClasses = isDarkMode ? "bg-black text-white" : "bg-gray-50 text-black";
  const cardClasses = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const inputClasses = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300";

  const handleImageUpload = (file: File, type: 'create' | 'share') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      if (type === 'create') {
        setCreateImageFile(file);
        setCreateImagePreview(preview);
      } else {
        setShareImageFile(file);
        setShareImagePreview(preview);
      }
    };
    reader.readAsDataURL(file);
  };

  const addTag = (tag: string, type: 'create' | 'share') => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !getCurrentTags(type).includes(trimmedTag)) {
      if (type === 'create') {
        setCreateTags([...createTags, trimmedTag]);
        setCreateTagInput('');
      } else {
        setShareTags([...shareTags, trimmedTag]);
        setShareTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string, type: 'create' | 'share') => {
    if (type === 'create') {
      setCreateTags(createTags.filter(tag => tag !== tagToRemove));
    } else {
      setShareTags(shareTags.filter(tag => tag !== tagToRemove));
    }
  };

  const getCurrentTags = (type: 'create' | 'share') => {
    return type === 'create' ? createTags : shareTags;
  };

  const handleCreateEarn = async () => {
    console.log('Creating earn post...');
    setIsCreating(true);
    
    try {
      let imageUrl = '';
      
      if (createImageFile) {
        console.log('Uploading image...');
        const uploadedUrl = await uploadContentImage(createImageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const postData = {
        title: createTitle,
        body: createBody,
        image_url: imageUrl || undefined,
        tags: createTags,
        section: createSection
      };

      console.log('Creating post with data:', postData);
      
      const result = await createEarnPost(postData);
      
      if (result) {
        console.log('Post created successfully, navigating to feed');
        
        // Clear form
        setCreateTitle('');
        setCreateBody('');
        setCreateImageFile(null);
        setCreateImagePreview('');
        setCreateTags([]);
        setCreateSection('stock');
        
        // Navigate to feed to see the new post
        navigate('/feed');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleShareInsight = async () => {
    console.log('Sharing insight...');
    setIsSharing(true);
    
    try {
      let imageUrl = '';
      
      if (shareImageFile) {
        console.log('Uploading image...');
        const uploadedUrl = await uploadContentImage(shareImageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const postData = {
        title: shareTitle,
        external_url: shareUrl,
        commentary: shareCommentary,
        image_url: imageUrl || undefined,
        tags: shareTags
      };

      console.log('Sharing insight with data:', postData);
      
      const result = await shareInsightPost(postData);
      
      if (result) {
        console.log('Insight shared successfully, navigating to feed');
        
        // Clear form
        setShareTitle('');
        setShareUrl('');
        setShareCommentary('');
        setShareImageFile(null);
        setShareImagePreview('');
        setShareTags([]);
        
        // Navigate to feed to see the new post
        navigate('/feed');
      }
    } catch (error) {
      console.error('Error sharing insight:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className={`${bgClasses} min-h-screen py-8`}>
      <section className="max-w-4xl mx-auto px-8">
        <Card className={cardClasses}>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Create Content & Share Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="create" className="space-y-4">
              <TabsList>
                <TabsTrigger value="create">Create & Earn</TabsTrigger>
                <TabsTrigger value="share">Share Insight</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="create-title">Title</Label>
                    <Input
                      id="create-title"
                      className={inputClasses}
                      value={createTitle}
                      onChange={(e) => setCreateTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-body">Content</Label>
                    <Textarea
                      id="create-body"
                      className={inputClasses}
                      value={createBody}
                      onChange={(e) => setCreateBody(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Image Upload</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        id="create-image"
                        className="hidden"
                        onChange={(e) => {
                          const file = (e.target.files as FileList)[0];
                          if (file) {
                            handleImageUpload(file, 'create');
                          }
                        }}
                      />
                      <Label htmlFor="create-image" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                        <ImagePlus className="w-5 h-5 mr-2 inline-block" />
                        Upload Image
                      </Label>
                      {createImagePreview && (
                        <div className="relative">
                          <img
                            src={createImagePreview}
                            alt="Create Preview"
                            className="w-32 h-32 object-cover rounded-md"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 bg-black/50 text-white hover:bg-black/75"
                            onClick={() => {
                              setCreateImageFile(null);
                              setCreateImagePreview('');
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Tags</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Add a tag"
                        className={inputClasses}
                        value={createTagInput}
                        onChange={(e) => setCreateTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(createTagInput, 'create');
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => addTag(createTagInput, 'create')}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {createTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 -mr-1"
                            onClick={() => removeTag(tag, 'create')}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="create-section">Section</Label>
                    <Select value={createSection} onValueChange={(value) => setCreateSection(value as 'stock' | 'crypto')}>
                      <SelectTrigger className={inputClasses}>
                        <SelectValue placeholder="Select a section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stock">Stock</SelectItem>
                        <SelectItem value="crypto">Crypto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={handleCreateEarn}
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Publish Content'
                    )}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="share">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="share-title">Title</Label>
                    <Input
                      id="share-title"
                      className={inputClasses}
                      value={shareTitle}
                      onChange={(e) => setShareTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="share-url">URL</Label>
                    <Input
                      id="share-url"
                      className={inputClasses}
                      type="url"
                      value={shareUrl}
                      onChange={(e) => setShareUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="share-commentary">Commentary</Label>
                    <Textarea
                      id="share-commentary"
                      className={inputClasses}
                      value={shareCommentary}
                      onChange={(e) => setShareCommentary(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Image Upload</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        id="share-image"
                        className="hidden"
                        onChange={(e) => {
                          const file = (e.target.files as FileList)[0];
                          if (file) {
                            handleImageUpload(file, 'share');
                          }
                        }}
                      />
                      <Label htmlFor="share-image" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                        <ImagePlus className="w-5 h-5 mr-2 inline-block" />
                        Upload Image
                      </Label>
                      {shareImagePreview && (
                        <div className="relative">
                          <img
                            src={shareImagePreview}
                            alt="Share Preview"
                            className="w-32 h-32 object-cover rounded-md"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 bg-black/50 text-white hover:bg-black/75"
                            onClick={() => {
                              setShareImageFile(null);
                              setShareImagePreview('');
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Tags</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Add a tag"
                        className={inputClasses}
                        value={shareTagInput}
                        onChange={(e) => setShareTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(shareTagInput, 'share');
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => addTag(shareTagInput, 'share')}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {shareTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 -mr-1"
                            onClick={() => removeTag(tag, 'share')}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={handleShareInsight}
                    disabled={isSharing}
                  >
                    {isSharing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sharing...
                      </>
                    ) : (
                      'Share Insight'
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ContentCreator;
