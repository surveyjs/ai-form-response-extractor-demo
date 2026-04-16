interface ProcessingProps {
  model: string;
}

export default function Processing({ model }: ProcessingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Processing with {model}...
        </h2>
        <p className="text-gray-500">
          Extracting structured data from your form images
        </p>
      </div>
    </div>
  );
}
