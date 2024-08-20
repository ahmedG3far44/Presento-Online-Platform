function AsideProfile({ children }) {
  return (
    <aside className="max-sm:hidden w-1/5 max-md:hidden sticky left-0 top-0 p-8 bg-primary-foreground min-h-screen">
      {children}
    </aside>
  );
}

export default AsideProfile;
