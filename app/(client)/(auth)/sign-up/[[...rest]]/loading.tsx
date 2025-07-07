import "@/app/loading.css";

export default function FullPageLoader() {
  return (
    <div id="loader">
      <div className="circle-loader">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>
    </div>
  );
}
