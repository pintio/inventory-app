import React from "react";

function Form({
  setVisibility,
}: {
  setVisibility: (value: React.SetStateAction<boolean>) => void;
}): JSX.Element {
  const formInputClass: string =
    " bg-secondary-400 rounded py-1 px-2 my-2 text-secondary-900";

  const arr: string[] = ["aaa", "adf dffs", "dfg 2t"];

  return (
    <div className="bg-secondary-200 rounded-md border-[0.3px]  border-secondary-400 w-min text-secondary">
      <button
        //   onClick function to hide the parent component
        onClick={() => {
          setVisibility(false);
        }}
        className=" float-right text-2xl font-bold mr-4 mt-1 text-secondary-700 hover:text-secondary-900"
      >
        X
      </button>
      <form className="px-16 py-8 " action="" method="POST">
        {arr.map((val: string) => {
          return (
            <label>
              {val}
              <input
                className={formInputClass}
                type="text"
                name={val.replace(" ", "-")}
              />
            </label>
          );
        })}

        <button>
          <input className={formInputClass} type="submit" name="item-name" />
        </button>
      </form>
    </div>
  );
}

export default Form;
