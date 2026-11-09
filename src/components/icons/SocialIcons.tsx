import React from 'react';

export const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.35 7.34 9.06 7.41 8.81 7.68C8.56 7.95 7.85 8.62 7.85 9.97C7.85 11.32 8.83 12.63 8.97 12.81C9.11 13 10.9 15.75 13.64 16.93C14.29 17.21 14.8 17.38 15.2 17.5C15.85 17.71 16.44 17.68 16.91 17.61C17.43 17.53 18.52 16.95 18.75 16.31C18.98 15.67 18.98 15.12 18.91 15.01C18.84 14.9 18.66 14.83 18.39 14.69C18.12 14.56 16.81 13.91 16.57 13.82C16.33 13.73 16.15 13.69 15.98 13.96C15.8 14.23 15.3 14.83 15.15 15C15 15.18 14.85 15.2 14.58 15.07C14.31 14.93 13.44 14.65 12.41 13.73C11.61 13.01 11.07 12.13 10.91 11.86C10.76 11.59 10.89 11.44 11.03 11.31C11.15 11.2 11.3 11.01 11.44 10.85C11.58 10.69 11.62 10.58 11.71 10.4C11.8 10.22 11.76 10.07 11.69 9.93C11.62 9.79 11.08 8.47 10.86 7.93C10.64 7.41 10.41 7.48 10.24 7.47C10.08 7.47 9.89 7.47 9.71 7.47" />
  </svg>
);

