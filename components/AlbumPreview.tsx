import { useEffect, useState } from 'react';
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";

type AlbumPreviewProps = {
    url: string;
};

export default function AlbumPreview({ url }: AlbumPreviewProps) {
    const [album, setAlbum] = useState<{
        title: string;
        description: string;
        previewImage: string;
    } | null>(null);

    useEffect(() => {
        if (!url) return;

        fetch(`/api/fetchAlbum?url=${encodeURIComponent(url)}`)
            .then(res => res.json())
            .then(data => setAlbum(data))
            .catch(err => console.error(err));
    }, [url]);

    if (album && !album.description) return (null);

    if (!album) return (
        <div className="rounded-2xl border border-border overflow-hidden flex justify-between h-full w-full">
            <div className="flex flex-col space-y-1 p-2 min-w-0">
                <div className="text-base wrap-break-word"></div>
                <div className="text-text-lighter text-sm"></div>
            </div>
            <a href={url} className="rounded-lg m-2 overflow-hidden aspect-video w-36 relative shrink-0 ">
                <div className="absolute w-full h-full bg-background/40"></div>
                <HiMiniArrowTopRightOnSquare className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-text pl-1" />
            </a>
        </div>
    );

    return (
        <div className="rounded-2xl border border-primary overflow-hidden flex justify-between h-full w-full">
            <div className="flex flex-col space-y-1 p-2 min-w-0">
                <div className="text-base wrap-break-word">{album.title}</div>
                <div className="text-text-lighter text-sm">{album.description.split(" ").filter(Number)} foto</div>
            </div>
            <a href={url} className="rounded-lg m-2 overflow-hidden aspect-video w-36 relative shrink-0 ">
                <div className="absolute w-full h-full bg-background/40"></div>
                <HiMiniArrowTopRightOnSquare className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-text pl-1" />
                {album.previewImage && <img width={150} height={100} src={album.previewImage} alt={album.title} loading="lazy" />}
            </a>
        </div>
    );
}
