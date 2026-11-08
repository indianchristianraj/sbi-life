import React, { useState } from 'react';
import { Download, Check, Loader2 } from 'lucide-react';

interface Props {
  className?: string;
  variant?: 'primary' | 'secondary' | 'header' | 'footer' | 'banner';
}

export const downloadStandaloneIndexHtml = async (): Promise<void> => {
  try {
    let htmlText = '';
    
    // If running offline directly from file://, export current complete DOM
    if (window.location.protocol === 'file:') {
      htmlText = '<!doctype html>\n' + document.documentElement.outerHTML;
    } else {
      // Fetch the standalone pre-bundled single-file HTML containing all inlined CSS, JS & Base64 images
      const res = await fetch('/download/index.html');
      if (!res.ok) {
        // Fallback to static public file if /download endpoint fails
        const fallbackRes = await fetch('/standalone-index.html');
        if (!fallbackRes.ok) {
          throw new Error(`Failed to fetch standalone HTML (Status: ${res.status})`);
        }
        htmlText = await fallbackRes.text();
      } else {
        htmlText = await res.text();
      }
    }

    // Requirement: Create a Blob with type "text/html;charset=utf-8"
    const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });

    // Requirement: Create an object URL with URL.createObjectURL
    const objectUrl = URL.createObjectURL(blob);

    // Requirement: Trigger an anchor with download="index.html"
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = objectUrl;
    downloadAnchor.download = 'index.html';
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);

    // Requirement: Revoke the object URL after the download has been initiated safely
    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 2000);
  } catch (err) {
    console.error('Blob-based download failed, falling back to direct endpoint:', err);
    // Direct browser navigation download fallback
    const fallbackLink = document.createElement('a');
    fallbackLink.href = '/download/index.html';
    fallbackLink.download = 'index.html';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
  }
};

export const DownloadWebsiteButton: React.FC<Props> = ({
  className = '',
  variant = 'primary',
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);
    setDownloaded(false);

    try {
      await downloadStandaloneIndexHtml();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3500);
    } finally {
      setDownloading(false);
    }
  };

  if (variant === 'banner') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={downloading}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-xs cursor-pointer ${className}`}
        title="Download complete standalone index.html (works completely offline)"
      >
        {downloading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Preparing index.html...</span>
          </>
        ) : downloaded ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-200" />
            <span>Downloaded index.html!</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5" />
            <span>Download Website — index.html</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'header') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={downloading}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0 ${className}`}
        title="Download complete single-file website (offline ready)"
      >
        {downloading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
            <span className="hidden xl:inline">Exporting...</span>
          </>
        ) : downloaded ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-emerald-900 font-bold">Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Download Website — index.html</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'footer') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={downloading}
        className={`w-full py-2 px-3 rounded-lg bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${className}`}
        title="One-click download of the complete website as index.html"
      >
        {downloading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-300" />
            <span>Exporting index.html...</span>
          </>
        ) : downloaded ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-300" />
            <span>Website Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5 text-emerald-300" />
            <span>Download Website — index.html</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={downloading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm hover:shadow transition-all cursor-pointer ${className}`}
    >
      {downloading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Generating Standalone HTML...</span>
        </>
      ) : downloaded ? (
        <>
          <Check className="w-4 h-4 text-emerald-200" />
          <span>Downloaded index.html!</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>Download Website — index.html</span>
        </>
      )}
    </button>
  );
};

export const downloadNetlifyZip = async (): Promise<void> => {
  try {
    const res = await fetch('/download/netlify-deploy.zip');
    if (!res.ok) {
      throw new Error(`Failed to fetch netlify-deploy.zip (Status: ${res.status})`);
    }
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = 'netlify-deploy.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 2500);
  } catch (err) {
    console.error('Blob fetch failed, falling back to direct anchor:', err);
    const a = document.createElement('a');
    a.href = '/download/netlify-deploy.zip';
    a.download = 'netlify-deploy.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export const downloadSourceZip = async (): Promise<void> => {
  try {
    const res = await fetch('/download/project-source.zip');
    if (!res.ok) {
      throw new Error(`Failed to fetch project-source.zip (Status: ${res.status})`);
    }
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = 'project-source.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 2500);
  } catch (err) {
    const a = document.createElement('a');
    a.href = '/download/project-source.zip';
    a.download = 'project-source.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

interface NetlifyButtonProps {
  className?: string;
  variant?: 'banner' | 'header' | 'footer' | 'card';
}

export const DownloadNetlifyDeployButton: React.FC<NetlifyButtonProps> = ({
  className = '',
  variant = 'banner',
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);
    setDownloaded(false);
    try {
      await downloadNetlifyZip();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3500);
    } finally {
      setDownloading(false);
    }
  };

  if (variant === 'banner') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={downloading}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-xs cursor-pointer ${className}`}
        title="Download production ZIP ready for Netlify manual drag-and-drop deployment"
      >
        {downloading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Packaging ZIP...</span>
          </>
        ) : downloaded ? (
          <>
            <Check className="w-3.5 h-3.5 text-teal-200" />
            <span>ZIP Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5" />
            <span>Download Netlify Deployment ZIP</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'footer') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={downloading}
        className={`w-full py-2 px-3 rounded-lg bg-teal-900/70 hover:bg-teal-800 border border-teal-700/70 text-teal-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${className}`}
        title="Download netlify-deploy.zip containing compiled website and _redirects"
      >
        {downloading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-300" />
            <span>Packaging ZIP...</span>
          </>
        ) : downloaded ? (
          <>
            <Check className="w-3.5 h-3.5 text-teal-300" />
            <span>ZIP Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5 text-teal-300" />
            <span>Download Netlify Deployment ZIP</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={downloading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-teal-700 hover:bg-teal-800 text-white shadow-sm hover:shadow transition-all cursor-pointer ${className}`}
    >
      {downloading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Preparing Netlify Deployment ZIP...</span>
        </>
      ) : downloaded ? (
        <>
          <Check className="w-4 h-4 text-teal-200" />
          <span>Downloaded netlify-deploy.zip!</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>Download Netlify Deployment ZIP</span>
        </>
      )}
    </button>
  );
};
