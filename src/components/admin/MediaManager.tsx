import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Plus,
  X,
  Link as LinkIcon,
} from "lucide-react";

interface MediaManagerProps {
  token: string;
}

export default function MediaManager({ token }: MediaManagerProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media?search=${encodeURIComponent(searchTerm)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }
      setMedia(data.media || []);
    } catch (err) {
      console.error("Error loading media:", err);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [searchTerm, token]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!mediaName) {
      setMediaName(file.name);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl && !fileDataUrl) return;

    setUploading(true);
    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: mediaName || "image_asset.jpg",
          url: uploadUrl,
          dataUrl: fileDataUrl,
        }),
      });

      if (res.ok) {
        setIsUploadOpen(false);
        setUploadUrl("");
        setFileDataUrl("");
        setMediaName("");
        fetchMedia();
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media asset?")) return;
    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchMedia();
      }
    } catch (err) {
      console.error("Failed to delete media:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#0F2D63]" />
            <span>Media Library</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload, preview, and manage images (JPG, PNG, WEBP, SVG) for blogs and homepage content.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white font-semibold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#E5AF2B]" />
          <span>Upload Image Asset</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search media by filename..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#0F2D63] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading media library...</div>
      ) : media.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {media.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-100 overflow-hidden flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <span className="font-bold text-slate-900 text-xs block truncate" title={item.name}>
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                      title="Open full image"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleDeleteMedia(item.id)}
                      className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors cursor-pointer"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 text-xs">
          No media files found. Upload an image to get started.
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 md:p-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h3 className="text-base font-bold text-slate-900">Upload Media Asset</h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-5 text-xs">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Asset Title / Name
                </label>
                <input
                  type="text"
                  value={mediaName}
                  onChange={(e) => setMediaName(e.target.value)}
                  placeholder="e.g. hero-graphic.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Option A: Image Direct URL
                </label>
                <input
                  type="text"
                  value={uploadUrl}
                  onChange={(e) => {
                    setUploadUrl(e.target.value);
                    if (e.target.value) setFileDataUrl("");
                  }}
                  placeholder="https://images.unsplash.com/photo..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="shrink mx-3 text-slate-400 font-bold uppercase text-[10px]">OR</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Option B: Upload File (JPG, PNG, WEBP, SVG)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-700 text-xs bg-slate-50 cursor-pointer"
                />
              </div>

              {(uploadUrl || fileDataUrl) && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                  <img
                    src={uploadUrl || fileDataUrl}
                    alt="Preview"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                  />
                  <span className="text-[11px] text-slate-600 font-medium">Image preview ready</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || (!uploadUrl && !fileDataUrl)}
                  className="px-5 py-2 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {uploading ? "Adding Media..." : "Save to Media Library"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
