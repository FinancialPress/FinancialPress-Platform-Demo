
import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { Camera, Upload, X, Loader2, RotateCcw } from 'lucide-react';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropUploadProps {
  onImageCropped: (croppedImageUrl: string) => void;
  aspectRatio?: number; // 1 for square, 16/9 for landscape, etc.
  currentImageUrl?: string | null;
  disabled?: boolean;
  userType?: 'demo' | 'live' | null;
  className?: string;
  buttonText?: string;
  showRemove?: boolean;
  onRemove?: () => void;
}

const ImageCropUpload = ({
  onImageCropped,
  aspectRatio = 1,
  currentImageUrl,
  disabled = false,
  userType,
  className = '',
  buttonText = 'Upload Image',
  showRemove = true,
  onRemove
}: ImageCropUploadProps) => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, or GIF)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const imageUrl = reader.result?.toString() || '';
        console.log('Image loaded for cropping:', imageUrl.substring(0, 50) + '...');
        setImageSrc(imageUrl);
        setShowCropDialog(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    console.log('Image dimensions for cropping:', { width, height, aspectRatio });
    
    // Calculate crop size to fit within image while maintaining aspect ratio
    const cropSize = Math.min(width, height) * 0.8; // Use 80% of smaller dimension
    const cropWidth = aspectRatio >= 1 ? cropSize : cropSize * aspectRatio;
    const cropHeight = aspectRatio >= 1 ? cropSize / aspectRatio : cropSize;
    
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: (cropWidth / width) * 100,
          height: (cropHeight / height) * 100,
        },
        aspectRatio,
        width,
        height
      ),
      width,
      height
    );
    
    console.log('Initial crop set:', crop);
    setCrop(crop);
  }, [aspectRatio]);

  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<string> => {
      console.log('Starting image crop process with crop:', crop);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context available');
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Calculate the exact crop dimensions
      const cropX = crop.x * scaleX;
      const cropY = crop.y * scaleY;
      const cropWidth = crop.width * scaleX;
      const cropHeight = crop.height * scaleY;

      // Set canvas size to match the crop dimensions exactly
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      console.log('Canvas dimensions:', { width: canvas.width, height: canvas.height });
      console.log('Scale factors:', { scaleX, scaleY });
      console.log('Crop coordinates:', { cropX, cropY, cropWidth, cropHeight });

      // Clear canvas and draw the cropped portion
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              throw new Error('Canvas is empty');
            }
            
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result as string;
              console.log('Cropped image created, size:', dataUrl.length);
              resolve(dataUrl);
            };
            reader.readAsDataURL(blob);
          },
          'image/jpeg',
          0.95 // Higher quality for better crop results
        );
      });
    },
    []
  );

  const handleCropComplete = async () => {
    if (!imgRef.current || !completedCrop) {
      console.error('Missing image ref or completed crop');
      return;
    }

    console.log('Processing crop completion...');
    setUploading(true);

    try {
      const croppedImageDataUrl = await getCroppedImg(imgRef.current, completedCrop);
      console.log('Crop completed successfully');
      
      onImageCropped(croppedImageDataUrl);
      setShowCropDialog(false);
      setImageSrc('');
      
      toast({
        title: "Success",
        description: "Image cropped and uploaded successfully",
      });
    } catch (error) {
      console.error('Error cropping image:', error);
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    console.log('Crop dialog cancelled');
    setShowCropDialog(false);
    setImageSrc('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Theme-aware styling
  const buttonClass = isDarkMode 
    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600' 
    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300';

  const dialogClass = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const cropContainerClass = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';

  return (
    <>
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          className={buttonClass}
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Camera className="w-4 h-4 mr-2" />
          )}
          {uploading ? 'Processing...' : buttonText}
        </Button>

        {showRemove && currentImageUrl && onRemove && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemove}
            disabled={disabled || uploading}
            className={buttonClass}
          >
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        className="hidden"
        disabled={disabled || uploading}
      />

      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className={`max-w-4xl ${dialogClass}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-black'}>
              Crop Your Image
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {imageSrc && (
              <div className={`flex justify-center p-4 rounded-lg ${cropContainerClass}`}>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => {
                    console.log('Crop changed:', percentCrop);
                    setCrop(percentCrop);
                  }}
                  onComplete={(c) => {
                    console.log('Crop completed:', c);
                    setCompletedCrop(c);
                  }}
                  aspect={aspectRatio}
                  minWidth={50}
                  minHeight={aspectRatio === 1 ? 50 : 50 / aspectRatio}
                  className="max-w-full"
                  keepSelection={true}
                  ruleOfThirds={true}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imageSrc}
                    onLoad={onImageLoad}
                    className="max-w-full max-h-96 object-contain"
                    style={{ maxHeight: '400px' }}
                  />
                </ReactCrop>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={uploading}
                className={buttonClass}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCropComplete}
                disabled={!completedCrop || uploading}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Apply Crop'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageCropUpload;
