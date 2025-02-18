interface DownloadButtonProps {
  imageSrc: string;
  fileName: string;
}
export const DownloadSampleButton: React.FC<DownloadButtonProps> = ({
  imageSrc,
  fileName,
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageSrc); // Fetch from public or server
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="text-sm uppercase font-bold text-app-secondary"
    >
      Download sample document
    </button>
  );
};
