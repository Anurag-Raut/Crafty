export default function Card({children}:any) {

  return (
    <div className="border-2 border-black w-full h-full m-3 p-3 rounded-xl">
         {children}
    </div>
  );
}
