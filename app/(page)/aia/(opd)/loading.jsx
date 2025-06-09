import CircularProgress from '@mui/material/CircularProgress';
export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-600 bg-opacity-50">
      <CircularProgress size="30px" className="text-error text-lg" />
        <div className="text-4xl text-base-100 text-center mt-6">Loading...</div>
      </div>
    </>
  );
}
