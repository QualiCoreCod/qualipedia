import React, { useState } from "react";
import { dataService } from "@/services/dataService";
import { Upload, X, FileText, Loader2 } from "lucide-react";

export default function AttachmentUploader({ value = [], onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const { file_url } = { file_url: "" };
        uploaded.push({ name: file.name, url: file_url });
      }
      onChange([...(value || []), ...uploaded]);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const remove = (idx) => onChange((value || []).filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      <label className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer transition-colors">
        {uploading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>
        ) : (
          <><Upload className="h-4 w-4" /> Anexar arquivos (PDF, imagens, DOCX, XLSX)</>
        )}
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFiles}
          accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.docx,.xlsx,.doc,.xls,.pptx,.ppt,.txt,.csv"
          disabled={uploading}
        />
      </label>
      {(value || []).length > 0 && (
        <div className="space-y-2">
          {value.map((att, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-accent/40 px-3 py-2">
              <a href={att.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 min-w-0 text-sm hover:text-primary">
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{att.name}</span>
              </a>
              <button type="button" onClick={() => remove(idx)} className="text-muted-foreground hover:text-destructive shrink-0">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
