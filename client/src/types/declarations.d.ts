/**
 * Global declarations for CSS/SCSS modules.
 * This allows TypeScript to recognize and import styles as objects.
 */

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}