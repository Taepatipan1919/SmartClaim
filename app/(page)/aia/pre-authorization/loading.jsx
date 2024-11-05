import CircularProgress from '@mui/material/CircularProgress';
export default function Loading() {
  return (
    <>
      <div className="pt-6 ">
        <div className="justify-center border-solid w-1/5 m-auto p-8 ">
          {/* <center> */}
          <CircularProgress size="30px" className="text-error text-lg" />
          {/* </center> */}
          <div className="justify-center text-4xl">Loading....</div>
        </div>
      </div>
    </>
  );
}
