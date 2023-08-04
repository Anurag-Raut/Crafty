export default function Card({children,color}:any) {

  return (
    <div className={`border-2 border-black w-[90%] h-fit m-4 p-3 bg-${color} rounded-xl`}>
         {children}
    </div>
  );
}
