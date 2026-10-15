// Additional image type declarations for uppercase extensions (.PNG, .JPEG, .JPG, etc.)
declare module "*.PNG" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "*.JPEG" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "*.JPG" {
  const content: import("next/image").StaticImageData;
  export default content;
}
