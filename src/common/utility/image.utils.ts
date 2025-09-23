import { BadRequestException } from '@nestjs/common';

export function validateImageFile(image: Express.Multer.File): void {
  // Check file size (2MB limit)
  if (image.size > 2097152) {
    throw new BadRequestException('File size too large. Maximum 2MB allowed.');
  }

  // Check file type
  const allowedMimeTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/webp',
  ];
  if (!allowedMimeTypes.includes(image.mimetype)) {
    throw new BadRequestException(
      'Invalid file type. Only PNG, JPG, JPEG, and WebP images are allowed.',
    );
  }
}
