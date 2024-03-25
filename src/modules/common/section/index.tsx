export function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 xl:px-20 py-12 bg-gray-100">
      {children}
    </div>
  );
}
