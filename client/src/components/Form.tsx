import { isVisible } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";

// interfaces
import ColumnNames from "../interfaces/column-names-state.interface";
import InputValue from "../interfaces/input-value-object.interface";

// setVisibility - visibilty state of the form, passed down from the parent
// formInput & setFormInputValues - getter and setter for form input values
// columnArr - arr of column labels alongwith their type to setup form column headings
// action - form action, i.e. the url that the form will call when submited
// method - form submission method i.e. post, get, put etc.

function Form({
  setVisibility,
  setFormInputValues,
  formInput,
  columnArr,
  action,
  method,
  onSubmitHandler,
  buttonText = "Submit",
}: {
  setVisibility?: (value: React.SetStateAction<boolean>) => void;
  setFormInputValues: (value: React.SetStateAction<InputValue>) => void;
  formInput: InputValue;
  columnArr: ColumnNames[];
  action: string;
  method: string;
  onSubmitHandler?: () => void;
  buttonText?: string;
}): JSX.Element {
  const formInputClass: string =
    " bg-secondary-400 rounded py-1 px-2 my-2 text-secondary-900 disabled:bg-secondary-800";

  // state to store form inputs, stores inputs from only one field
  const [formIn, setFormIn] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });

  // handles input values from the form then sets them to the formIn state, later in useEffect its values are used to change the state of the formInput state passed down fromm the parent conmnponent
  function inputHandler(event: React.FormEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFormIn({
      label: event.currentTarget.name,
      value: event.currentTarget.value,
    });
  }

  // using useeffect to re-render the form everytime input changes, using only useState to rerender will cause the stored state to be one step behind than the actual value.
  useEffect(() => {
    // since making changes to the original object (formInput state) do not re-render the component (react uses object.is() to compare objects) making a copy of the fromInput input and then making changes to the copied object.
    const newFormInput = { ...formInput };
    newFormInput[formIn.label] = formIn.value;
    setFormInputValues(newFormInput);
    console.log(formInput, "ff");
  }, [formIn]);

  return (
    <div className="bg-slate-800 rounded-md border-[0.3px]  w-min text-themeWhite">
      {setVisibility ? (
        <button
          //   onClick function to hide the parent component
          onClick={() => {
            setVisibility(false);
          }}
          className=" float-right text-2xl font-bold mr-4 mt-1 text-slate-200 hover:text-themeWhite"
        >
          X
        </button>
      ) : (
        <></>
      )}

      <form
        className="px-16 py-8"
        action={action}
        method={method}
        encType="application/x-www-form-urlencoded"
        onSubmit={
          onSubmitHandler
            ? (e) => {
                e.preventDefault();
                onSubmitHandler();
              }
            : () => {}
        }
      >
        {columnArr.map((val) => {
          return (
            <label
              key={val.column_name}
              className={`${
                val.column_name === "serial_number"
                  ? " hidden"
                  : val.column_name === "joining_date"
                  ? " hidden"
                  : ""
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
            className={formInputClass}
            type="submit"
            name="item-name"
            value={buttonText}
          />
        </button>
      </form>
    </div>
  );
}

export default Form;
