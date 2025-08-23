type Props = { videoId: string; title?: string; autoplay?: boolean };

export default function YouTubePlayer({ videoId, title = 'YouTube video', autoplay = true }: Props) {
  if (!videoId) return null;
  const src = `https://www.youtube.com/embed/${videoId}?${autoplay ? 'autoplay=1&' : ''}rel=0&modestbranding=1`;
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden">
      <iframe
        className="h-full w-full"
        src={src}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
