import React, { useEffect, useState } from "react";

// interface
import ColumnNames from "../interfaces/column-names-state.interface";
import InputValue from "../interfaces/input-value-object.interface";

function Form({
  setVisibility,
  setFormInputValues,
  formInput,
  columnArr,
  action,
  method,
}: {
  setVisibility: (value: React.SetStateAction<boolean>) => void;
  setFormInputValues: (value: React.SetStateAction<InputValue>) => void;
  formInput: InputValue;
  columnArr: ColumnNames[];
  action: string;
  method: string;
}): JSX.Element {
  const formInputClass: string =
    " bg-secondary-400 rounded py-1 px-2 my-2 text-secondary-900";

  const [formIn, setFormIn] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });

  // handles input values from the form, not tested completely, might throw errors for different data.
  function inputHandler(event: React.FormEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFormIn({
      label: event.currentTarget.name,
      value: event.currentTarget.value,
    });
  }

  // using useeffect to re-render the form everytime input changes, using only useState to rerender will cause the stored state to be one step behind than the actual value.
  useEffect(() => {
    const newFormInput = formInput;
    newFormInput[formIn.label] = formIn.value;
    setFormInputValues(newFormInput);
    console.log(newFormInput);
  }, [formIn, formInput, setFormInputValues]);

  return (
    <div className="bg-slate-800 rounded-md border-[0.3px]  w-min text-themeWhite">
      <button
        //   onClick function to hide the parent component
        onClick={() => {
          setVisibility(false);
        }}
        className=" float-right text-2xl font-bold mr-4 mt-1 text-slate-200 hover:text-themeWhite"
      >
        X
      </button>

      <form className="px-16 py-8" action={action} method={method}>
        {columnArr.map((val) => {
          return (
            <label
              key={val.column_name}
              className={`${
                val.column_name === "serial_number" ? " hidden" : ""
              }`}
            >
              {val.column_name.replace("_", " ")}
              <input
                className={formInputClass}
                type={val.type}
                name={val.column_name}
                onChange={inputHandler}
              />
            </label>
          );
        })}
        <button>
          <input
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className={formInputClass}
            type="submit"
            name="item-name"
          />
        </button>
      </form>
    </div>
  );
}

export default Form;
