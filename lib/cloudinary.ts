export function cloudinaryUrl(publicId: string, options = ''): string {
    return `https://res.cloudinary.com/djiqjc1ui/image/upload/${options}/${publicId}`
  }