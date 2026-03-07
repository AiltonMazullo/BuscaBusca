"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  photos: string[];
  name: string;
}

export function ProductGallery({ photos, name }: ProductGalleryProps) {
  const gallery = useMemo(() => {
    if (Array.isArray(photos) && photos.length > 0) return photos;
    return ["/logo.svg"];
  }, [photos]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  function goPrev() {
    setSelectedIndex((current) =>
      current === 0 ? gallery.length - 1 : current - 1,
    );
  }

  function goNext() {
    setSelectedIndex((current) =>
      current === gallery.length - 1 ? 0 : current + 1,
    );
  }

  const currentImage = gallery[selectedIndex] ?? "/logo.svg";

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-lg border border-zinc-100 bg-white p-4 sm:p-8">
        <div className="aspect-square w-full overflow-hidden rounded-md bg-zinc-50">
          <img
            src={currentImage}
            alt={`${name} - imagem ${selectedIndex + 1}`}
            className="h-full w-full object-contain"
          />
        </div>

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-md transition hover:bg-white"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-md transition hover:bg-white"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {gallery.map((photo, index) => {
            const isActive = index === selectedIndex;

            return (
              <button
                key={`${index}-${photo.slice(0, 30)}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border transition ${
                  isActive
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
                aria-label={`Selecionar imagem ${index + 1}`}
              >
                <img
                  src={photo}
                  alt={`${name} miniatura ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
