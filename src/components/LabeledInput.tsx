import React, { ReactNode } from "react";


interface LabelInputType {
  labelText: string,
  children?: ReactNode;
}

function LabeledInput({ labelText, children }: LabelInputType) {
  return (
    <>
      <div className="w-full">
        <label className="input-label">
          { labelText }
        </label>
          {children}
      </div>
    </>
  );
}

export default LabeledInput;