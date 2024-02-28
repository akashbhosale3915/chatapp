type FormWrapperProps = {
  children: React.ReactNode;
};
const FormWrapper = ({ children }: FormWrapperProps) => {
  return (
    <div className="h-screen flex items-center justify-center formwrapper">
      <div className="bg-slate-900 w-96 rounded-lg mx-auto px-4 py-7 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
